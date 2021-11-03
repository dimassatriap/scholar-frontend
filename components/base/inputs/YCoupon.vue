<template>
  <v-card class="card-coupon">
    <v-card-text>
      <div class="mb-2">
        <v-icon>$CouponBoldIcon</v-icon>
        <span class="font-weight-bold black--text ml-2">Voucher</span> <span>(Opsional)</span>
      </div>
      <div class="d-flex mx-n2 mb-2">
        <div class="mx-2 flex-grow-1">
          <!-- :rules="[(v) => !!v || 'Isi Coupon']" -->
          <v-text-field
            id="input-coupon"
            v-model="code"
            placeholder="Masukan Kode Voucher"
            outlined
            filled
            hide-details="auto"
            @keypress.enter="$emit('submit', code)"
          ></v-text-field>
        </div>
        <div class="mx-2">
          <YBtn
            secondary
            block
            height="100%"
            color="primary"
            :disabled="!code"
            :loading="loading"
            @click="$emit('submit', code)"
          >
            Gunakan
          </YBtn>
        </div>
      </div>

      <div v-if="value.value" class="primary--text text-12">
        {{ getLabel }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Coupon',

  props: {
    value: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    totalPayment: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      valid: false,
      code: null
    }
  },

  computed: {
    getLabel() {
      let discount = 0

      if (Object.prototype.hasOwnProperty.call(this.value, 'code')) {
        if (this.value.type === 'NOMINAL') {
          discount = this.value.value
        } else {
          discount = (this.totalPayment * parseInt(this.value.value)) / 100
        }
      }

      return `Voucher Berhasil Digunakan. Potongan : ${this.$helpers.formatPrice(discount)}`
    }
  },

  methods: {
    removeVoucher() {
      this.$emit('input', {})
    }
  }
}
</script>

<style scoped lang="scss">
.card-coupon {
  border: 1px dashed #d0d0d0 !important;
  border-radius: 4px !important;
  box-shadow: none !important;
}
</style>
