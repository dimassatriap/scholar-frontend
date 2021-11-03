<template>
  <v-btn
    :block="block"
    :color="color"
    :depressed="depressed"
    :large="large"
    :x-large="xLarge"
    :small="small"
    :loading="loading"
    :outlined="outlined"
    :width="width"
    :height="height"
    :min-width="minWidth"
    :min-height="minHeight"
    :icon="icon"
    :fab="fab"
    :text="text"
    :class="{
      'btn-disable': disabled,
      'pointer-none': disabled2,
      'sblack5 primary--text': secondary,
      'sblack5 sblack60--text': tertiary,
      'pa-0': text && small
    }"
    :to="to"
    @click="$emit('click')"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    depressed: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabled2: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    xLarge: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    tertiary: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    minWidth: {
      type: [Number, String],
      default: null
    },
    minHeight: {
      type: [Number, String],
      default: null
    },
    fab: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    to: {
      type: [Object, String],
      default: null
    }
  },
  data() {
    return {}
  },

  watch: {},

  mounted() {}
}
</script>

<style lang="stylus" scoped>
.btn-disable
  opacity 0.2
  pointer-events none
.pointer-none
  pointer-events none
</style>
