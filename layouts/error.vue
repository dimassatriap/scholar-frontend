<template>
  <v-app dark>
    <div class="d-flex flex-column justify-center align-center text-center" style="height: 90vh">
      <v-icon size="80" color="black" class="mb-2">$AlertCircleLightIcon</v-icon>
      <h1 v-if="error.statusCode === 404">Halaman tidak ditemukan</h1>
      <h1 v-else>Terjadi kesalahan</h1>
      <NuxtLink to="/" class="mt-4">
        <v-btn large depressed color="error">Home Page</v-btn>
      </NuxtLink>
    </div>

    <YAlert />
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
