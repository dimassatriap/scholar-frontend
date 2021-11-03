<template>
  <v-card :loading="loading" :elevation="elevation">
    <template slot="progress">
      <v-progress-linear color="primary" height="10" indeterminate></v-progress-linear>
    </template>

    <v-card-title v-if="isTitle">
      <div :class="`${titleClass} bold`">
        <slot name="header"></slot>
      </div>
    </v-card-title>

    <v-divider v-if="isTitle"></v-divider>

    <v-card-text>
      <slot name="content"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'YCard',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    isTitle: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: Number,
      default: 0
    },
    titleClass: {
      type: String,
      default: 'text-24'
    }
  }
}
</script>

<style scoped></style>
