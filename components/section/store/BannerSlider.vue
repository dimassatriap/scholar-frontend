<template>
  <v-carousel v-model="model" cycle hide-delimiters height="100%" :show-arrows="!isXs && value.length > 1">
    <template v-slot:prev="{ on, attrs }">
      <v-btn fab color="white" class="shadow-card-md" v-bind="attrs" v-on="on">
        <v-icon color="primary">$ChevronLeftLightIcon</v-icon>
      </v-btn>
    </template>

    <template v-slot:next="{ on, attrs }">
      <v-btn fab color="white" class="shadow-card-md" v-bind="attrs" v-on="on">
        <v-icon color="primary">$ChevronRightLightIcon</v-icon>
      </v-btn>
    </template>

    <template v-if="$fetchState.pending">
      <v-carousel-item v-for="i in 1" :key="'load' + i">
        <YImg :loading="true" :aspect-ratio="16 / 5" :class="{ 'rounded-4': $vuetify.breakpoint.smAndUp }" />
      </v-carousel-item>
    </template>

    <template v-if="!$fetchState.pending">
      <v-carousel-item
        v-for="(banner, i) in value"
        :key="i"
        v-intersect="onIntersect"
        :class="{ 'px-sm-4': value.length > 1 }"
      >
        <!-- <YImg
          :src="
            !isXs
              ? banner[keyImgDekstop]
                ? banner[keyImgDekstop][keySrc]
                : null
              : banner[keyImgMobile]
              ? banner[keyImgMobile][keySrc]
              : null
          "
          :aspect-ratio="16 / 5"
          :class="{ 'rounded-4': $vuetify.breakpoint.smAndUp }"
        /> -->
        <YImg
          :src="banner[keyImgDekstop] ? banner[keyImgDekstop][keySrc] : null"
          :aspect-ratio="16 / 5"
          :class="{ 'rounded-4': $vuetify.breakpoint.smAndUp }"
        />
      </v-carousel-item>
    </template>

    <div v-if="!isXs" class="absolute-bottom-center d-flex justify-center mb-4">
      <div v-for="(item, x) in value" :key="x" v-ripple class="cursor-pointer" @click="model = x">
        <div v-if="model !== x" class="indicator"></div>

        <transition name="grow">
          <div v-if="model === x" class="indicator active"></div>
        </transition>
      </div>
    </div>
  </v-carousel>
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
    keyImgDekstop: {
      type: String,
      default: 'imageDesktop'
    },
    keyImgMobile: {
      type: String,
      default: 'imageMobile'
    },
    keySrc: {
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
      this.$emit('input', a)
    }
  },

  fetchOnServer: false,

  data() {
    return {
      model: 0,
      isHydrated: false,
      intersectKey: 0
    }
  },

  computed: {
    isXs() {
      return this.isHydrated ? this.$vuetify.breakpoint.xs : false
    }
  },

  watch: {},

  mounted() {
    this.isHydrated = true
  },

  methods: {
    onIntersect() {
      if (this.intersectKey === 0) {
        // reset carousel item to 0 index
        this.model = 0
        this.intersectKey += 1
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
  .v-skeleton-loader__image
    min-height 500px !important
    height 100% !important
  .v-image__image
    background-size 100% auto

.grow-enter-active {
  transition: all .5s;
  max-width : 24px;
}
.grow-enter  {
  max-width : 8px;
}

.indicator
  width 8px
  height 8px
  margin 0 2px
  border-radius 50%
  background rgba(0, 23, 31, 0.24)
  &.active
    width 24px
    background var(--v-primary-base)
    border-radius 10px
    border 1px solid #FFFFFF
</style>
