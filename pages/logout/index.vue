<template>
  <div class="d-flex flex-column justify-center align-center" style="height: 100%">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    <div class="mt-4">Menunggu logout...</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('auth/logout')
    this.$YAlert.show({ content: 'Logout berhasil.', timeout: '2000' })
  }
}
</script>

<style></style>
