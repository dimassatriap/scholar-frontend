<template>
  <div>
    <YBtn large block outlined @click="isAddPublicationDialog = true">Buat Publikasi Baru</YBtn>

    <div class="my-6">
      <NuxtChild />
    </div>

    <template v-if="isLoading">
      <div v-for="i in 2" :key="'skeleton-publication' + i" class="mb-6">
        <v-card class="shadow-card-sm d-flex">
          <YImg :loading="true" :aspect-ratio="isXs ? 1.3 : 8 / 2" min-width="124px" />
        </v-card>
      </div>
    </template>

    <div v-for="(publication, i) in publications" :key="'publication' + i" class="mb-6">
      <ScholarPublicationCard
        :value="publication"
        @edit="
          (publication) => {
            showEditPublicationsDialog(publication)
          }
        "
      />
    </div>

    <ScholarPublicationDialog
      v-model="isAddPublicationDialog"
      :is-edit="isEditPublicationDialog"
      :edit-publication="selectedEditPublication"
      @close="clearEditPublication"
      @added="getScholarPublications"
    />

    <v-container class="">
      <v-row>
        <v-col cols="12" class="text-h5 font-weight-medium">Publikasi Lainnya</v-col>

        <v-col v-if="otherPublications.length < 1 && !otherPublicationLoading" cols="12">
          <h3 class="py-4">Publikasi Lainnya tidak di temukan</h3>
        </v-col>

        <template v-if="otherPublicationLoading">
          <v-col v-for="i in 2" :key="'other-skeleton' + i" cols="12">
            <v-skeleton-loader :height="isXs ? '16rem' : '11rem'" width="100%" type="image"></v-skeleton-loader>
          </v-col>
        </template>

        <v-col v-for="(publication, i) in otherPublications" :key="'other-publication' + i" cols="12">
          <PublicationCard :value="publication" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [breakpointMixin, accountScholarMixins],
  data() {
    return {
      isLoading: false,
      publications: [],
      isEditPublicationDialog: false,
      isAddPublicationDialog: false,
      selectedEditPublication: null,
      otherPublications: [],
      otherPublicationLoading: false
    }
  },

  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'alert/scholarPublicationChanged') {
        this.getScholarPublications()
      }
    })
  },

  mounted() {
    this.getScholarPublications()
    this.fetchOtherPublications()
  },

  methods: {
    async getScholarPublications() {
      try {
        this.isLoading = true
        this.publications = []
        const a = await this.$repo.publication.getPublications({
          withScholars: true,
          search: this.scholar.name,
          limit: -1
        })
        const res = a.data
        if (res && res.status) {
          this.publications = res.results
        }
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    showEditPublicationsDialog(publication) {
      this.isEditPublicationDialog = true
      this.isAddPublicationDialog = true

      this.selectedEditPublication = publication
    },

    clearEditPublication() {
      setTimeout(() => {
        this.isEditPublicationDialog = false
        this.selectedEditPublication = null
      }, 500)
    },

    async fetchOtherPublications() {
      try {
        this.otherPublicationLoading = true
        this.otherPublications = []
        const a = await this.$repo.publication.getPublications({
          withScholars: true,
          search: this.$helpers.fullName(this.scholar.name, this.scholar.frontTitle, this.scholar.backTitle),
          limit: -1
        })
        const res = a.data
        if (res && res.status) {
          this.otherPublications = res.results
        }
      } catch (e) {
      } finally {
        this.otherPublicationLoading = false
      }
    }
  }
}
</script>

<style></style>
