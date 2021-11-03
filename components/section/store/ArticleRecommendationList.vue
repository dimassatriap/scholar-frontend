<template>
  <div>
    <v-carousel v-model="model" hide-delimiters height="100%">
      <template v-slot:prev="{ on, attrs }">
        <v-btn
          fab
          outlined
          color="primary"
          :disabled="prevDisabled"
          :loading="isLoadingArticle"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>$ChevronLeftLightIcon</v-icon>
        </v-btn>
      </template>

      <template v-slot:next="{ on, attrs }">
        <v-btn
          fab
          outlined
          color="primary"
          :disabled="nextDisabled"
          :loading="isLoadingArticle"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>$ChevronRightLightIcon</v-icon>
        </v-btn>
      </template>

      <template v-if="isLoadingArticle">
        <v-carousel-item v-for="c in 1" :key="'load' + c">
          <div
            v-if="isLoadingArticle || articles.length"
            class="d-flex justify-space-between align-center mb-6"
            style="height: 40px"
          >
            <div class="text-subtitle1">Artikel Lainnya</div>
          </div>

          <v-row :dense="$vuetify.breakpoint.xs">
            <v-col v-for="i in 2" :key="'skeleton-article' + i" cols="12" md="6">
              <ArticleCardSkeleton />
            </v-col>
          </v-row>
        </v-carousel-item>
      </template>

      <template v-else>
        <v-carousel-item v-for="(group, x) in groupArticles" :key="'article' + x" v-intersect="onIntersect">
          <div
            v-if="isLoadingArticle || articles.length"
            class="d-flex justify-space-between align-center mb-6"
            style="height: 40px"
          >
            <div class="text-subtitle1">Artikel Lainnya</div>
          </div>

          <v-row :dense="$vuetify.breakpoint.xs">
            <v-col v-for="(a, i) in group" :key="'article' + i" cols="12" sm="6">
              <ArticleCard :value="a" class="mb-2" />
            </v-col>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      model: 0,
      articles: [],
      metadataArticles: {
        totalItemPerPage: 6,
        selectedPage: 1,
        totalPage: 1
      },
      isLoadingArticle: true,
      intersectKey: 0
    }
  },

  computed: {
    prevDisabled() {
      return this.model < 1
    },

    nextDisabled() {
      return this.model >= this.groupArticles.length - 1
    },

    groupArticles() {
      return this.articles.length ? this.$helpers.groupingArray(this.articles, 2) : [[]]
    }
  },

  watch: {
    model(val) {
      const temp = val
      if (
        val === this.groupArticles.length - 2 &&
        this.metadataArticles.selectedPage < this.metadataArticles.totalPage
      ) {
        this.isLoadingArticle = true
        this.getArticle({
          entries: this.metadataArticles.totalItemPerPage,
          page: this.metadataArticles.selectedPage + 1
        }).then((res) => {
          this.articles = this.articles.concat(res[0] || [])
          this.metadataArticles = res[1] || this.metadataArticles
          this.model = temp
          this.isLoadingArticle = false
        })
      }
    }
  },

  mounted() {
    this.getArticle().then((res) => {
      this.articles = res[0] || []
      this.metadataArticles = res[1] || this.metadataArticles
      this.isLoadingArticle = false
    })
  },

  methods: {
    onIntersect() {
      if (this.intersectKey === 0) {
        // reset carousel item to 0 index
        this.model = 0
        this.intersectKey += 1
      }
    },

    async getArticle(params = { entries: this.metadataArticles.totalItemPerPage }) {
      try {
        const a = await this.$repo.merchant.getArticle(params)
        const res = a.data.response
        if (res && res.status) {
          return [res.results, res.metadata]
        }
      } catch (e) {
      } finally {
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-window__prev, .v-window__next
    margin-left 0
    margin-right 0
    border-radius 0
    background none
    top 0
    bottom auto
  .v-window__prev
    right 0
    left auto
    margin-right 42px
  .theme--dark.v-btn.v-btn--disabled
    color $sblack-20 !important
  .theme--dark.v-btn.v-btn--disabled .v-icon, .theme--dark.v-btn.v-btn--disabled .v-btn__loading
    color $sblack-20 !important
</style>
