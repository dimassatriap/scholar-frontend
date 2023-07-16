<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="faculties"
      :search="search"
      :loading="loading"
      loading-text="Mohon tunggu..."
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <h3>Fakultas</h3>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            label="Cari Fakultas"
            append-icon="mdi-magnify"
            class="mx-4"
            single-line
            hide-details="auto"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="showDialog"> Fakultas Baru </v-btn>
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

                      <v-col cols="12" sm="6">
                        <div class="mb-1 text-truncate">
                          <label for="input-university-id" class="text-body2 sblack60--text"> Universitas </label>
                        </div>
                        <v-autocomplete
                          id="input-university-id"
                          v-model="editedItem.universityId"
                          placeholder="Masukan Universitas"
                          :items="universities"
                          item-text="name"
                          item-value="id"
                          filled
                          outlined
                          hide-details="auto"
                          class="mb-4"
                          :rules="$helpers.formRules('required')"
                        ></v-autocomplete>
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
              <v-card-title class="">Apakah anda yakin untuk menghapus Fakultas ini?</v-card-title>
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
      <AdminUniversityFacultyDepartmentTable :faculties="faculties" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    universities: {
      required: true,
      type: Array
    }
  },

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
        { text: 'Universitas', value: 'university.name' },
        { text: 'Tanggal Dibuat', value: 'createdAt' },
        { text: 'Tanggal Diubah', value: 'updatedAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      faculties: [],
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        universityId: null,
        createdAt: null,
        updatedAt: null
      },
      defaultItem: {
        id: null,
        name: '',
        universityId: null,
        createdAt: null,
        updatedAt: null
      },
      isValid: false,
      errorMessage: {}
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Tambah Fakultas' : 'Ubah Fakultas'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },

    dialogDelete(val) {
      val || this.closeDelete()
    },

    universities() {
      this.initialize()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        this.loading = true
        const a = await this.$repo.university.getFaculties()
        const res = a.data
        if (res && res.status) {
          this.faculties = res.results
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
      this.editedIndex = this.faculties.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.showDialog()
    },

    showDialog() {
      this.$refs.form.resetValidation()
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.faculties.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteFaculty(this.editedItem)
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
      this.postFaculty(this.editedItem)
    },

    async postFaculty(form) {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.errorMessage = {}
        try {
          const a =
            this.editedIndex > -1
              ? await this.$repo.university.updateFaculty(form.id, form)
              : await this.$repo.university.createFaculty(form)
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

    async deleteFaculty(form) {
      this.errorMessage = {}
      this.loading = true
      try {
        const a = await this.$repo.university.deleteFaculty(form.id, form)
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
