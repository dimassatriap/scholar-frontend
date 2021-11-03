<template>
  <div>
    <v-bottom-sheet
      :value="value"
      transition="dialog-top-transition"
      style="align-self: flex-start"
      @click:outside="closeDialog"
      @keydown.esc="closeDialog"
    >
      <div class="white">
        <v-container class="py-2 px-4 d-flex align-center">
          <YBtn icon color="black" class="mr-2 mr-sm-4" @click="closeDialog"><v-icon>$CloseLightIcon</v-icon></YBtn>
          <YInput
            id="product-name"
            v-model="search"
            placeholder="Cari produk"
            :filled="false"
            class="flex-grow-1"
            field-class="rounded-8"
            prepend-inner-class="pl-4"
            @keydown.native.enter="goToSearchProducts"
          >
            <template v-slot:prepend-inner>
              <v-icon size="16" color="sblack60">$SearchLightIcon</v-icon>
            </template>
          </YInput>
        </v-container>
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      search: ''
    }
  },

  methods: {
    closeDialog() {
      this.$emit('input', false)
    },

    goToSearchProducts() {
      this.$router.push({ path: '/search', query: { name: this.search } })
    },

    goToSearchProductsWithDelay() {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.$router.push({ path: '/search', query: { name: this.search } })
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-dialog
    box-shadow 0px 0px 8px rgba(113, 115, 115, 0.16)
  .v-bottom-sheet.v-dialog
    align-self flex-start
</style>
