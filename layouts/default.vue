<template>
  <v-app dark>
    <v-app-bar height="130" max-height="130" elevation="0" color="white">
      <v-container class="pa-0">
        <YImg
          v-ripple
          contain
          :src="require('~/assets/logos/logo-unpad.svg')"
          max-width="320"
          class="cursor-pointer"
          position="left"
          @click="$router.push({ path: '/' })"
        ></YImg>
      </v-container>
    </v-app-bar>

    <v-main>
      <template v-if="$route.path != `/`">
        <v-divider></v-divider>
        <v-container class="px-4 py-0 pa-sm-0">
          <v-row no-gutters>
            <v-col cols="12">
              <div class="d-flex align-center" :style="{ gap: isXs ? `32px` : `64px` }">
                <v-hover v-for="(item, i) in navItems" :key="'items' + i" v-slot="{ hover }">
                  <NuxtLink
                    :to="item.to"
                    class="
                      text-decoration-none text--secondary
                      d-flex
                      flex-column
                      align-center
                      text-center
                      py-5
                      border-bottom-transparent
                    "
                    exact-active-class="border-bottom-primary"
                    :class="{ 'border-bottom-primary': hover }"
                    style="gap: 8px"
                  >
                    <div class="text-18-lato">
                      {{ item.title }}
                    </div>
                  </NuxtLink>
                </v-hover>

                <v-hover v-if="isXs" v-slot="{ hover }">
                  <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        class="text--secondary d-flex flex-column align-center text-center ml-n2"
                        style="gap: 8px"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <div :class="{ 'primary--text': hover }" class="text-18-lato">Lainnya</div>
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
                          <v-list-item-title class="text-16 text-lato">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </NuxtLink>
                    </v-list>
                  </v-menu>
                </v-hover>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
      </template>
      <nuxt />
    </v-main>

    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <YAlert />
  </v-app>
</template>

<script>
import allLayoutMixins from '~/mixins/all-layout'
import breakpointMixin from '~/mixins/breakpoint'
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [allLayoutMixins, breakpointMixin, accountScholarMixins],
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Beranda',
          to: '/'
        },
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
      ],

      miniVariant: false
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

  mounted() {}
}
</script>

<style></style>
