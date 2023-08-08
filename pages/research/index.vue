<template>
  <div>
    <div class="header-title">
      <v-container class="">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <h2 class="font-weight-medium">Temukan Publikasi</h2>

            <v-text-field
              id="publication-search"
              v-model="search"
              placeholder="Cari Publikasi berdasarkan Judul, Abstrak, atau Nama Penulis"
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
        <v-col cols="12" lg="3">
          <div class="text-subtitle1">Filter Publikasi</div>

          <div class="mt-6">
            <v-select
              v-model="orderPublishDate"
              :items="publishDateOrderItems"
              item-text="label"
              item-value="value"
              hide-details
              filled
              dense
              background-color="white"
              class="px-0"
            ></v-select>
          </div>

          <div v-if="allKeywords.length" class="mt-6">
            <div class="text-subtitle2">Keywords</div>

            <div class="mb-2">
              <v-checkbox
                v-for="(keyword, i) in mappedKeyword"
                :key="'keyword' + i"
                v-model="selectedKeywords"
                :label="keyword.name"
                :value="keyword.id"
                hide-details="auto"
                dense
                class="text-capitalize"
              >
              </v-checkbox>
            </div>

            <div class="d-flex align-center">
              <v-btn
                v-if="selectedKeywords.length"
                text
                color="primary"
                class="mr-2 pa-0"
                min-width="0"
                @click="selectedKeywords = []"
              >
                Hapus
              </v-btn>

              <v-dialog
                v-if="allKeywords.length > 5"
                v-model="keywordDialog"
                scrollable
                eager
                :fullscreen="isXs"
                max-width="900"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" text class="pa-0" dark v-bind="attrs" v-on="on"> Lainnya... </v-btn>
                </template>

                <v-card>
                  <v-card-title class="shadow-nav flex-column align-stretch">
                    <div class="mb-4 text--primary">Keywords</div>

                    <v-text-field
                      id="keyword-search"
                      v-model="keywordSearch"
                      placeholder="Cari Keywords"
                      filled
                      outlined
                      append-icon="mdi-magnify"
                      background-color="white"
                      hide-details="auto"
                      class="medium"
                    />
                  </v-card-title>

                  <v-card-text>
                    <v-container class="pa-0">
                      <v-row no-gutters>
                        <v-col
                          v-for="(keyword, i) in allKeywords"
                          :key="'keyword' + i"
                          cols="6"
                          lg="3"
                          :class="{
                            'd-none': keywordSearch && !keyword.name.toLowerCase().includes(keywordSearch.toLowerCase())
                          }"
                        >
                          <v-checkbox
                            v-model="selectedKeywords"
                            :label="keyword.name"
                            :value="keyword.id"
                            hide-details="auto"
                            dense
                            class="text-capitalize"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="keywordDialog = false"> Tutup </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>

          <div v-if="publishYears.length" class="mt-6">
            <div class="text-subtitle2">Tahun Publikasi</div>

            <div class="mb-2">
              <v-checkbox
                v-for="year in publishYears"
                :key="'year' + year"
                v-model="selectedPublishYears"
                :label="String(year)"
                :value="year"
                hide-details="auto"
                dense
              ></v-checkbox>
            </div>

            <div class="d-flex align-center">
              <v-btn
                v-if="selectedPublishYears.length"
                text
                color="primary"
                class="mr-2 pa-0"
                min-width="0"
                @click="selectedPublishYears = []"
              >
                Hapus
              </v-btn>
            </div>
          </div>

          <div v-if="allScholars.length" class="mt-6">
            <div class="text-subtitle2">Penulis Pertama</div>

            <div class="mb-2">
              <v-checkbox
                v-for="(scholar, i) in mappedFirstAuthors"
                :key="'scholar-' + scholar.id + '-' + i"
                v-model="selectedFirstAuthors"
                :label="scholar.name"
                :value="scholar.id"
                hide-details="auto"
                dense
                class="text-capitalize"
              >
                <template v-slot:label>
                  <div class="d-flex align-center">
                    <YAvatar size="24" :src="scholar.image"> </YAvatar>
                    <div class="ml-2">
                      {{ $helpers.fullName(scholar.name, scholar.frontTitle, scholar.backTitle) }}
                      <span v-if="scholar.publications">({{ scholar.publications.length }})</span>
                    </div>
                  </div>
                </template>
              </v-checkbox>
            </div>

            <div class="d-flex align-center">
              <v-btn
                v-if="selectedFirstAuthors.length"
                text
                color="primary"
                class="mr-2 pa-0"
                min-width="0"
                @click="selectedFirstAuthors = []"
              >
                Hapus
              </v-btn>

              <v-dialog
                v-if="allScholars.length > 5"
                v-model="firstAuthorsDialog"
                scrollable
                eager
                :fullscreen="isXs"
                max-width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" text class="pa-0" dark v-bind="attrs" v-on="on"> Lainnya... </v-btn>
                </template>

                <v-card>
                  <v-card-title class="shadow-nav flex-column align-stretch">
                    <div class="mb-4 text--primary">Dosen</div>

                    <v-text-field
                      id="first-authors-search"
                      v-model="firstAuthorsSearch"
                      placeholder="Cari Dosen"
                      filled
                      outlined
                      append-icon="mdi-magnify"
                      background-color="white"
                      hide-details="auto"
                      class="medium"
                    />
                  </v-card-title>

                  <v-card-text>
                    <v-container class="pa-0">
                      <v-row dense align="center">
                        <v-col
                          v-for="(scholar, i) in allScholars"
                          :key="'all-scholar-' + scholar.id + '-' + i"
                          cols="12"
                          :class="{
                            'd-none':
                              firstAuthorsSearch &&
                              !$helpers
                                .fullName(scholar.name, scholar.frontTitle, scholar.backTitle)
                                .toLowerCase()
                                .includes(firstAuthorsSearch.toLowerCase())
                          }"
                        >
                          <v-checkbox
                            v-model="selectedFirstAuthors"
                            :label="scholar.name"
                            :value="scholar.id"
                            hide-details="auto"
                            dense
                            class="text-capitalize"
                          >
                            <template v-slot:label>
                              <div class="d-flex align-center">
                                <YAvatar size="32" :src="scholar.image"> </YAvatar>
                                <div class="ml-2">
                                  {{ $helpers.fullName(scholar.name, scholar.frontTitle, scholar.backTitle) }}
                                </div>
                              </div>
                            </template>
                          </v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="firstAuthorsDialog = false"> Tutup </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>

          <div v-if="allScholars.length" class="mt-6">
            <div>
              <div class="text-subtitle2">Penulis Lainnya</div>
            </div>

            <div class="mb-2">
              <v-checkbox
                v-for="(scholar, i) in mappedOtherAuthors"
                :key="'other-scholar-' + scholar.id + '-' + i"
                v-model="selectedOtherAuthors"
                :label="scholar.name"
                :value="scholar.name"
                hide-details="auto"
                dense
                class="text-capitalize"
              >
                <template v-slot:label>
                  <div class="d-flex align-center">
                    <YAvatar size="24" :src="scholar.image"> </YAvatar>
                    <div class="ml-2">
                      {{ $helpers.fullName(scholar.name, scholar.frontTitle, scholar.backTitle) }}
                    </div>
                  </div>
                </template>
              </v-checkbox>
            </div>

            <div class="d-flex align-center">
              <v-btn
                v-if="selectedOtherAuthors.length"
                text
                color="primary"
                class="mr-2 pa-0"
                min-width="0"
                @click="selectedOtherAuthors = []"
              >
                Hapus
              </v-btn>

              <v-dialog
                v-if="allScholars.length > 5"
                v-model="otherAuthorsDialog"
                scrollable
                eager
                :fullscreen="isXs"
                max-width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" text class="pa-0" dark v-bind="attrs" v-on="on"> Lainnya... </v-btn>
                </template>

                <v-card>
                  <v-card-title class="shadow-nav flex-column align-stretch">
                    <div class="mb-4 text--primary">Dosen</div>

                    <v-text-field
                      id="other-authors-search"
                      v-model="otherAuthorsSearch"
                      placeholder="Cari Dosen"
                      filled
                      outlined
                      append-icon="mdi-magnify"
                      background-color="white"
                      hide-details="auto"
                      class="medium"
                    />
                  </v-card-title>

                  <v-card-text>
                    <v-container class="pa-0">
                      <v-row dense align="center">
                        <v-col
                          v-for="(scholar, i) in allScholars"
                          :key="'all-other-scholar-' + scholar.id + '-' + i"
                          cols="12"
                          :class="{
                            'd-none':
                              otherAuthorsSearch &&
                              !$helpers
                                .fullName(scholar.name, scholar.frontTitle, scholar.backTitle)
                                .toLowerCase()
                                .includes(otherAuthorsSearch.toLowerCase())
                          }"
                        >
                          <v-checkbox
                            v-model="selectedOtherAuthors"
                            :label="scholar.name"
                            :value="scholar.name"
                            hide-details="auto"
                            dense
                            class="text-capitalize"
                          >
                            <template v-slot:label>
                              <div class="d-flex align-center">
                                <YAvatar size="32" :src="scholar.image"> </YAvatar>
                                <div class="ml-2">
                                  {{ $helpers.fullName(scholar.name, scholar.frontTitle, scholar.backTitle) }}
                                </div>
                              </div>
                            </template>
                          </v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="otherAuthorsDialog = false"> Tutup </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>

          <div class="mt-6">
            <div class="text-subtitle2">Tipe Publikasi</div>

            <v-radio-group id="input-publication-type" v-model="publicationType" hide-details="auto" class="mt-2">
              <v-radio label="Semua" value="all"></v-radio>
              <v-radio label="Jurnal" value="journal"></v-radio>
              <v-radio label="Konferensi" value="conference"></v-radio>
            </v-radio-group>
          </div>

          <div v-if="allDepartments.length" class="mt-6">
            <div class="text-subtitle2">Program Studi</div>

            <div class="mb-2">
              <v-checkbox
                v-for="(departement, i) in mappedDepartments"
                :key="'departement-' + departement.id + '-' + i"
                v-model="selectedDepartments"
                :label="departement.name"
                :value="departement.id"
                hide-details="auto"
                dense
                class="text-capitalize"
              >
                <template v-slot:label>
                  <div class="d-flex align-center">
                    <div class="">
                      {{ departement.name }}
                    </div>
                  </div>
                </template>
              </v-checkbox>
            </div>

            <div class="d-flex align-center">
              <v-btn
                v-if="selectedDepartments.length"
                text
                color="primary"
                class="mr-2 pa-0"
                min-width="0"
                @click="selectedDepartments = []"
              >
                Hapus
              </v-btn>

              <v-dialog
                v-if="allDepartments.length > 5"
                v-model="departmentsDialog"
                scrollable
                eager
                :fullscreen="isXs"
                max-width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" text class="pa-0" dark v-bind="attrs" v-on="on"> Lainnya... </v-btn>
                </template>

                <v-card>
                  <v-card-title class="shadow-nav flex-column align-stretch">
                    <div class="mb-4 text--primary">Program Studi</div>

                    <v-text-field
                      id="first-authors-search"
                      v-model="departmentsSearch"
                      placeholder="Cari Program Studi"
                      filled
                      outlined
                      append-icon="mdi-magnify"
                      background-color="white"
                      hide-details="auto"
                      class="medium"
                    />
                  </v-card-title>

                  <v-card-text>
                    <v-container class="pa-0">
                      <v-row dense align="center">
                        <v-col
                          v-for="(departement, i) in allDepartments"
                          :key="'all-departement-' + departement.id + '-' + i"
                          cols="12"
                          :class="{
                            'd-none':
                              departmentsSearch &&
                              departement.name &&
                              !departement.name.toLowerCase().includes(departmentsSearch.toLowerCase())
                          }"
                        >
                          <v-checkbox
                            v-model="selectedDepartments"
                            :label="departement.name"
                            :value="departement.id"
                            hide-details="auto"
                            dense
                            class="text-capitalize"
                          >
                            <template v-slot:label>
                              <div class="d-flex align-center">
                                <div class="">
                                  {{ departement.name }}
                                </div>
                              </div>
                            </template>
                          </v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="departmentsDialog = false"> Tutup </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="9">
          <v-row justify="center" align="center">
            <v-col v-if="publications.length < 1 && !loading" cols="12">
              <h3 class="py-16">Publikasi tidak di temukan</h3>
            </v-col>

            <template v-if="loading">
              <v-col v-for="i in 10" :key="'skeleton' + i" cols="12">
                <v-skeleton-loader :height="isXs ? '16rem' : '11rem'" width="100%" type="image"></v-skeleton-loader>
              </v-col>
            </template>

            <v-col v-for="(publication, i) in publications" :key="'publication' + i" cols="12">
              <PublicationCard :value="publication" />
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
      loading: false,
      publications: [],
      search: null,
      page: 1,
      totalPage: 1,
      selectedKeywords: [],
      allKeywords: [],
      isFetchingKeywordLoading: false,
      keywordDialog: false,
      keywordSearch: null,
      orderPublishDate: 'DESC',
      publishDateOrderItems: [
        {
          label: 'Tahun Publikasi (Menurun)',
          value: 'DESC'
        },
        {
          label: 'Tahun Publikasi (Meningkat)',
          value: 'ASC'
        }
      ],
      publishYears: [],
      isFetchingPublishYearsLoading: false,
      selectedPublishYears: [],
      allScholars: [],
      isFetchingScholarsLoading: false,
      selectedFirstAuthors: [],
      firstAuthorsDialog: false,
      firstAuthorsSearch: null,
      selectedOtherAuthors: [],
      otherAuthorsDialog: false,
      otherAuthorsSearch: null,
      publicationType: 'all',
      allDepartments: [],
      isFetchingDepartmentsLoading: false,
      selectedDepartments: [],
      departmentsDialog: false,
      departmentsSearch: null
    }
  },

  computed: {
    mappedKeyword() {
      const shownKeywords = this.allKeywords.slice(0, 5)
      const hiddenKeywords = this.allKeywords.slice(5)
      const selected = hiddenKeywords.filter((k) => this.selectedKeywords.includes(k.id))
      const shownSelected = this.allKeywords
        .slice(selected.length ? 4 - selected.length : 5, 5)
        .filter((k) => this.selectedKeywords.includes(k.id))

      if (selected.length + shownSelected.length > 5) {
        return selected.concat(shownSelected).slice(0, 5)
      } else {
        const combine = [
          ...selected,
          ...shownSelected,
          ...shownKeywords.slice(0, 5 - selected.length - shownSelected.length)
        ]
        return combine
      }
    },

    mappedFirstAuthors() {
      const shownFirstAuthors = this.allScholars.slice(0, 5)
      const hiddenFirstAuthors = this.allScholars.slice(5)
      const selected = hiddenFirstAuthors.filter((k) => this.selectedFirstAuthors.includes(k.id))
      const shownSelected = this.allScholars
        .slice(selected.length ? 4 - selected.length : 5, 5)
        .filter((k) => this.selectedFirstAuthors.includes(k.id))

      if (selected.length + shownSelected.length > 5) {
        return selected.concat(shownSelected).slice(0, 5)
      } else {
        const combine = [
          ...selected,
          ...shownSelected,
          ...shownFirstAuthors.slice(0, 5 - selected.length - shownSelected.length)
        ]
        return combine
      }
    },

    mappedOtherAuthors() {
      const shownOtherAuthors = this.allScholars.slice(0, 5)
      const hiddenOtherAuthors = this.allScholars.slice(5)
      const selected = hiddenOtherAuthors.filter((k) => this.selectedOtherAuthors.includes(k.name))
      const shownSelected = this.allScholars
        .slice(selected.length ? 4 - selected.length : 5, 5)
        .filter((k) => this.selectedOtherAuthors.includes(k.name))

      if (selected.length + shownSelected.length > 5) {
        return selected.concat(shownSelected).slice(0, 5)
      } else {
        const combine = [
          ...selected,
          ...shownSelected,
          ...shownOtherAuthors.slice(0, 5 - selected.length - shownSelected.length)
        ]
        return combine
      }
    },

    mappedDepartments() {
      const shownDepartments = this.allDepartments.slice(0, 5)
      const hiddenDepartments = this.allDepartments.slice(5)
      const selected = hiddenDepartments.filter((k) => this.selectedDepartments.includes(k.id))
      const shownSelected = this.allDepartments
        .slice(selected.length ? 4 - selected.length : 5, 5)
        .filter((k) => this.selectedDepartments.includes(k.id))

      if (selected.length + shownSelected.length > 5) {
        return selected.concat(shownSelected).slice(0, 5)
      } else {
        const combine = [
          ...selected,
          ...shownSelected,
          ...shownDepartments.slice(0, 5 - selected.length - shownSelected.length)
        ]
        return combine
      }
    }
  },

  watch: {
    search() {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 1000)
    },

    selectedKeywords() {
      clearTimeout(this._keywordsTimerId)
      this._keywordsTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 1000)
    },

    orderPublishDate() {
      clearTimeout(this._orderTimerId)
      this._orderTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 100)
    },

    selectedPublishYears() {
      clearTimeout(this._publishYearTimerId)
      this._publishYearTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 500)
    },

    selectedFirstAuthors() {
      clearTimeout(this._firstAuthorsTimerId)
      this._firstAuthorsTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 1000)
    },

    selectedOtherAuthors() {
      clearTimeout(this._otherAuthorsTimerId)
      this._otherAuthorsTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 1000)
    },

    publicationType() {
      clearTimeout(this._publicationTypeTimerId)
      this._publicationTypeTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 1000)
    },

    selectedDepartments() {
      clearTimeout(this._departmentsTimerId)
      this._departmentsTimerId = setTimeout(() => {
        this.page = 1
        this.fetchPublications()
      }, 1000)
    }
  },

  created() {
    this.fetchPublications()
    this.fetchKeywords()
    this.fetchPublishYears()
    this.fetchScholars()
    this.fetchDepartments()
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
        this.publications = []
        const a = await this.$repo.publication.getPublications({
          withScholars: true,
          search: this.search,
          page: this.page,
          keywords: this.selectedKeywords.join(','),
          orderPublishDate: this.orderPublishDate,
          publishYear: this.selectedPublishYears.join(','),
          firstAuthors: this.selectedFirstAuthors.join(','),
          otherAuthors: this.selectedOtherAuthors.join(','),
          publicationType: this.publicationType,
          departmentIds: this.selectedDepartments.join(',')
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
    },

    async fetchKeywords() {
      try {
        this.isFetchingKeywordLoading = true
        const a = await this.$repo.publication.getKeywords({
          itemsPerPage: -1
        })
        const res = a.data
        if (res && res.status) {
          this.allKeywords = res.results
        }
      } catch (e) {
      } finally {
        this.isFetchingKeywordLoading = false
      }
    },

    async fetchPublishYears() {
      try {
        this.isFetchingPublishYearsLoading = true
        const a = await this.$repo.publication.getPublishYears()
        const res = a.data
        if (res && res.status) {
          this.publishYears = res.results
        }
      } catch (e) {
      } finally {
        this.isFetchingPublishYearsLoading = false
      }
    },

    async fetchScholars() {
      try {
        this.isFetchingScholarsLoading = true
        const a = await this.$repo.scholar.getScholars({
          itemsPerPage: -1,
          withPublications: true
        })
        const res = a.data
        if (res && res.status) {
          this.allScholars = res.results
        }
      } catch (e) {
      } finally {
        this.isFetchingScholarsLoading = false
      }
    },

    async fetchDepartments() {
      try {
        this.isFetchingDepartmentsLoading = true
        const a = await this.$repo.university.getDepartments()
        const res = a.data
        if (res && res.status) {
          this.allDepartments = res.results
        }
      } catch (e) {
      } finally {
        this.isFetchingDepartmentsLoading = false
      }
    }
  }
}
</script>

<style scoped>
::v-deep {
  .v-label {
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }
}

::v-deep {
  .px-0.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot,
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0;
  }
}
</style>
