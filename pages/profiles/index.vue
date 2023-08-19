<template>
  <div>
    <div v-if="facultyId" class="header-title">
      <v-container class="">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <h2 v-if="selectedFaculty" class="font-weight-medium">
              <YBtn large fab text color="black" @click="$router.push({ path: '/profiles' })">
                <v-icon> mdi-arrow-left </v-icon>
              </YBtn>
              Fakultas {{ selectedFaculty.name }}
            </h2>

            <v-text-field
              id="scholar-search"
              v-model="search"
              placeholder="Cari Dosen"
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
      <v-row v-if="!facultyId">
        <v-col cols="12">
          <h2 class="font-weight-medium mt-4">Fakultas</h2>

          <v-list>
            <v-list-item
              v-for="(faculty, i) in faculties"
              :key="'faculty-' + i"
              class="text-decoration-none"
              @click="$router.push({ path: '/profiles', query: { facultyId: faculty.id } })"
            >
              <v-list-item-action>
                <v-icon> mdi-circle-medium </v-icon>
              </v-list-item-action>
              <v-list-item-title class="text-h5">{{ faculty.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row v-else>
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
                <div class="subtitle-1 font-weight-medium text--primary">
                  {{ $helpers.fullName(scholar.name, scholar.frontTitle, scholar.backTitle) }}
                </div>
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
      totalPage: 1,
      facultyId: null,
      selectedFaculty: {},
      faculties: [],
      isFetchingFacultiesLoading: false
    }
  },

  watch: {
    search() {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.page = 1
        this.fetchScholars()
      }, 1000)
    },

    '$route.query.facultyId'(newVal) {
      this.facultyId = newVal
      if (newVal) {
        this.page = 1
        this.facultyId = Number(newVal)
        const faculty = this.faculties.find((e) => e.id === this.facultyId)
        this.selectedFaculty = faculty
        this.fetchScholars()
      }
    }
  },

  created() {
    this.fetchFaculties()
    this.fetchScholars()

    const facultyId = this.$route.query.facultyId
    if (facultyId) {
      this.facultyId = Number(facultyId)
    }
  },

  methods: {
    async fetchScholars() {
      try {
        this.loading = true
        this.scholars = []
        const a = await this.$repo.scholar.getScholars({
          search: this.search,
          page: this.page,
          facultyIds: this.facultyId
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
    },

    async fetchFaculties() {
      try {
        this.isFetchingFacultiesLoading = true
        const a = await this.$repo.university.getFaculties()
        const res = a.data
        if (res && res.status) {
          this.faculties = res.results

          if (this.facultyId && !this.selectedFaculty?.name) {
            const faculty = this.faculties.find((e) => e.id === this.facultyId)
            this.selectedFaculty = faculty
          }
        }
      } catch (e) {
      } finally {
        this.isFetchingFacultiesLoading = false
      }
    }
  }
}
</script>
