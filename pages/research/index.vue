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
              ></v-checkbox>
            </div>

            <v-dialog v-if="allKeywords.length > 5" v-model="keywordDialog" width="900">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" text class="pa-0" dark v-bind="attrs" v-on="on"> Lainnya... </v-btn>
              </template>

              <v-card>
                <v-card-text>
                  <div class="text-subtitle2 mb-4 text--primary">Keywords</div>

                  <v-container class="pa-0">
                    <v-row no-gutters>
                      <v-col v-for="(keyword, i) in allKeywords" :key="'keyword' + i" cols="6" lg="3">
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
      selectedPublishYears: []
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
    }
  },

  created() {
    this.fetchPublications()
    this.fetchKeywords()
    this.fetchPublishYears()
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
          publishYear: this.selectedPublishYears.join(',')
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
