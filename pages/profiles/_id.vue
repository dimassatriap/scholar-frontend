<template>
  <v-container class="">
    <v-row>
      <v-col cols="12">
        <MessageInfo
          :messages.sync="errorMessage"
          class="mb-4"
          card-class="sred20"
          text-class="sblack--text"
          icon-color="sred60"
        />

        <h2 v-if="scholar.name" class="font-weight-medium">{{ scholar.name }}</h2>

        <div v-if="scholar.email" class="mt-4 text-h6 text--secondary font-weight-regular">
          {{ scholar.email }}
        </div>

        <div v-if="scholar.phone" class="mt-1 text-h6 text--secondary font-weight-regular">
          {{ 0 + $helpers.remove62FromMsisdn(scholar.phone) }}
        </div>

        <v-divider class="mt-4 mb-6"></v-divider>
      </v-col>
    </v-row>

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

    <v-row v-if="scholar.publications.length > 0">
      <v-col cols="12" class="text-h5 font-weight-medium">Publikasi</v-col>

      <v-col v-for="(publication, i) in scholar.publications" :key="'publication' + i" cols="12">
        <v-card elevation="0" outlined @click="$router.push(`/research/${publication.id}`)">
          <v-card-title class="headline"> {{ publication.name }} </v-card-title>
          <!-- <v-card-subtitle class="subtitle-1">
          {{ publication.scholar.name }}
        </v-card-subtitle> -->
          <v-card-text>
            <div class="ellipsis-2-lines">
              {{ publication.abstract }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      scholarId: this.$route.params.id,
      scholar: {
        publications: []
      },
      errorMessage: {}
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
    }
  }
}
</script>
