<template>
  <div>
    <AuthCardContainer v-if="!adminLogin" class="mt-sm-8 mb-sm-25">
      <div class="pa-4 pa-sm-8 pa-lg-12" style="min-height: 500px">
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

          <YBtn large block class="mt-6" :loading="loading" :disabled="!form.isValid" type="submit">Masuk</YBtn>
        </v-form>
      </div>
    </AuthCardContainer>

    <NuxtChild v-else />
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      form: {
        isValid: false,
        username: null,
        password: null
      },
      loading: false,
      errorMessage: {},
      adminLogin: false
    }
  },

  computed: {},

  mounted() {},

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.errorMessage = {}
        this.loading = true
        try {
          const res = this.form.password === process.env.ADMIN_PASSWORD
          if (res) {
            this.adminLogin = true
          } else {
            this.errorMessage = this.$helpers.keysToCamel('Invalid Password')
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
