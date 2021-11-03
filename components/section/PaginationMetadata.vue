<template>
  <client-only>
    <v-skeleton-loader v-if="loading" width="200" type="text"></v-skeleton-loader>

    <div v-else class="text-body2">
      Menampilkan
      <span v-if="pagination.totalItem > 1">
        <b>
          {{ firstItem }} <span v-if="lastItem > firstItem">-{{ lastItem }}</span>
        </b>
        dari
      </span>
      <b> {{ pagination.totalItem }} </b> {{ label }}<b v-if="search">"{{ search }}"</b>.
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    },
    search: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'produk'
    }
  },

  computed: {
    firstItem() {
      return (this.pagination.selectedPage - 1) * this.pagination.entries + 1
    },

    lastItem() {
      return (this.pagination.selectedPage - 1) * this.pagination.entries + this.pagination.totalItemPerPage
    }
  }
}
</script>

<style></style>
