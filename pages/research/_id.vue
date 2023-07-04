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

        <h2 v-if="publication.name" class="font-weight-medium">{{ publication.name }}</h2>

        <div class="mt-4 d-flex align-center">
          <YAvatar size="32" :src="publication.scholar.image"> </YAvatar>
          <div v-if="publication.scholar.name" class="ml-2 text-h6 text--secondary font-weight-regular">
            {{ publication.scholar.name }}
          </div>
        </div>

        <div v-if="publication.coAuthor" class="mt-2 text-18 text--secondary font-weight-regular">
          {{ publication.coAuthor.replaceAll(',,', '; ') }}
        </div>

        <v-divider class="mt-4 mb-8"></v-divider>

        <div v-if="publication.abstract">
          <div class="text-h6 font-weight-regular">Abstract</div>
          <div class="mt-2 text--secondary text-body-2 font-weight-light">{{ publication.abstract }}</div>
        </div>
      </v-col>
    </v-row>

    <div class="mb-8"></div>

    <v-row v-if="publication.language" no-gutters class="mt-2 font-weight-light">
      <v-col cols="12" sm="3" class="pr-3">
        <div>Bahasa</div>
      </v-col>

      <v-col cols="12" sm="9">
        <div>{{ publication.language }}</div>
      </v-col>
    </v-row>

    <v-row v-if="publication.totalPages" no-gutters class="mt-2 font-weight-light">
      <v-col cols="12" sm="3" class="pr-3">
        <div>Total Halaman</div>
      </v-col>

      <v-col cols="12" sm="9">
        <div>{{ publication.totalPages }}</div>
      </v-col>
    </v-row>

    <v-row v-if="publication.journal" no-gutters class="mt-2 font-weight-light">
      <v-col cols="12" sm="3" class="pr-3">
        <div>Jurnal</div>
      </v-col>

      <v-col cols="12" sm="9">
        <div>{{ publication.journal }}</div>
      </v-col>
    </v-row>

    <v-row v-if="publication.conference" no-gutters class="mt-2 font-weight-light">
      <v-col cols="12" sm="3" class="pr-3">
        <div>Konferensi</div>
      </v-col>

      <v-col cols="12" sm="9">
        <div>{{ publication.conference }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      publicationId: this.$route.params.id,
      publication: {
        scholar: {}
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
        const a = await this.$repo.publication.getPublicationById(this.$route.params.id)
        const res = a.data
        if (res && res.status) {
          this.publication = res.results
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
