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
        <v-form ref="form" v-model="isValid" lazy-validation>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <YInput
                  id="publication-name"
                  v-model="form.name"
                  placeholder="Masukan Judul Publikasi"
                  label="Judul Publikasi"
                  :rules="$helpers.formRules('required')"
                />
              </v-col>

              <v-col cols="12">
                <v-menu
                  ref="menuPublishDate"
                  v-model="metadataForm.menuPublishDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <div>
                      <div class="mb-1">
                        <label for="publish-date" class="text-body2 sblack60--text"> Tanggal Publikasi </label>
                      </div>
                      <v-text-field
                        id="publish-date"
                        v-model="formDateFormatted"
                        placeholder="Tanggal Publikasi"
                        filled
                        outlined
                        readonly
                        v-bind="attrs"
                        hide-details="auto"
                        append-icon="$CalendarBoldIcon"
                        :rules="$helpers.formRules('required')"
                        v-on="on"
                      ></v-text-field>
                    </div>
                  </template>
                  <v-date-picker
                    v-model="form.publishDate"
                    :active-picker.sync="activePicker"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="savePublishDate"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="mb-1 text-truncate">
                  <label for="publication-language" class="text-body2 sblack60--text"> Bahasa </label>
                </div>

                <v-select
                  id="publication-language"
                  v-model="form.language"
                  :items="['English', 'Indonesia']"
                  placeholder="Masukan Bahasa"
                  filled
                  outlined
                  hide-details
                  class="px-0"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <YInput
                  id="publication-total-pages"
                  v-model="form.totalPages"
                  placeholder="Masukan Total Halaman"
                  label="Total Halaman"
                  type="number"
                />
              </v-col>

              <v-col cols="12">
                <YInput id="input-issn" v-model="form.ISSN" placeholder="Masukan ISSN" label="ISSN" />
              </v-col>

              <v-col cols="12">
                <div class="text-truncate">
                  <label for="input-publication-type" class="text-body2 sblack60--text"> Tipe Publikasi </label>
                </div>

                <v-radio-group
                  id="input-publication-type"
                  v-model="publicationType"
                  row
                  hide-details="auto"
                  class="mt-1"
                >
                  <v-radio label="Jurnal" value="journal"></v-radio>
                  <v-radio label="Konferensi" value="conference"></v-radio>
                </v-radio-group>
              </v-col>

              <template v-if="publicationType == 'journal'">
                <v-col cols="12">
                  <YInput
                    id="input-journal"
                    v-model="form.journal"
                    placeholder="Masukan Nama Jurnal"
                    label="Nama Jurnal"
                  />
                </v-col>

                <v-col cols="12">
                  <YInput
                    id="input-journal-edition"
                    v-model="form.journalEdition"
                    placeholder="Masukan Edisi Jurnal"
                    label="Edisi Jurnal"
                  />
                </v-col>
              </template>

              <v-col v-if="publicationType == 'conference'" cols="12">
                <YInput
                  id="conference"
                  v-model="form.conference"
                  placeholder="Masukan Nama Konferensi"
                  label="Nama Konferensi"
                />
              </v-col>

              <v-col cols="12">
                <div class="mb-1 text-truncate">
                  <label for="input-abstraction" class="text-body2 sblack60--text"> Abstrak </label>
                </div>
                <v-textarea
                  id="input-abstraction"
                  v-model="form.abstract"
                  placeholder="Masukan Abstrak"
                  auto-grow
                  filled
                  outlined
                  :rules="$helpers.formRules('required')"
                  hide-details="auto"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <div class="mb-1 text-truncate">
                  <label for="input-co-author" class="text-body2 sblack60--text"> Penulis Lainnya </label>
                </div>
                <v-combobox
                  id="input-co-author"
                  v-model="formCoAuthor"
                  :items="scholars"
                  :loading="isSearchingScholarLoading"
                  :search-input.sync="searchCoAuthor"
                  multiple
                  hide-selected
                  chips
                  item-text="fullName"
                  item-value="fullName"
                  placeholder="Masukan Penulis Lainnya"
                  no-data-text="Tidak ada penulis lainnya"
                  filled
                  outlined
                  hide-details="auto"
                  return-object
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Belum ada penulis "<strong>{{ searchCoAuthor }}</strong
                          >". Tekan <kbd>enter</kbd> untuk menambahkan.
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>

                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      @click="data.select"
                      @click:close="remove(data.item)"
                    >
                      <v-avatar v-if="data.item.image" left>
                        <v-img :src="data.item.image"></v-img>
                      </v-avatar>
                      {{ data.item.fullName || data.item }}
                    </v-chip>
                  </template>

                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <img :src="data.item.image" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ data.item.fullName }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12">
                <div class="mb-1 text-truncate">
                  <label for="input-keyword" class="text-body2 sblack60--text"> Kata Kunci (keyword) </label>
                </div>
                <v-combobox
                  id="input-keyword"
                  v-model="formKeywords"
                  :items="allKeywords"
                  :loading="isSearchingKeywordLoading"
                  :search-input.sync="searchKeyword"
                  multiple
                  hide-selected
                  small-chips
                  item-text="name"
                  item-value="id"
                  placeholder="Masukan Kata Kunci (keyword)"
                  no-data-text="Tidak ada kata kunci lainnya"
                  filled
                  outlined
                  hide-details="auto"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Tidak ada hasil yang cocok untuk "<strong>{{ searchKeyword }}</strong
                          >". Tekan <kbd>enter</kbd> untuk membuat yang baru
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>

              <v-col cols="12">
                <YInput
                  id="input-link"
                  v-model="form.link"
                  placeholder="Masukan Pranala Publikasi"
                  label="Pranala"
                  :rules="$helpers.formRules('required')"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="flex-column align-stretch">
        <MessageInfo
          :messages.sync="errorMessage"
          card-class="sred20"
          text-class="sblack--text"
          icon-color="sred60"
          class="mb-4"
        />
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
      language: null,
      totalPages: null,
      ISSN: null,
      journal: null,
      conference: null,
      scholarId: null,
      coAuthor: null,
      keywords: null,
      link: null,
      publishDate: null,
      journalEdition: null
    }

    return {
      form,
      metadataForm: {
        menuPublishDate: false
      },
      activePicker: null,
      formCoAuthor: null,
      formKeywords: null,
      isValid: false,
      isSubmitLoading: false,
      errorMessage: {},
      allScholars: [],
      allKeywords: [],
      itemsPerPage: -1,
      isSearchingScholarLoading: false,
      isSearchingKeywordLoading: false,
      searchKeyword: null,
      publicationType: 'journal',
      searchCoAuthor: null
    }
  },

  computed: {
    scholars() {
      const filteredScholars = this.allScholars.filter((e) => e.id !== this.scholar.id)
      const formattedScholars = filteredScholars.map((e) => {
        return {
          ...e,
          fullName: this.$helpers.fullName(e.name, e.frontTitle, e.backTitle)
        }
      })

      return formattedScholars
    },
    formDateFormatted() {
      return this.form.publishDate ? this.$moment(this.form.publishDate).format('DD MMMM YYYY') : ''
    }
  },

  watch: {
    editPublication(editPublication) {
      this.errorMessage = {}
      if (editPublication && this.$helpers.isObject(editPublication)) {
        this.fillFormWithEditPublication(editPublication)
      } else {
        this.clearForm()
      }
    },

    'metadataForm.menuPublishDate'(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },

    formCoAuthor(val) {
      console.log('formCoAuthor: ', val)
    }
  },

  created() {
    this.fetchScholars()
    this.fetchKeywords()
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
        id: null,
        name: null,
        abstract: null,
        language: null,
        totalPages: null,
        ISSN: null,
        journal: null,
        conference: null,
        scholarId: this.scholar.id,
        coAuthor: null,
        keywords: null,
        link: null,
        publishDate: null,
        journalEdition: null
      }
      this.formCoAuthor = null
      this.formKeywords = null
      this.publicationType = 'journal'

      this.$refs.form.resetValidation()
    },

    fillFormWithEditPublication(publication) {
      this.form = {
        ...publication
      }
      if (publication.coAuthor) {
        this.formCoAuthor = []
        const coAuthor = publication.coAuthor.split(',,')
        coAuthor.forEach((author, i) => {
          const find = this.scholars.find((e) => e.fullName === author)
          if (find) this.formCoAuthor[i] = find
          else this.formCoAuthor[i] = author
        })
      }
      if (publication.keywords?.length) this.formKeywords = publication.keywords
      if (publication.publishDate) {
        this.form.publishDate = this.$moment(publication.publishDate).format('YYYY-MM-DD')
      }

      if (publication.conference) {
        this.publicationType = 'conference'
      } else {
        this.publicationType = 'journal'
      }
    },

    savePublishDate(date) {
      this.$refs.menuPublishDate.save(date)
    },

    async fetchScholars() {
      try {
        this.isSearchingScholarLoading = true
        const a = await this.$repo.scholar.getScholars({
          itemsPerPage: this.itemsPerPage
        })
        const res = a.data
        if (res && res.status) {
          this.allScholars = res.results
        }
      } catch (e) {
      } finally {
        this.isSearchingScholarLoading = false
      }
    },

    async fetchKeywords() {
      try {
        this.isSearchingKeywordLoading = true
        const a = await this.$repo.publication.getKeywords({
          itemsPerPage: this.itemsPerPage
        })
        const res = a.data
        if (res && res.status) {
          this.allKeywords = res.results
        }
      } catch (e) {
      } finally {
        this.isSearchingKeywordLoading = false
      }
    },

    remove(item) {
      const index = this.formCoAuthor.indexOf(item)
      if (index >= 0) this.formCoAuthor.splice(index, 1)
    },

    async submit() {
      if (this.$refs.form.validate()) {
        this.isSubmitLoading = true
        this.errorMessage = {}
        // console.log('this.form: ', this.form)
        try {
          if (this.formCoAuthor) {
            this.form.coAuthor = this.formCoAuthor.map((author) => {
              if (author?.fullName) return author.fullName
              else return author
            })
            this.form.coAuthor = this.form.coAuthor.join(',,')
          }
          if (this.formKeywords != null) {
            this.form.keywords = this.formKeywords.map((k) => {
              if (k?.id) return k.id
              else return k
            })
            this.form.keywords = this.form.keywords.join(',')
          }

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
