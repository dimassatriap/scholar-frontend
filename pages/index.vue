<template>
  <v-container class="">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center pa-16">
          <YImg :src="require('~/assets/logos/logo-unpad.svg')"></YImg>
        </div>
        <v-card>
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
  components: {}
}
</script>
