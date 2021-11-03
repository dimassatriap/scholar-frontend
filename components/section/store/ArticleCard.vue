<template>
  <v-card v-if="$helpers.isObject(value.header)" class="shadow-card-sm" @click="onClick">
    <YImg :src="value.header.image ? value.header.image.srcProxy : null" :aspect-ratio="16 / 9" />
    <v-card-text>
      <div class="text-14 text-sm-16 text-truncate text--primary">
        {{ value.header.title }}
      </div>
      <div class="text-caption">{{ $moment(value.header.timestampCreate).format('DD MMM YYYY') }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  methods: {
    onClick() {
      this.$router.push(this.value.header.url)
    }
  }
}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-skeleton-loader__image
    min-height 1000px !important
    height 100% !important
</style>
