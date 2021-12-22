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
      selectedEditPublication: null
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
  },

  methods: {
    async getScholarPublications() {
      try {
        this.isLoading = true
        const a = await this.$repo.scholar.getScholarByIdWithPublication(this.scholar.id)
        const res = a.data
        if (res && res.status) {
          this.publications = res.results.publications
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
    }
  }
}
</script>

<style></style>
