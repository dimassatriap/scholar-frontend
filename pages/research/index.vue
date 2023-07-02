<template>
  <v-container class="">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h2 class="font-weight-medium">Temukan Hasil Riset</h2>

        <v-text-field
          id="publication-search"
          v-model="search"
          placeholder="Cari Publikasi"
          outlined
          append-icon="mdi-magnify"
          class="mt-4"
        />
      </v-col>

      <v-col v-for="(publication, i) in publications" :key="'publication' + i" cols="12">
        <v-card elevation="0" outlined @click="$router.push(`/research/${publication.id}`)">
          <v-card-title class="headline"> {{ publication.name }} </v-card-title>
          <v-card-subtitle class="subtitle-1">
            {{ publication.scholar.name }}
          </v-card-subtitle>
          <v-card-text>
            <div class="ellipsis-2-lines">
              {{ publication.abstract }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-pagination
          v-model="page"
          :length="totalPage"
          @input="
            (number) => {
              page = number
              fetchPublications()
            }
          "
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      publications: [],
      search: null,
      page: 1,
      totalPage: 1
    }
  },

  watch: {
    search() {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 1000)
    }
  },

  created() {
    this.fetchPublications()
  },

  mounted() {
    const search = this.$route.query.search
    if (search) {
      this.search = search
    }
  },

  methods: {
    async fetchPublications() {
      try {
        this.loading = true
        const a = await this.$repo.publication.getPublications({
          withScholars: true,
          search: this.search,
          page: this.page
        })
        const res = a.data
        if (res && res.status) {
          this.publications = res.results
          this.page = res.page
          this.totalPage = res.totalPage
          return res
        } else {
          // this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        // const res = e.response.data
        // this.errorMessage = this.$helpers.keysToCamel(res.messages)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
