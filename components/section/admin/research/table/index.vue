<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="publications"
      :search="search"
      :loading="loading"
      loading-text="Mohon tunggu..."
      :options="options"
      :server-items-length="totalPublications"
      class="elevation-1"
      @update:page="(page) => fetchPublications({ ...options, search, page })"
      @update:items-per-page="(itemsPerPage) => fetchPublications({ ...options, search, itemsPerPage })"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <h3>Publikasi</h3>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            label="Cari publikasi"
            append-icon="mdi-magnify"
            class="mx-4"
            single-line
            hide-details="auto"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="showDialog"> Publikasi Baru </v-btn>
          <v-dialog v-model="dialog" max-width="650px" eager>
            <v-card>
              <v-card-text class="text--primary">
                <h3 class="mb-4">{{ formTitle }}</h3>

                <MessageInfo
                  :messages.sync="errorMessage"
                  class="mb-4"
                  card-class="sred20"
                  text-class="sblack--text"
                  icon-color="sred60"
                />

                <v-form ref="form" v-model="isValid" lazy-validation @submit.prevent="save">
                  <v-container>
                    <v-row dense>
                      <v-col cols="12">
                        <YInput
                          id="name"
                          v-model="editedItem.name"
                          placeholder="Masukan Judul Publikasi"
                          label="Judul Publikasi"
                          :rules="$helpers.formRules('required')"
                        />
                      </v-col>

                      <v-col cols="12">
                        <div class="mb-1 text-truncate">
                          <label for="input-abstract" class="text-body2 sblack60--text"> Abstraksi </label>
                        </div>
                        <v-textarea
                          id="input-abstract"
                          v-model="editedItem.abstract"
                          placeholder="Masukan Abstraksi"
                          :rows="isXs ? 2 : 1"
                          auto-grow
                          filled
                          outlined
                          hide-details="auto"
                        ></v-textarea>
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
                                v-model="formPublishDateFormatted"
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
                            v-model="editedItem.publishDate"
                            :active-picker.sync="activePicker"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="savePublishDate"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <YInput
                          id="language"
                          v-model="editedItem.language"
                          placeholder="Masukan Bahasa"
                          label="Bahasa"
                        />
                      </v-col>

                      <v-col cols="6" sm="3">
                        <YInput
                          id="totalPages"
                          v-model="editedItem.totalPages"
                          placeholder="Masukan Total Halaman"
                          label="Total Halaman"
                          type="number"
                        />
                      </v-col>

                      <v-col cols="6" sm="3">
                        <YInput
                          id="isbn"
                          v-model="editedItem.ISBN"
                          placeholder="Masukan ISBN"
                          label="ISBN"
                          type="number"
                        />
                      </v-col>

                      <v-col cols="12">
                        <YInput
                          id="journal"
                          v-model="editedItem.journal"
                          placeholder="Masukan Nama Jurnal"
                          label="Nama Jurnal"
                        />
                      </v-col>

                      <v-col cols="12">
                        <YInput
                          id="publisher"
                          v-model="editedItem.publisher"
                          placeholder="Masukan Nama Penerbit"
                          label="Nama Penerbit"
                        />
                      </v-col>

                      <v-col cols="12">
                        <YInput
                          id="publicationEvent"
                          v-model="editedItem.publicationEvent"
                          placeholder="Masukan Nama Acara publikasi"
                          label="Nama Acara publikasi"
                        />
                      </v-col>

                      <v-col cols="12">
                        <YInput
                          id="conference"
                          v-model="editedItem.conference"
                          placeholder="Masukan Nama Konferensi"
                          label="Nama Konferensi"
                        />
                      </v-col>

                      <v-col cols="12" sm="6">
                        <div class="mb-1 text-truncate">
                          <label for="input-scholar-id" class="text-body2 sblack60--text"> Pemilik Publikasi </label>
                        </div>
                        <v-autocomplete
                          v-model="editedItem.scholarId"
                          :items="scholars"
                          item-value="id"
                          item-text="name"
                          filled
                          outlined
                          placeholder="Masukan Pemilik"
                          hide-details="auto"
                        >
                          <template v-slot:item="data">
                            <template v-if="!$helpers.isObject(data.item)">
                              <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                              <v-list-item-content>
                                <v-list-item-title class="text--primary">{{ data.item.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ data.item.email }}</v-list-item-subtitle>
                              </v-list-item-content>
                            </template>
                          </template>
                        </v-autocomplete>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-menu
                          ref="menuCreatedDate"
                          v-model="metadataForm.menuCreatedDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <div>
                              <div class="mb-1">
                                <label for="created-date" class="text-body2 sblack60--text"> Tanggal Dibuat </label>
                              </div>
                              <v-text-field
                                id="created-date"
                                v-model="formDateFormatted"
                                placeholder="Tanggal Dibuat"
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
                            v-model="editedItem.createdAt"
                            :active-picker.sync="activePicker"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="saveCreatedDate"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="close"> Batalkan </v-btn>
                <v-btn color="primary" @click="save"> Simpan </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="">Apakah kamu yakin untuk menghapus Publikasi ini?</v-card-title>
              <MessageInfo
                :messages.sync="errorMessage"
                class="mb-4"
                card-class="sred20"
                text-class="sblack--text"
                icon-color="sred60"
              />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="closeDelete">Batalkan</v-btn>
                <v-btn color="primary" @click="deleteItemConfirm">Hapus</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.abstract`]="{ item }">
        <div class="ellipsis-6-lines">{{ item.abstract }}</div>
      </template>

      <template v-slot:[`item.publishDate`]="{ item }">
        {{ item.publishDate ? $moment(item.publishDate).format('YYYY MMM DD') : '-' }}
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        {{ $moment(item.createdAt).format('DD MMM YYYY HH:mm') }}
      </template>

      <template v-slot:[`item.updatedAt`]="{ item }">
        {{ $moment(item.updatedAt).format('DD MMM YYYY HH:mm') }}
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <div>Data tidak ditemukan.</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'

export default {
  mixins: [breakpointMixin],
  data() {
    return {
      search: null,
      loading: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'id',
          sortable: false,
          value: 'id'
        },
        { text: 'Nama', value: 'name' },
        { text: 'Abstrak', value: 'abstract' },
        { text: 'Tanggal', value: 'publishDate' },
        { text: 'Bahasa', value: 'language' },
        { text: 'Total Halaman', value: 'totalPages' },
        { text: 'ISBN', value: 'ISBN' },
        { text: 'Jurnal', value: 'journal' },
        { text: 'Penerbit', value: 'publisher' },
        { text: 'Nomor', value: 'number' },
        { text: 'Acara publikasi', value: 'publicationEvent' },
        { text: 'Konferensi', value: 'conference' },
        { text: 'ID Scholar', value: 'scholarId' },
        { text: 'Tanggal Dibuat', value: 'createdAt' },
        { text: 'Tanggal Diubah', value: 'updatedAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      publications: [],
      totalPublications: 0,
      options: {
        page: 1,
        itemsPerPage: 10
      },
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        abstract: null,
        publishDate: null,
        language: null,
        totalPages: null,
        ISBN: null,
        journal: null,
        publisher: null,
        number: null,
        publicationEvent: null,
        conference: null,
        createdAt: null,
        updatedAt: null
      },
      defaultItem: {
        id: null,
        name: '',
        abstract: null,
        publishDate: null,
        language: null,
        totalPages: null,
        ISBN: null,
        journal: null,
        publisher: null,
        number: null,
        publicationEvent: null,
        conference: null,
        createdAt: null,
        updatedAt: null
      },
      metadataForm: {
        menuPublishDate: false,
        menuCreatedDate: false
      },
      activePicker: null,
      isValid: false,
      errorMessage: {},
      scholars: []
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Tambah Publikasi' : 'Ubah Publikasi'
    },

    formDateFormatted() {
      return this.editedItem.createdAt ? this.$moment(this.editedItem.createdAt).format('DD MMMM YYYY') : ''
    },

    formPublishDateFormatted() {
      return this.editedItem.publishDate ? this.$moment(this.editedItem.publishDate).format('DD MMMM YYYY') : ''
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },

    dialogDelete(val) {
      val || this.closeDelete()
    },

    'metadataForm.menuCreatedDate'(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },

    'metadataForm.menuPublishDate'(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },

    search(newVal) {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.fetchPublications({ ...this.options, search: newVal, page: 1 })
      }, 1000)
    }
  },

  created() {
    this.fetchPublications({ ...this.options, search: this.search })
    this.fetchScholars()
  },

  methods: {
    async fetchScholars() {
      try {
        const a = await this.$repo.scholar.getScholars()
        const res = a.data
        if (res && res.status) {
          this.scholars = res.results
        }
      } catch (e) {}
    },

    async fetchPublications(options) {
      try {
        this.loading = true
        const a = await this.$repo.publication.getPublications(options)
        const res = a.data
        if (res && res.status) {
          this.publications = res.results
          this.totalPublications = res.count
          this.options = {
            page: res.page,
            itemsPerPage: res.itemsPerPage
          }
          return res
        } else {
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        const res = e.response.data
        this.errorMessage = this.$helpers.keysToCamel(res.messages)
      } finally {
        this.loading = false
      }
    },

    saveCreatedDate(date) {
      this.$refs.menuCreatedDate.save(date)
    },

    savePublishDate(date) {
      this.$refs.menuPublishDate.save(date)
    },

    editItem(item) {
      this.editedIndex = this.publications.indexOf(item)

      this.editedItem = Object.assign({}, item)
      if (this.editedItem.createdAt) {
        this.editedItem.createdAt = this.$moment(this.editedItem.createdAt).format('YYYY-MM-DD')
      }

      if (this.editedItem.publishDate) {
        this.editedItem.publishDate = this.$moment(this.editedItem.publishDate).format('YYYY-MM-DD')
      }

      this.showDialog()
    },

    showDialog() {
      this.$refs.form.resetValidation()
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.publications.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deletePublication(this.editedItem)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      this.postPublication(this.editedItem)
    },

    async postPublication(editedItem) {
      const form = {
        ...editedItem
      }

      if (form.keywords != null) {
        form.keywords = form.keywords.map((k) => {
          if (k?.id) return k.id
          else return k
        })
        form.keywords = form.keywords.join(',')
      }

      if (this.$refs.form.validate()) {
        this.loading = true
        this.errorMessage = {}
        try {
          const a =
            this.editedIndex > -1
              ? await this.$repo.publication.update(form.id, form)
              : await this.$repo.publication.create(form)
          const res = a.data
          if (res && res.status) {
            this.$YAlert.show({ content: res.messages, timeout: '2000' })
            this.$refs.form.resetValidation()
            this.fetchPublications({ ...this.options, search: this.search })
            this.close()
            return res
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
    },

    async deletePublication(form) {
      this.errorMessage = {}
      this.loading = true
      try {
        const a = await this.$repo.publication.delete(form.id, form)
        const res = a.data
        if (res && res.status) {
          this.$YAlert.show({ content: res.messages, timeout: '2000' })
          this.fetchPublications({ ...this.options, search: this.search })
          this.closeDelete()
          return res
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
</script>

<style></style>
