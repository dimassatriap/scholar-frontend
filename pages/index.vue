<template>
  <v-container class="">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center pt-16 px-16 pb-8">
          <YImg :src="require('~/assets/logos/logo-unpad.svg')"></YImg>
        </div>
      </v-col>
      <v-col cols="12" sm="10" md="8">
        <v-card elevation="0" outlined>
          <v-img height="250" :src="require(`~/assets/images/homepage/unpad-bg.jpeg`)">
            <div class="fill-height d-flex flex-column justify-center align-center">
              <div style="width: 70%">
                <v-text-field
                  id="publication-search"
                  v-model="search"
                  placeholder="Cari Riset"
                  outlined
                  append-icon="mdi-magnify"
                  class="mt-4"
                  background-color="rgba(255,255,255, 0.7)"
                  hide-details
                  rounded
                  @click:append="findPublication"
                  @keydown.enter.prevent="findPublication"
                />
              </div>
            </div>
          </v-img>

          <v-card-title class="headline"> Selamat datang di Portal Riset Universitas Padjadjaran </v-card-title>
          <v-card-text>
            <p>
              Di Universitas Padjadjaran, kami bertujuan untuk menyampaikan dan mengimplementasikan penelitian,
              pengetahuan, inovasi, teknologi, keterampilan, dan layanan kami secara regional, nasional, dan
              internasional dengan dampak yang bermanfaat bagi masyarakat, mitra, dan pemangku kepentingan. Portal Riset
              Unpad merupakan sumber informasi riset Universitas Padjadjaran (Unpad) yang up to date. Sebagai instrumen
              utama Pertukaran Penelitian dan Pengetahuan Unpad, Portal Penelitian Unpad bertujuan untuk meningkatkan
              visibilitas penulis Unpad dan dampak penelitian mereka serta untuk meningkatkan peluang kolaborasi.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: null
    }
  },

  methods: {
    findPublication() {
      this.$router.push({ path: '/research', query: { search: this.search } })
    }
  }
}
</script>
