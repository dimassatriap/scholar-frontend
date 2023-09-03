<template>
  <div>
    <v-img height="470" :src="require(`~/assets/images/homepage/unpad-bg.jpeg`)">
      <div class="fill-height d-flex flex-column justify-center align-center">
        <div :style="{ width: isSmAndDown ? `90%` : `50%` }">
          <v-card flat color="rgba(0, 0, 0, 0.4)" class="py-8 px-sm-16">
            <v-card-title
              class="text-h5 text-md-h4 font-weight-medium white--text justify-center text-center"
              style="word-break: break-word"
            >
              Welcome to Scholar Unpad
            </v-card-title>

            <v-card-text>
              <div class="text-h6 text-md-h5 font-weight-medium white--text justify-center text-center">
                Portal Publikasi Universitas Padjadjaran
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-img>

    <v-container class="">
      <v-col cols="12">
        <div class="d-flex justify-center align-center" :style="{ gap: `64px` }">
          <v-hover v-for="(item, i) in navItems" :key="'items' + i" v-slot="{ hover }">
            <NuxtLink
              :to="item.to"
              class="text-decoration-none text--secondary d-flex flex-column align-center text-center"
              style="gap: 8px"
            >
              <div>
                <v-icon size="32" :class="{ 'primary--text': hover }">{{ item.icon }}</v-icon>
              </div>
              <div class="text-18-lato">
                {{ item.title }}
              </div>
            </NuxtLink>
          </v-hover>

          <v-hover v-if="isXs" v-slot="{ hover }">
            <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
              <template v-slot:activator="{ on, attrs }">
                <div
                  class="text--secondary d-flex flex-column align-center text-center ml-n4"
                  style="gap: 8px"
                  v-bind="attrs"
                  v-on="on"
                >
                  <div>
                    <v-icon size="32" :class="{ 'primary--text': hover }">mdi-dots-horizontal</v-icon>
                  </div>
                  <div class="text-18-lato">Lainnya</div>
                </div>
              </template>

              <v-list>
                <NuxtLink
                  v-for="(item, i) in isLogin ? accountScholarItems : authItems"
                  :key="'lainnya' + i"
                  :to="item.to"
                  class="text-decoration-none"
                >
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="text-16 text-lato">{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </NuxtLink>
              </v-list>
            </v-menu>
          </v-hover>
        </div>
      </v-col>
    </v-container>

    <v-divider></v-divider>

    <v-container class="">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card elevation="0">
            <v-card-title class="headline"> Selamat datang di Portal Publikasi Universitas Padjadjaran </v-card-title>
            <v-card-text>
              <p class="text-justify">
                Di Universitas Padjadjaran, kami bertujuan untuk menyampaikan dan mengimplementasikan penelitian,
                pengetahuan, inovasi, teknologi, keterampilan, dan layanan kami secara regional, nasional, dan
                internasional dengan dampak yang bermanfaat bagi masyarakat, mitra, dan pemangku kepentingan. Portal
                Publikasi Unpad merupakan sumber informasi riset Universitas Padjadjaran (Unpad) yang up to date.
                Sebagai instrumen utama Pertukaran Penelitian dan Pengetahuan Unpad, Portal Penelitian Unpad bertujuan
                untuk meningkatkan visibilitas penulis Unpad dan dampak penelitian mereka serta untuk meningkatkan
                peluang kolaborasi.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [breakpointMixin, accountScholarMixins],
  data() {
    return {
      search: null,
      showMenu: false,
      items: [
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Publikasi',
          to: '/research'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Dosen',
          to: '/profiles'
        }
      ],

      authItems: [
        {
          icon: 'mdi-login-variant',
          title: 'Masuk',
          to: '/login'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Daftar',
          to: '/register'
        }
      ],

      accountScholarItems: [
        {
          icon: 'mdi-account',
          title: 'Akun Saya',
          to: '/scholar/profile'
        },
        {
          icon: 'mdi-clipboard-text',
          title: 'Publikasi Saya',
          to: '/scholar/research/publication'
        },
        {
          icon: 'mdi-logout',
          title: 'Keluar',
          to: '/logout'
        }
      ]
    }
  },

  computed: {
    navItems() {
      let navs

      if (this.isXs) navs = this.items
      else if (this.isLogin) navs = this.items.concat(this.accountScholarItems)
      else navs = this.items.concat(this.authItems)

      return navs
    }
  },

  methods: {
    findPublication() {
      this.$router.push({ path: '/research', query: { search: this.search } })
    }
  }
}
</script>
