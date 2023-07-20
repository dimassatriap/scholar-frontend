<template>
  <div>
    <div class="header-title">
      <v-container class="">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <h2 class="font-weight-medium">Temukan Profil</h2>

            <v-text-field
              id="scholar-search"
              v-model="search"
              placeholder="Cari Profile"
              filled
              outlined
              append-icon="mdi-magnify"
              background-color="white"
              class="mt-8"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="">
      <v-row>
        <v-col v-if="scholars.length < 1 && !loading" cols="12">
          <h3 class="py-16">Dosen tidak di temukan</h3>
        </v-col>

        <template v-if="loading">
          <v-col v-for="i in 12" :key="'skeleton' + i" cols="12" sm="6" lg="4">
            <v-skeleton-loader height="7rem" width="100%" type="image"></v-skeleton-loader>
          </v-col>
        </template>

        <v-col v-for="(scholar, i) in scholars" :key="'scholar' + i" cols="12" sm="6" lg="4">
          <v-card elevation="0" outlined @click="$router.push(`/profiles/${scholar.id}`)">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="subtitle-1 font-weight-medium text--primary">{{ scholar.name }}</div>
                <v-list-item-title class="subtitle-2 font-weight-regular">
                  {{ scholar.email }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="scholar.departmentId" class="subtitle-2 font-weight-regular">
                  {{ scholar.department.name
                  }}<span v-if="scholar.department.faculty">, {{ scholar.department.faculty.name }} </span>
                </v-list-item-subtitle>
              </v-list-item-content>

              <YAvatar class="my-4 ml-4" :src="scholar.image" size="80" />
            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-pagination
            v-model="page"
            :length="totalPage"
            @input="
              (number) => {
                page = number
                fetchScholars()
              }
            "
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'

export default {
  mixins: [breakpointMixin],
  data() {
    return {
      scholars: [],
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
        this.fetchScholars()
      }, 1000)
    }
  },

  created() {
    this.fetchScholars()
  },

  methods: {
    async fetchScholars() {
      try {
        this.loading = true
        this.scholars = []
        const a = await this.$repo.scholar.getScholars({
          search: this.search,
          page: this.page
        })
        const res = a.data
        if (res && res.status) {
          this.scholars = res.results
          this.page = res.page
          this.totalPage = res.totalPage
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
