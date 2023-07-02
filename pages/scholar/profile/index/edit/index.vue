<template>
  <v-dialog
    :value="value"
    scrollable
    :fullscreen="isXs"
    max-width="600px"
    @click:outside="closeDialog"
    @keydown.esc="closeDialog"
  >
    <v-card>
      <v-card-title class="shadow-nav justify-center">
        <div class="text-subtitle1">Ubah Profil</div>
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

        <v-form ref="form" v-model="metadataForm.isValid" lazy-validation>
          <YInputFile v-model="form.photo" accept="image/png, image/jpeg, image/jpg" class="mb-6">
            <template v-slot:input-field>
              <v-badge avatar bordered overlap offset-x="30" offset-y="30" class="cursor-pointer">
                <template v-slot:badge>
                  <div class="d-flex flex-column justify-center align-center" style="height: 100%">
                    <v-icon size="20px" color="white">$EditBoldIcon</v-icon>
                  </div>
                </template>

                <YImg
                  :width="184"
                  :height="184"
                  :max-width="184"
                  :max-height="184"
                  class="rounded-4"
                  :src="form.image"
                />
              </v-badge>
            </template>

            <template v-slot:file-field>
              <v-badge avatar bordered overlap offset-x="30" offset-y="30" class="cursor-pointer">
                <template v-slot:badge>
                  <div class="d-flex flex-column justify-center align-center" style="height: 100%">
                    <v-icon size="20px" color="white">$EditBoldIcon</v-icon>
                  </div>
                </template>

                <YImg
                  :width="184"
                  :height="184"
                  :max-width="184"
                  :max-height="184"
                  class="rounded-4"
                  :src="previewFile(form.image)"
                />
              </v-badge>
            </template>
          </YInputFile>

          <YInput
            id="name"
            v-model="form.name"
            placeholder="Masukan Nama lengkap"
            label="Nama Lengkap"
            class="mb-4"
            :rules="$helpers.formRules('required')"
          />

          <v-menu
            ref="menuBirthDate"
            v-model="metadataForm.menuBirthDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            class="mb-4"
          >
            <template v-slot:activator="{ on, attrs }">
              <div>
                <div class="mb-1">
                  <label for="birth-date" class="text-body2 sblack60--text"> Tanggal Lahir </label>
                </div>
                <v-text-field
                  id="birth-date"
                  v-model="formDateFormatted"
                  placeholder="Tanggal Lahir"
                  filled
                  outlined
                  readonly
                  v-bind="attrs"
                  hide-details="auto"
                  class="mb-4"
                  append-icon="$CalendarBoldIcon"
                  v-on="on"
                ></v-text-field>
              </div>
            </template>
            <v-date-picker
              v-model="form.birthDate"
              :active-picker.sync="activePicker"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="saveBirthDate"
            ></v-date-picker>
          </v-menu>

          <div class="text-truncate">
            <label for="gender" class="text-body2 sblack60--text">Jenis Kelamin</label>
          </div>
          <v-radio-group v-model="form.gender" class="mt-0 mb-4" row hide-details="auto">
            <v-radio
              v-for="(gender, i) in genderSelection"
              :key="'gender' + i"
              :label="gender.label"
              :value="gender.value"
            ></v-radio>
          </v-radio-group>

          <div class="mb-1 text-truncate">
            <label for="input-department-id" class="text-body2 sblack60--text"> Departemen </label>
          </div>
          <v-autocomplete
            id="input-department-id"
            v-model="form.departmentId"
            placeholder="Masukan Departemen"
            :items="formattedDepartements"
            filled
            outlined
            hide-details="auto"
            class="mb-4"
          ></v-autocomplete>

          <div class="mb-1 text-truncate">
            <label for="input-street-address" class="text-body2 sblack60--text"> Detail Alamat </label>
          </div>
          <v-textarea
            id="input-street-address"
            v-model="form.address"
            placeholder="Masukan Jalan, No Rumah/Gedung, RT/RW, Desa/Kelurahan"
            :rows="isXs ? 2 : 1"
            auto-grow
            filled
            outlined
            hide-details="auto"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <YBtn
          large
          class="flex-grow-1"
          :disabled="!metadataForm.isValid"
          :loading="isSubmitLoading"
          @click="submit(scholar.id, form)"
        >
          Simpan
        </YBtn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [breakpointMixin, accountScholarMixins],

  data() {
    return {
      value: true,
      form: {
        image: null,
        photo: null,
        name: null,
        birthDate: null,
        gender: null,
        departmentId: null
      },
      metadataForm: {
        menuBirthDate: false,
        isValid: false
      },
      genderSelection: [
        { value: 'MALE', label: 'Laki - Laki' },
        { value: 'FEMALE', label: 'Perempuan' }
      ],
      activePicker: null,
      isSubmitLoading: false,
      errorMessage: {},
      departments: []
    }
  },

  computed: {
    formDateFormatted() {
      return this.form.birthDate ? this.$moment(this.form.birthDate).format('DD MMMM YYYY') : ''
    },

    formattedDepartements() {
      return this.departments?.map((d) => {
        return {
          value: d.id,
          text: `${d.name}, ${d.faculty?.name}`
        }
      })
    }
  },

  watch: {
    value(newVal) {
      if (newVal) {
        this.setForm()
      }
    },

    'metadataForm.menuBirthDate'(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },

    'form.photo'(val) {
      if (val) {
        this.uploadImage(val)
      }
    }
  },

  created() {
    this.fetchDepartments()
  },

  mounted() {
    this.setForm()
  },

  methods: {
    closeDialog() {
      this.$router.push('/scholar/profile')
    },

    async uploadImage(val) {
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      this.isSubmitLoading = true
      try {
        const data = await readData(val)

        /* upload the converted data */
        const instance = await this.$cloudinary.upload(data, {
          folder: 'scholar',
          uploadPreset: 'wiov1ewi'
        })

        if (instance.secure_url) {
          this.form.image = instance.secure_url
        }
      } catch (error) {
      } finally {
        this.isSubmitLoading = false
      }
    },

    setForm() {
      this.form.image = this.scholar.image
      this.form.name = this.scholar.name
      if (this.scholar.birthDate) {
        this.form.birthDate = this.$moment(this.scholar.birthDate).format('YYYY-MM-DD')
      }
      this.form.gender = this.scholar.gender
      this.form.address = this.scholar.address
      this.form.departmentId = this.scholar.departmentId
    },

    previewFile(src) {
      if (src instanceof File) {
        return URL.createObjectURL(src)
      } else {
        return src
      }
    },

    saveBirthDate(date) {
      this.$refs.menuBirthDate.save(date)
    },

    async submit(id, form) {
      if (this.$refs.form.validate()) {
        this.isSubmitLoading = true
        this.errorMessage = {}

        try {
          const a = await this.$repo.scholar.updateScholar(id, form)
          const res = a.data
          if (res && res.status) {
            this.$store.commit('scholar/SET_SCHOLAR', res.results)
            this.$YAlert.show({ content: 'Profil berhasil diubah.', timeout: '3000' })
            // this.$store.dispatch('auth/initAuth', this.$route)
            this.closeDialog()
          } else {
            this.errorMessage = this.$helpers.keysToCamel(res.messages)
          }
        } catch (e) {
        } finally {
          this.isSubmitLoading = false
        }
      }
    },

    async fetchDepartments() {
      try {
        const a = await this.$repo.universities.getAllDepartments()
        const res = a.data
        if (res && res.status) {
          this.departments = res.results
        }
      } catch (e) {
      } finally {
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
::v-deep
  .theme--light.v-label
    color var(--v-black-base)
  .v-input--selection-controls__input
    .theme--light.v-icon
      color var(--v-sblack20-base)
</style>
