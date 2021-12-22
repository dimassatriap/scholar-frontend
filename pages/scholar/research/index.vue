<template>
  <v-container>
    <v-card flat>
      <v-tabs background-color="sblack5" show-arrows>
        <v-tab v-for="(item, i) in navItems" :key="i" :href="'#tab-' + i" :to="item.to"> {{ item.label }} </v-tab>
      </v-tabs>
    </v-card>

    <div class="mt-6">
      <NuxtChild />
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      navItems: [{ label: 'Publikasi', to: '/scholar/research/publication' }]
    }
  }
}
</script>

<style lang="stylus">
.v-slide-group__wrapper
  padding 0 8px
</style>
