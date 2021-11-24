<template>
  <v-avatar :size="size" :class="{ 'border-white': outlined }" :color="color" @click="$emit('click')">
    <slot></slot>
    <v-img v-if="!$slots['default']" :src="src" @error="onErrorProfileImg">
      <template v-slot:placeholder>
        <v-skeleton-loader v-if="!errorProfileImg && src" type="image" />
        <v-img v-else :src="require(`~/assets/images/user/avatar-default.png`)" />
      </template>
    </v-img>
  </v-avatar>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 48
    },
    src: {
      type: [String, Object],
      default: null
    },
    outlined: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'white'
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

<style lang="stylus" scoped></style>
