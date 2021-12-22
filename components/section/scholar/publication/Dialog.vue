<template>
  <v-dialog
    :value="value"
    scrollable
    eager
    :fullscreen="isXs"
    max-width="600px"
    @click:outside="closeDialog"
    @keydown.esc="closeDialog"
  >
    <v-card>
      <v-card-title class="shadow-nav justify-center">
        <div class="text-subtitle1">{{ isEdit ? 'Ubah' : 'Tambah' }} Publikasi</div>
        <YBtn icon color="black" class="absolute-right ma-2" @click="closeDialog">
          <v-icon>$CloseLightIcon</v-icon>
        </YBtn>
      </v-card-title>
      <v-card-text>
        <MessageInfo
          :messages.sync="errorMessage"
          class="mb-4"
          card-class="sred20"
          text-class="sblack--text"
          icon-color="sred60"
        />

        <v-form ref="form" v-model="isValid" lazy-validation>
          <YInput
            id="publication-name"
            v-model="form.name"
            placeholder="Masukan Nama Publikasi"
            label="Nama Publikasi"
            class="mb-4"
            :rules="$helpers.formRules('required-general-name')"
          />

          <YInput
            id="input-journal"
            v-model="form.journal"
            placeholder="Masukan Nama Jurnal"
            label="Jurnal"
            class="mt-4"
            :rules="$helpers.formRules('required')"
          />

          <div class="mt-4 mb-1 text-truncate">
            <label for="input-abstraction" class="text-body2 sblack60--text"> Abstrak </label>
          </div>
          <v-textarea
            id="input-abstraction"
            v-model="form.abstract"
            placeholder="Masukan Abstrak"
            :rows="isXs ? 2 : 1"
            auto-grow
            filled
            outlined
            :rules="$helpers.formRules('required')"
            hide-details="auto"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <YBtn large class="flex-grow-1" :disabled="!isValid" :loading="isSubmitLoading" @click="submit"> Simpan </YBtn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [breakpointMixin, accountScholarMixins],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    editPublication: {
      type: [Object, null],
      default: null
    }
  },

  data() {
    const form = {
      id: null,
      name: null,
      abstract: null,
      journal: null,
      scholarId: null
    }

    return {
      form,
      isValid: false,
      isSubmitLoading: false,
      errorMessage: {}
    }
  },

  watch: {
    editPublication(editPublication) {
      if (editPublication && this.$helpers.isObject(editPublication)) {
        this.fillFormWithEditPublication(editPublication)
      } else {
        this.clearForm()
      }
    }
  },

  mounted() {
    this.form.scholarId = this.scholar.id
    // console.log('this.form: ', this.form)
  },

  methods: {
    closeDialog() {
      this.$emit('input', false)
      this.$emit('close', true)
    },

    clearForm() {
      this.form = {
        ...this.form,
        id: null,
        name: null,
        abstract: null,
        journal: null
      }

      this.$refs.form.resetValidation()
    },

    fillFormWithEditPublication(publication) {
      this.form.id = publication.id
      this.form.name = publication.name
      this.form.abstract = publication.abstract
      this.form.journal = publication.journal
    },

    async submit() {
      if (this.$refs.form.validate()) {
        this.isSubmitLoading = true
        this.errorMessage = {}
        console.log('this.form: ', this.form)
        try {
          const a = this.isEdit
            ? await this.$repo.scholar.updatePublication(this.form.id, this.form)
            : await this.$repo.scholar.createPublication(this.form)
          const res = a.data
          if (res && res.status) {
            this.$YAlert.show({ content: res.messages, timeout: '3000' })
            this.closeDialog()
            this.clearForm()
            this.$emit('added', true)
          } else {
            this.errorMessage = this.$helpers.keysToCamel(res.messages)
          }
        } catch (e) {
          // console.log('e: ', e)
          const res = e.response.data
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        } finally {
          this.isSubmitLoading = false
        }
      }
    }
  }
}
</script>

<style></style>
