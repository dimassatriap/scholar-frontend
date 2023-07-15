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

    <v-footer :absolute="true" app class="justify-space-between">
      <div>Copyright &copy;{{ new Date().getFullYear() }} Scholar Unpad. All Rights Reserved.</div>

      <div class="">
        <v-dialog v-model="helpDialog" width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text class="pa-0 text-subtitle1" color="black" dark v-bind="attrs" v-on="on"> Bantuan </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2"> Laman Bantuan </v-card-title>

            <v-card-text>
              <div class="mb-4">
                Anda dapat mengirim pesan jika menemukan kendala dalam aplikasi ini. Sertakan alamat email anda agar
                kami dapat menghubungi anda lebih lanjut. Terima kasih.
              </div>

              <MessageInfo
                :messages.sync="errorMessage"
                class="mb-4"
                card-class="sred20"
                text-class="sblack--text"
                icon-color="sred60"
              />

              <v-form ref="form" v-model="form.isValid" lazy-validation @submit.prevent="submit">
                <YInput
                  id="input-email"
                  v-model="form.email"
                  placeholder="Masukan Email"
                  label="Email"
                  class="mb-4"
                  :rules="$helpers.formRules('optional-email')"
                />

                <div class="mb-1 text-truncate">
                  <label for="input-messages" class="text-body2 sblack60--text"> Pesan </label>
                </div>
                <v-textarea
                  id="input-messages"
                  v-model="form.messages"
                  placeholder="Masukan Pesan"
                  :rows="3"
                  filled
                  outlined
                  :rules="$helpers.formRules('required')"
                  hide-details="auto"
                ></v-textarea>

                <div class="d-flex justify-end">
                  <YBtn class="mt-4" :loading="loading" :disabled="!form.isValid" type="submit">Kirim</YBtn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
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
      showMenu: false,
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

      miniVariant: false,
      helpDialog: false,
      form: {
        isValid: false,
        email: null,
        messages: null
      },
      loading: false,
      errorMessage: {}
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

  mounted() {},

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.errorMessage = {}
        this.loading = true
        try {
          const a = await this.$repo.auth.postHelpdesk(this.form)
          const res = a.data
          if (res && res.status) {
            this.$YAlert.show({ content: 'Pesan anda berhasil terkirim. Terima kasih.', timeout: '3000' })
            this.helpDialog = false
            this.form = {
              isValid: false,
              email: null,
              messages: null
            }
          } else {
            this.errorMessage = this.$helpers.keysToCamel(res.messages)
          }
        } catch (e) {
          const res = e.response.data
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style></style>
