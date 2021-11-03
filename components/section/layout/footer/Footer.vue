<template>
  <div>
    <!-- <div class="background py-4">
      <v-container>
        <v-row>
          <v-col v-for="(service, i) in services" :key="i" cols="12" sm="4">
            <div class="d-flex align-center">
              <div
                class="rounded-circle border mr-4 d-flex flex-column align-center justify-center"
                style="min-width: 80px; height: 80px"
              >
                <v-icon color="primary" size="40">{{ service.icon }}</v-icon>
              </div>
              <div class="">
                <div class="text-subtitle2">{{ service.label }}</div>
                <div class="text-body2 sblack60--text">{{ service.desc }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="border-bottom"></div> -->
    <div class="background py-6">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3" class="d-flex flex-column" :class="{ 'align-center': $vuetify.breakpoint.xs }">
            <div>
              <YImg
                v-ripple
                contain
                :src="merchantLogoFooter"
                max-width="90px"
                max-height="50px"
                class="cursor-pointer mr-lg-4"
                :position="$vuetify.breakpoint.xs ? 'center' : 'left'"
              ></YImg>
            </div>
            <div class="text-body2 sblack60--text mt-4">{{ myMerchant.title }}. {{ myMerchant.tagline }}.</div>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <div class="text-subtitle2 mb-4">Kontak dan Sosial Media</div>
            <FooterMessengerItem :value="{ value: myMerchant.email, type: 'EMAIL' }" class="mb-2" />
            <FooterMessengerItem
              v-if="myMerchant.office"
              :value="{ value: myMerchant.office.phone, type: 'PHONE' }"
              class="mb-2"
            />

            <FooterMessengerItem v-for="(msg, i) in merchantMessengger" :key="i" :value="msg" class="mb-2" />
            <div class="mt-4"></div>
            <v-row dense>
              <v-col v-for="(social, i) in merchantSocials" :key="i" class="flex-grow-0">
                <FooterSocialItem :value="social" />
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="merchantCouriers.length" cols="12" sm="6" md="3">
            <div class="text-subtitle2 mb-4">Layanan Pengiriman</div>
            <v-row no-gutters class="ma-n1">
              <v-col v-for="(courier, i) in merchantCouriers" :key="i" class="flex-grow-0 pa-1">
                <FooterMethodItem :src="courier.image.src" />
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="merchantPayments.length" cols="12" sm="6" md="3">
            <div class="text-subtitle2 mb-4">Metode Pembayaran</div>
            <v-row no-gutters class="ma-n1">
              <v-col v-for="(payment, i) in merchantPayments" :key="i" class="flex-grow-0 pa-1">
                <FooterMethodItem :src="payment.image" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="blue20 text-center text-caption sblack60--text py-4">
      Copyright © 2021 Yukbisnis.com. All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {
          label: 'Kualitas Produk Terbaik',
          desc: 'Kualitas produk kami tidak diragukan lagi.',
          icon: '$GiftBoldIcon'
        },
        {
          label: 'Proses Order Cepat',
          desc: 'Pesanan akan langsung diproses dan dikirimkan.',
          icon: '$FlashBoldIcon'
        },
        {
          label: 'Pelayanan Pelanggan',
          desc: 'Operasional : Senin - Jumat | 08:00 - 09:00',
          icon: '$CustomerSupportBoldIcon'
        }
      ],
      merchantSocials: [],
      merchantPayments: [],
      merchantMessengger: [],
      merchantCouriers: []
    }
  },

  computed: {
    myMerchant() {
      return this.$store.state.merchant.myMerchant
    },

    merchantLogoFooter() {
      if (this.myMerchant && this.myMerchant.logoFooter) {
        return this.myMerchant.logoFooter
      } else {
        return null
      }
    }
  },

  mounted() {
    this.getFooter().then((res) => {
      this.merchantSocials = res.socials || []
      this.merchantPayments = res.payments || []
      this.merchantMessengger = res.messengger || []
      this.merchantCouriers = res.couriers || []
    })
  },

  methods: {
    async getFooter() {
      try {
        const a = await this.$repo.merchant.getMerchantFooter()
        const res = a.data.response
        if (res && res.status) {
          return res.results[0]
        }
      } catch (e) {}
    }
  }
}
</script>

<style lang="stylus" scoped></style>
