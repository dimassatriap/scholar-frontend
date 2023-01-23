<template>
  <div>
    <h5>Publikasi Baru</h5>

    <MessageInfo
      :messages.sync="errorMessage"
      card-class="sred20"
      text-class="sblack--text"
      icon-color="sred60"
      class="mb-4"
    />

    <v-form ref="form" v-model="form.isValid" lazy-validation class="mt-4" @submit.prevent="postPublication(form)">
      <YInput
        id="publication-name"
        v-model="form.name"
        placeholder="Masukan Nama Publikasi"
        label="Nama Publikasi"
        class="mb-4"
        :rules="$helpers.formRules('required')"
      />

      <v-container class="pa-0">
        <v-row dense>
          <v-col cols="4">
            <YBtn
              secondary
              large
              block
              class="mt-6"
              @click="$helpers.handleBack(fromRoute, '/scholar/research/publication')"
            >
              Tutup
            </YBtn>
          </v-col>
          <v-col cols="8">
            <YBtn large block class="mt-6" type="submit">Buat</YBtn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [breakpointMixin, accountScholarMixins],
  data() {
    return {
      fromRoute: '',
      form: {
        name: null
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

  methods: {
    async postPublication(form) {
      if (this.$refs.form.validate()) {
        try {
          const payload = { ...form, scholarId: this.scholar.id }
          const a = await this.$repo.scholar.createPublication(payload)
          const res = a.data
          if (res && res.status) {
            this.$YAlert.show({ content: res.messages, timeout: '3000' })
            this.$store.commit('alert/scholarPublicationChanged')
            return res
          } else {
            this.errorMessage = this.$helpers.keysToCamel(res.messages)
          }
        } catch (e) {
          const res = e.response.data
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      }
    }
  }
}
</script>

<style></style>
