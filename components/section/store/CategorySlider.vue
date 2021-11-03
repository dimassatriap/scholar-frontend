<template>
  <v-slide-group v-model="model" center-active class="">
    <template v-if="$fetchState.pending">
      <v-slide-item v-for="i in 4" :key="'load' + i">
        <div class="slide-item" :class="{ 'pl-0': i === 0, 'pr-0': i === 4 }">
          <v-img class="rounded-circle mb-2" :src="null" :aspect-ratio="1" :width="widthItem" :height="widthItem">
            <v-skeleton-loader type="image" />
          </v-img>
          <v-skeleton-loader width="80" type="text"></v-skeleton-loader>
        </div>
      </v-slide-item>
    </template>

    <template v-if="!$fetchState.pending">
      <v-slide-item v-for="(item, i) in value" :key="i">
        <div
          v-ripple
          class="slide-item cursor-pointer rounded-4"
          :class="{ 'pl-0': i === 0, 'pr-0': i === value.length - 1 }"
          @click="$router.push(item.url)"
        >
          <YImg class="rounded-circle mb-2" :src="item.image" :aspect-ratio="1" :width="widthItem" />
          <div class="text-center text-heading6" :style="`width: ${widthItem}px; white-space: normal`">
            {{ item.name }}
          </div>
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
      model: null
    }
  },

  computed: {
    widthItem() {
      return this.$vuetify.breakpoint.xs ? 64 : 80
    }
  }
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
</style>
