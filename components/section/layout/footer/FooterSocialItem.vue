<template>
  <div
    v-ripple
    class="primary rounded-circle d-flex flex-column justify-center align-center cursor-pointer"
    style="height: 34px; width: 34px"
    @click="$helpers.openLink(value.url)"
  >
    <v-icon color="white" class="">{{ getSocialIcon(value.type) }}</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  methods: {
    getSocialIcon(type) {
      switch (type) {
        case 'INSTAGRAM':
          return '$InstagramLightIcon'
        case 'FACEBOOK':
          return '$FacebookBoldIcon'
        case 'TWITTER':
          return '$TwitterBoldIcon'
        default:
          return '$LinkBoldIcon'
      }
    }
  }
}
</script>

<style></style>
