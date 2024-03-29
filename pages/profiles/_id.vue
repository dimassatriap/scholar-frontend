<template>
  <v-container class="">
    <MessageInfo
      :messages.sync="errorMessage"
      class="mb-4"
      card-class="sred20"
      text-class="sblack--text"
      icon-color="sred60"
    />

    <v-row align="center" justify="center">
      <v-col cols="6" sm="2">
        <YImg class="rounded-lg" aspect-ratio="1" img-default-as-avatar :src="scholar.image" />
      </v-col>

      <v-col cols="12" sm="10">
        <h2 v-if="scholar.name" class="font-weight-medium">
          {{ $helpers.fullName(scholar.name, scholar.frontTitle, scholar.backTitle) }}
        </h2>

        <div v-if="scholar.email" class="text-h6 text--secondary font-weight-regular" style="word-break: break-all">
          {{ scholar.email }}
        </div>

        <div v-if="scholar.departmentId" class="subtitle-1 text--secondary">
          {{ scholar.department.name
          }}<span v-if="scholar.department.faculty">, {{ scholar.department.faculty.name }} </span>
        </div>
      </v-col>
    </v-row>
    <v-divider class="mt-4 mb-6"></v-divider>

    <v-row v-if="scholar.address" no-gutters class="mt-2 font-weight-light">
      <v-col cols="12" sm="3" class="pr-3">
        <div>Alamat</div>
      </v-col>

      <v-col cols="12" sm="9">
        <div>{{ scholar.address }}</div>
      </v-col>
    </v-row>

    <v-row v-if="scholar.birthDate" no-gutters class="mt-2 font-weight-light">
      <v-col cols="12" sm="3" class="pr-3">
        <div>Tanggal Lahir</div>
      </v-col>

      <v-col cols="12" sm="9">
        <div>{{ $moment(scholar.birthDate).format('DD MMM YYYY') }}</div>
      </v-col>
    </v-row>

    <div class="mt-8"></div>

    <v-row>
      <v-col cols="12" class="text-h5 font-weight-medium">Publikasi</v-col>

      <v-col v-if="publications.length < 1 && !publicationLoading" cols="12">
        <h3 class="py-4">Publikasi tidak di temukan</h3>
      </v-col>

      <template v-if="publicationLoading">
        <v-col v-for="i in 3" :key="'skeleton' + i" cols="12">
          <v-skeleton-loader :height="isXs ? '16rem' : '11rem'" width="100%" type="image"></v-skeleton-loader>
        </v-col>
      </template>

      <v-col v-for="(publication, i) in publications" :key="'publication' + i" cols="12">
        <PublicationCard :value="publication" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'

export default {
  mixins: [breakpointMixin],
  data() {
    return {
      scholarId: this.$route.params.id,
      loading: false,
      scholar: {},
      publications: [],
      errorMessage: {},
      publicationLoading: false
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        this.loading = true
        const a = await this.$repo.scholar.getScholarByIdWithPublication(this.$route.params.id)
        const res = a.data
        if (res && res.status) {
          this.scholar = res.results
          this.fetchPublications()
          return res
        } else {
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        const res = e.response.data
        this.errorMessage = this.$helpers.keysToCamel(res.messages)
      } finally {
        this.loading = false
      }
    },

    async fetchPublications() {
      try {
        this.publicationLoading = true
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
        this.publicationLoading = false
      }
    }
  }
}
</script>
