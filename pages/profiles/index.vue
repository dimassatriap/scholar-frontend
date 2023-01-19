<template>
  <v-container class="">
    <v-row>
      <v-col cols="12">
        <h2 class="font-weight-medium">Find Profiles</h2>

        <v-text-field
          id="scholar-search"
          v-model="search"
          placeholder="Cari Profile"
          outlined
          append-icon="mdi-magnify"
          class="mt-4"
        />
      </v-col>

      <v-col v-for="(scholar, i) in scholars" :key="'scholar' + i" cols="12" sm="6" lg="4">
        <v-card elevation="0" outlined @click="$router.push(`/profiles/${scholar.id}`)">
          <v-card-title class="headline"> {{ scholar.name }} </v-card-title>
          <v-card-subtitle class="subtitle-1">
            <div>{{ scholar.email }}</div>
            <div>{{ $moment(scholar.createdAt).format('YYYY') + ' - ' + $moment().format('YYYY') }}</div>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      scholars: [],
      search: null
    }
  },

  watch: {
    search(newVal) {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.fetchScholars(newVal)
      }, 1000)
    }
  },

  created() {
    this.fetchScholars()
  },

  methods: {
    async fetchScholars(search = null) {
      try {
        this.loading = true
        const a = await this.$repo.scholar.getScholars({ search })
        const res = a.data
        if (res && res.status) {
          this.scholars = res.results
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
