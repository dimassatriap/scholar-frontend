<template>
  <v-img
    :src="src"
    :aspect-ratio="aspectRatio"
    :width="width"
    :height="height"
    :min-height="minHeight"
    :min-width="minWidth"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :position="position"
    :contain="contain"
    :transition="transition"
    @click="$emit('click')"
    @error="onErrorProfileImg"
  >
    <template v-slot:placeholder>
      <v-skeleton-loader v-if="(!errorProfileImg && src) || loading" type="image" />
      <div v-else>
        <v-img
          :src="
            imgDefaultAsAvatar
              ? require(`~/assets/images/user/avatar-default.png`)
              : require(`~/assets/images/product/no-image.svg`)
          "
          :aspect-ratio="aspectRatio"
          :width="width"
          :height="height"
          :min-height="minHeight"
          :min-width="minWidth"
          :max-height="maxHeight"
          :max-width="maxWidth"
          :position="position"
          :contain="contain"
        />
      </div>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    src: {
      type: [String, Object],
      default: null
    },
    aspectRatio: {
      type: [String, Number],
      default: null
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    minWidth: {
      type: [String, Number],
      default: null
    },
    minHeight: {
      type: [String, Number],
      default: null
    },
    maxWidth: {
      type: [String, Number],
      default: null
    },
    maxHeight: {
      type: [String, Number],
      default: null
    },
    position: {
      type: String,
      default: 'center center'
    },
    transition: {
      type: [String, Boolean],
      default: 'fade-transition'
    },
    contain: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    imgDefaultAsAvatar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      errorProfileImg: false
    }
  },

  methods: {
    onErrorProfileImg() {
      this.errorProfileImg = true
    }
  }
}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-skeleton-loader__image
    min-height 700px !important
    height 100% !important
</style>
