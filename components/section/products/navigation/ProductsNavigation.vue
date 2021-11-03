<template>
  <v-pagination
    v-model="pagination.selectedPage"
    :length="pagination.totalPage"
    circle
    :total-visible="7"
    :disabled="disabled"
    class="primary--text"
  ></v-pagination>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped></style>
