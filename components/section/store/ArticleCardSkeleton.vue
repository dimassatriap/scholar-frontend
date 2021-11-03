<template>
  <v-card class="shadow-card-sm">
    <YImg :loading="true" :aspect-ratio="16 / 9" />
    <v-card-text style="">
      <v-skeleton-loader type="sentences"></v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-skeleton-loader__image
    min-height 1000px !important
    height 100% !important
</style>
