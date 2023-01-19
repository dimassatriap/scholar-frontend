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
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-h6">{{ scholar.name }}</div>
              <v-list-item-title class="subtitle-1">
                {{ scholar.email }}
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">
                {{ $moment(scholar.createdAt).format('YYYY') + ' - ' + $moment().format('YYYY') }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <YAvatar class="border-4-white my-4 ml-4" :src="scholar.image" size="80" />
          </v-list-item>
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
