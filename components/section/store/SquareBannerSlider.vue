<template>
  <v-slide-group v-model="model" mobile-breakpoint="960">
    <template v-if="$fetchState.pending">
      <v-slide-item v-for="i in 4" :key="i">
        <div class="px-1 px-sm-3" :class="{ 'pl-0 pl-sm-0': i === 0, 'pr-0 pr-sm-0': i === 4 }">
          <v-img class="rounded-4" :src="null" :aspect-ratio="1" :width="$vuetify.breakpoint.smAndUp ? 288 : 128">
            <v-skeleton-loader :max-height="$vuetify.breakpoint.smAndUp ? 288 : 128" type="image" />
          </v-img>
        </div>
      </v-slide-item>
    </template>

    <template v-if="!$fetchState.pending">
      <v-slide-item v-for="(item, i) in value" :key="i">
        <div class="px-1 px-sm-3" :class="{ 'pl-0 pl-sm-0': i === 0, 'pr-0 pr-sm-0': i === value.length - 1 }">
          <YImg
            v-ripple
            class="rounded-4"
            :class="{ 'cursor-pointer': item.url }"
            :src="item.image[imgKey]"
            :aspect-ratio="1"
            :width="$vuetify.breakpoint.smAndUp ? 288 : 128"
            @click="item.url ? $helpers.openLink(item.url) : null"
          />
        </div>
      </v-slide-item>
    </template>
  </v-slide-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    imgKey: {
      type: String,
      default: 'srcProxy'
    },
    fetch: {
      type: [Function, Boolean],
      default: false
    }
  },

  async fetch() {
    if (this.fetch) {
      const a = await this.fetch()
      this.$emit('input', a || [])
    }
  },

  fetchOnServer: false,

  data() {
    return {
      model: null
    }
  },

  watch: {},

  mounted() {},

  methods: {}
}
</script>

<style lang="stylus" scoped>
@media (min-width 600px)
  .slide-item
    padding-left 12px
    padding-right 12px

@media (max-width 599px)
  .slide-item
    padding-left 6px
    padding-right 6px

::v-deep
  .v-slide-group__content
    padding-left 16px
    padding-right 16px

::v-deep
  .v-slide-group__content
    justify-content center
  .v-slide-group__next, .v-slide-group__prev
    z-index 4
    flex-basis 0
    min-width 0
  .v-slide-group__next, .v-slide-group__prev
    span
      box-shadow 2px 4px 16px rgba(132, 127, 130, 0.16)
      background #fff
      border-radius 50%
      min-width 32px
      min-height 32px
      svg
        color var(--v-primary-base)
  @media (max-width 599px)
    .v-skeleton-loader__image
      min-height 128px
  @media (min-width 600px)
    .v-skeleton-loader__image
      min-height 288px
</style>
