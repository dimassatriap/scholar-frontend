<template>
  <div>
    <SearchProductTopDialog v-model="isSearchProductTopDialog" />
    <v-app-bar app fixed color="white" class="shadow-nav">
      <v-container class="pa-0 pa-sm-4">
        <v-row dense>
          <v-col class="flex-grow-0 d-flex flex-column justify-center">
            <YImg
              v-ripple
              contain
              :src="merchantLogo"
              max-width="90px"
              max-height="50px"
              class="cursor-pointer mr-lg-4"
              position="left"
              @click="$router.push({ path: '/' })"
            ></YImg>
          </v-col>

          <v-col v-if="isMdAndUp" cols="4" md="6" lg="7">
            <v-skeleton-loader v-if="isLoadingNav" type="table-row"></v-skeleton-loader>
            <v-tabs v-else v-model="tabs" optional show-arrows hide-slider>
              <v-tab
                v-for="(item, index) in mainNav"
                :key="index"
                :to="item.child.length ? null : item.url"
                class="pa-0 text-capitalize"
                :class="{ 'mx-3': !item.child.length }"
              >
                <template v-if="item.child.length">
                  <HeaderMainNavMenuChild :value="item" />
                </template>

                <span v-else>
                  {{ item.parameter }}
                </span>
              </v-tab>
            </v-tabs>
          </v-col>

          <v-col class="d-flex align-center justify-end">
            <YBtn small color="sblack60" icon @click="isSearchProductTopDialog = true">
              <v-icon>$SearchLightIcon</v-icon>
            </YBtn>
            <YBtn small color="sblack60" icon class="ml-3" @click="toWishlist">
              <v-icon>$WishlistBoldIcon</v-icon>
            </YBtn>
            <UserCartsNav v-if="isHydrated" class="ml-3" />

            <v-divider v-if="isMdAndUp" vertical inset class="ml-4" />

            <v-menu v-if="user.idMember" open-on-hover min-width="192" max-width="250" offset-y rounded="8">
              <template v-slot:activator="{ on, attrs }">
                <v-card flat class="d-flex align-center rounded-4 ml-3 ml-md-4" v-bind="attrs" offset-y v-on="on">
                  <YAvatar :src="user.avatar.src" size="24" class="rounded-circle" />
                  <div
                    v-if="isSmAndUp"
                    class="text-subtitle3 sblack60--text ml-2 text-truncate"
                    style="max-width: 80px"
                  >
                    {{ getNameFirst }}
                  </div>
                </v-card>
              </template>

              <div class="white shadow-card-md py-2">
                <div class="py-2 px-4">
                  <UserWalletInfo />
                </div>

                <v-list flat>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(item, i) in userNav"
                      :key="'user-nav' + i"
                      :value="item"
                      dense
                      flat
                      :to="item.to"
                    >
                      <v-list-item-icon class="mr-2">
                        <v-icon>{{ item.icon }}{{ checkIsNavActive(item.to) ? 'Bold' : 'Light' }}Icon</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.label"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item dense flat @click="logout">
                      <v-list-item-icon class="mr-2">
                        <v-icon color="red60">$LogoutLightIcon</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="red60--text">Keluar</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
            </v-menu>

            <template v-if="isMdAndUp && !user.idMember">
              <YBtn class="ml-4" dark to="/register">Daftar</YBtn>
              <YBtn secondary class="ml-4" to="/login">Masuk</YBtn>
            </template>

            <YBtn v-if="isSmAndDown" small color="sblack60" icon class="ml-3" @click="drawer = !drawer">
              <v-icon>$MenuLightIcon</v-icon>
            </YBtn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" right temporary fixed class="pa-4">
      <div class="d-flex justify-space-between">
        <div>
          <YImg
            v-ripple
            contain
            class="cursor-pointer"
            max-width="90px"
            max-height="50px"
            :src="merchantLogo"
            position="left"
            @click="$router.push('/')"
          />
        </div>
        <YBtn icon color="sblack60" @click="drawer = false">
          <v-icon>$CloseLightIcon</v-icon>
        </YBtn>
      </div>

      <div class="py-3 border-bottom"><!-- spacer --></div>

      <div v-if="isLoadingNav">
        <v-skeleton-loader
          v-for="i in 4"
          :key="'skeleton-list-item' + i"
          type="list-item"
          class="border-bottom"
        ></v-skeleton-loader>
      </div>

      <v-list v-else class="mx-n6">
        <HeaderMainNavChildItem
          v-for="(item, i) in mainNav"
          :key="'mobile-main-nav' + i"
          :value="item"
          :sub-group="false"
          class="border-bottom"
        />
      </v-list>

      <template v-if="!user.idMember">
        <YBtn large secondary block class="mt-6 mb-4" to="/login">Masuk</YBtn>
        <YBtn large block to="/register">Daftar</YBtn>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'
import userData from '~/mixins/user-data'

export default {
  mixins: [breakpointMixin, userData],
  data() {
    return {
      drawer: false,
      tabs: null,
      navItems: [],
      isLoadingNav: true,
      isSearchProductTopDialog: false
    }
  },

  computed: {
    mainNav() {
      const filter = (nav) => {
        const currentAllowedRoute = [
          '',
          'product',
          'category',
          'brand',
          'article',
          'blog',
          'page',
          'register',
          'contact'
        ]
        const arrayUrl = nav.url.split('/')
        return currentAllowedRoute.includes(arrayUrl[1])
      }

      const filterMain = this.navItems.filter((e) => e.position === 'main' && e.parameter && filter(e))

      const filterEmptyCategoryAndBrand = filterMain.filter((e) => {
        if (e.parameter === 'Kategori' || e.parameter === 'Brand') {
          return e.child.length > 0
        } else {
          return true
        }
      })

      return filterEmptyCategoryAndBrand
    },

    myMerchant() {
      return this.$store.state.merchant.myMerchant
    },

    merchantLogo() {
      if (this.myMerchant && this.$helpers.isObject(this.myMerchant.logo) && this.myMerchant.logo.src) {
        return this.myMerchant.logo
      } else {
        return null
      }
    }
  },

  mounted() {
    this.getNav().then((res) => {
      this.navItems = res || []
      this.isLoadingNav = false
    })
  },

  methods: {
    async getNav() {
      try {
        const a = await this.$repo.merchant.getHeaderNavigation()
        const res = a.data.response
        if (res && res.status) {
          return this.$helpers.keysToCamel(res.results)
        }
      } catch (e) {
      } finally {
      }
    },

    toWishlist() {
      if (this.user.idMember) {
        this.$router.push('/user/wishlist')
      } else {
        this.$router.push('/login')
        this.$YAlert.show({ content: 'Login untuk menambahkan Wishlist.', timeout: 3000 })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
::v-deep {
  .v-slide-group__next, .v-slide-group__prev {
    flex-basis: 32px;
    min-width: 32px;
  }

  .v-badge__badge {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 10px;
    height: 14px;
    min-width: 14px;
    padding: 0 4px;
  }

  .v-badge--bordered .v-badge__badge::after {
    border-width: 1px;
  }

  .v-list-item {
    padding-left: 24px;
    padding-right: 24px;
  }

  .v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle {
    font-size: 14px;
  }
}
</style>
