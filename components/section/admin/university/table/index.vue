<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="universities"
      :search="search"
      :loading="loading"
      loading-text="Mohon tunggu..."
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <h3>Universitas</h3>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            label="Cari Universitas"
            append-icon="mdi-magnify"
            class="mx-4"
            single-line
            hide-details="auto"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="showDialog"> Universitas Baru </v-btn>
          <v-dialog v-model="dialog" max-width="600px" eager>
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
                      <v-col cols="12" sm="6">
                        <YInput
                          id="input-name"
                          v-model="editedItem.name"
                          placeholder="Masukan Nama"
                          label="Nama"
                          :rules="$helpers.formRules('required')"
                        />
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
              <v-card-title class="">Apakah anda yakin untuk menghapus Universitas ini?</v-card-title>
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
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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

    <div class="mt-4">
      <AdminUniversityFacultyTable :universities="universities" />
    </div>
  </div>
</template>

<script>
export default {
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
        { text: 'Tanggal Dibuat', value: 'createdAt' },
        { text: 'Tanggal Diubah', value: 'updatedAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      universities: [],
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        createdAt: null,
        updatedAt: null
      },
      defaultItem: {
        id: null,
        name: '',
        createdAt: null,
        updatedAt: null
      },
      isValid: false,
      errorMessage: {}
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Tambah Universitas' : 'Ubah Universitas'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        this.loading = true
        const a = await this.$repo.university.getUniversities()
        const res = a.data
        if (res && res.status) {
          this.universities = res.results
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

    editItem(item) {
      this.editedIndex = this.universities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.showDialog()
    },

    showDialog() {
      this.$refs.form.resetValidation()
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.universities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteUniversity(this.editedItem)
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
      this.postUniversity(this.editedItem)
    },

    async postUniversity(form) {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.errorMessage = {}
        try {
          const a =
            this.editedIndex > -1
              ? await this.$repo.university.updateUniversity(form.id, form)
              : await this.$repo.university.createUniversity(form)
          const res = a.data
          if (res && res.status) {
            this.$YAlert.show({ content: res.messages, timeout: '2000' })
            this.$refs.form.resetValidation()
            this.initialize()
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

    async deleteUniversity(form) {
      this.errorMessage = {}
      this.loading = true
      try {
        const a = await this.$repo.university.deleteUniversity(form.id, form)
        const res = a.data
        if (res && res.status) {
          this.$YAlert.show({ content: res.messages, timeout: '2000' })
          this.initialize()
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
