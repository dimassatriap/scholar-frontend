<template>
  <div>
    <AuthCardContainer class="mt-sm-8 mb-sm-25">
      <div class="pa-4 pa-sm-8 pa-lg-12">
        <div class="d-flex align-center justify-space-between">
          <YBtn text small @click="$helpers.handleBack(fromRoute)">
            <v-icon size="16" class="mr-1">$ArrowLeftLightIcon</v-icon>
            <span class="text-body2 bold">Kembali</span>
          </YBtn>
          <div class="d-flex align-center">
            <div class="text-body2">Sudah punya akun?</div>
            <YBtn text small class="ml-1" to="/login">
              <span class="text-body2 bold">Masuk</span>
            </YBtn>
          </div>
        </div>
        <h3 class="mt-8 mb-6">Daftar Akun Scholar</h3>

        <MessageInfo
          :messages.sync="errorMessage"
          card-class="sred20"
          text-class="sblack--text"
          icon-color="sred60"
          class="mb-4"
        />

        <v-form ref="form" v-model="form.isValid" lazy-validation @submit.prevent="submit">
          <YInput
            id="name"
            v-model="form.name"
            placeholder="Masukan Nama lengkap"
            label="Nama Lengkap"
            class="mb-4"
            :rules="$helpers.formRules('required-name')"
          />

          <YInput
            id="input-username"
            v-model="form.username"
            placeholder="Masukan Username"
            label="Username"
            class="mb-4"
            :rules="$helpers.formRules('required')"
          />

          <YInput
            id="input-email"
            v-model="form.email"
            placeholder="Masukan Email"
            label="Email"
            class="mb-4"
            :rules="$helpers.formRules('email')"
          />

          <YInput
            id="phone"
            v-model="form.phone"
            placeholder="Masukan No. Handphone"
            label="No. Handphone"
            class="mb-4"
            prepend-inner-text="+62"
            type="number"
            :rules="$helpers.formRules('phone')"
          />

          <YInput
            id="password"
            v-model="form.password"
            placeholder="Masukan Kata Sandi"
            label="Kata Sandi"
            hint="Minimal 6 Karakter"
            class="mb-4"
            password
            :rules="$helpers.formRules('password')"
          />

          <YBtn large block type="submit" :loading="loading" :disabled="!form.isValid" class="mt-6">Daftar</YBtn>
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
        username: null,
        password: null,
        email: null,
        name: '',
        phone: null,
        accountId: null,
        isValid: false
      },
      loading: false,
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
        this.loading = true
        this.errorMessage = {}
        const form = {
          ...this.form,
          phone: 62 + this.form.phone
        }

        try {
          const res1 = await this.postAccount(form)
          if (res1.status) {
            form.accountId = res1.results.id
            const res2 = await this.postScholar(form)
            if (res2.status) {
              this.getScholarById(res2.results.id)
              this.login(form)
            }
          }
        } catch (error) {
        } finally {
          this.loading = false
        }
      }
    },

    async postAccount(form) {
      try {
        const a = await this.$repo.auth.register(form)
        const res = a.data
        if (res && res.status) {
          this.$YAlert.show({ content: 'Account berhasil dibuat.', timeout: '3000' })
          return res
        } else {
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        const res = e.response.data
        this.errorMessage = this.$helpers.keysToCamel(res.messages)
      }
    },

    async postScholar(form) {
      try {
        const a = await this.$repo.scholar.create(form)
        const res = a.data
        if (res && res.status) {
          this.$YAlert.show({ content: 'Scholar berhasil dibuat.', timeout: '3000' })
          this.$store.commit('scholar/SET_SCHOLAR', res.results)
          return res
        } else {
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        const res = e.response.data
        this.errorMessage = this.$helpers.keysToCamel(res.messages)
      }
    },

    async login(form) {
      try {
        const a = await this.$repo.auth.login(form)
        const res = a.data
        if (res && res.status) {
          this.$store.dispatch('auth/saveAccount', res.results)
          // await this.$store.dispatch('auth/initAuth', this.$route)

          this.$router.push('/')
        } else {
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        const res = e.response.data
        this.errorMessage = this.$helpers.keysToCamel(res.messages)
      }
    },

    async getScholarById(id) {
      try {
        const a = await this.$repo.scholar.getScholarById(id)
        const res = a.data
        if (res && res.status) {
          this.$store.commit('scholar/SET_SCHOLAR', res.results)
        }
      } catch (e) {}
    }
  }
}
</script>

<style lang="stylus" scoped></style>
