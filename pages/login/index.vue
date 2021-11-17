<template>
  <div>
    <AuthCardContainer class="mt-sm-8 mb-sm-25">
      <div class="pa-4 pa-sm-8 pa-lg-12" style="min-height: 500px">
        <div class="d-flex align-center justify-space-between">
          <YBtn text small @click="$helpers.handleBack(fromRoute)">
            <v-icon size="16" class="mr-1">$ArrowLeftLightIcon</v-icon>
            <span class="text-body2 bold">Kembali</span>
          </YBtn>
          <div class="d-flex align-center">
            <div class="text-body2">Belum punya akun?</div>
            <YBtn text small class="ml-1" to="/register">
              <span class="text-body2 bold">Daftar</span>
            </YBtn>
          </div>
        </div>
        <h3 class="mt-8 mb-6">Masuk</h3>

        <MessageInfo
          :messages.sync="errorMessage"
          class="mb-4"
          card-class="sred20"
          text-class="sblack--text"
          icon-color="sred60"
        />

        <v-form ref="form" v-model="form.isValid" lazy-validation @submit.prevent="submit">
          <YInput
            id="input-username"
            v-model="form.username"
            placeholder="Masukan Username"
            label="Username"
            class="mb-4"
            :rules="$helpers.formRules('required')"
          />

          <YInput
            id="password"
            v-model="form.password"
            placeholder="Masukan Kata Sandi"
            label="Kata Sandi"
            class="mb-4"
            password
            :rules="$helpers.formRules('password')"
          />

          <div class="d-flex justify-space-between align-center mb-4">
            <v-checkbox v-model="isRememberMe" label="Ingat akun saya" hide-details="auto" class="mt-0"></v-checkbox>
            <!-- <YBtn text small to="/forgot-password">Lupa kata sandi?</YBtn> -->
          </div>

          <YBtn large block class="mt-6" :loading="loading" :disabled="!form.isValid" type="submit">Masuk</YBtn>
        </v-form>
      </div>
    </AuthCardContainer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromRoute: '',
      form: {
        isValid: false,
        username: null,
        password: null
      },
      loading: false,
      isRememberMe: true,
      errorMessage: {}
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromRoute = from
    })
  },

  computed: {},

  mounted() {},

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.errorMessage = {}
        this.loading = true
        try {
          const a = await this.$repo.auth.login(this.form)
          const res = a.data
          if (res && res.status) {
            this.$store.dispatch('auth/saveAccount', res.results)
            // await this.$store.dispatch('auth/initAuth', this.$route)
            this.$YAlert.show({ content: res.messages, timeout: '3000' })

            this.$router.push('/')
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

<style lang="stylus" scoped>
::v-deep {
  .v-label {
    font-size: 14px;
    font-family: 'Lato', sans-serif;
  }
}
</style>
