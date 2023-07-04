<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="scholars"
      :search="search"
      :loading="loading"
      loading-text="Mohon tunggu..."
      :options="options"
      :server-items-length="totalScholars"
      class="elevation-1"
      @update:page="(page) => fetchScholars({ ...options, search, page })"
      @update:items-per-page="(itemsPerPage) => fetchScholars({ ...options, search, itemsPerPage })"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <h3>Scholars</h3>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            label="Cari scholar"
            append-icon="mdi-magnify"
            class="mx-4"
            single-line
            hide-details="auto"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="showDialog"> Scholar Baru </v-btn>
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
                          placeholder="Masukan Nama lengkap"
                          label="Nama Lengkap"
                          :rules="$helpers.formRules('required')"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <YInput
                          id="input-email"
                          v-model="editedItem.email"
                          placeholder="Masukan Email"
                          label="Email"
                          :rules="$helpers.formRules('email')"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <YInput
                          id="phone"
                          v-model="editedItem.phone"
                          placeholder="Masukan No. Handphone"
                          label="No. Handphone"
                          prepend-inner-text="+62"
                          type="number"
                          :rules="$helpers.formRules('phone')"
                        />
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-menu
                          ref="menuBirthDate"
                          v-model="metadataForm.menuBirthDate"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
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
                                append-icon="$CalendarBoldIcon"
                                :rules="$helpers.formRules('required')"
                                v-on="on"
                              ></v-text-field>
                            </div>
                          </template>
                          <v-date-picker
                            v-model="editedItem.birthDate"
                            :active-picker.sync="activePicker"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="saveBirthDate"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <div class="text-truncate">
                          <label for="gender" class="text-body2 sblack60--text">Jenis Kelamin</label>
                        </div>
                        <v-radio-group v-model="editedItem.gender" class="mt-0" row hide-details="auto">
                          <v-radio
                            v-for="(gender, i) in genderSelection"
                            :key="'gender' + i"
                            :label="gender.label"
                            :value="gender.value"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>

                      <v-col cols="12">
                        <div class="mb-1 text-truncate">
                          <label for="input-street-address" class="text-body2 sblack60--text"> Detail Alamat </label>
                        </div>
                        <v-textarea
                          id="input-street-address"
                          v-model="editedItem.address"
                          placeholder="Masukan Alamat"
                          :rows="isXs ? 2 : 1"
                          auto-grow
                          filled
                          outlined
                          hide-details="auto"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12">
                        <v-autocomplete
                          v-model="editedItem.accountId"
                          :items="accounts"
                          item-value="id"
                          item-text="username"
                          filled
                          outlined
                          placeholder="Pemilik Akun"
                          hide-details="auto"
                        >
                          <template v-slot:item="data">
                            <template v-if="!$helpers.isObject(data.item)">
                              <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                              <v-list-item-content>
                                <v-list-item-title class="text--primary">{{ data.item.username }}</v-list-item-title>
                                <v-list-item-subtitle>{{ data.item.email }}</v-list-item-subtitle>
                              </v-list-item-content>
                            </template>
                          </template>
                        </v-autocomplete>
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
              <v-card-title class="">Apakah kamu yakin untuk menghapus Scholar ini?</v-card-title>
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

      <template v-slot:[`item.gender`]="{ item }">
        {{ item.gender ? $helpers.genderParse(item.gender) : null }}
      </template>

      <template v-slot:[`item.birthDate`]="{ item }">
        {{ item.birthDate ? $moment(item.birthDate).format('DD MMM YYYY') : null }}
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
        { text: 'Email', value: 'email' },
        { text: 'No. Handphone', value: 'phone' },
        { text: 'Address', value: 'address' },
        { text: 'Gender', value: 'gender' },
        { text: 'Tanggal Lahir', value: 'birthDate' },
        { text: 'Id Akun', value: 'accountId' },
        { text: 'Tanggal Dibuat', value: 'createdAt' },
        { text: 'Tanggal Diubah', value: 'updatedAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      scholars: [],
      totalScholars: 0,
      options: {
        page: 1,
        itemsPerPage: 10
      },
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        email: null,
        phone: null,
        address: null,
        gender: null,
        birthDate: null,
        createdAt: null,
        updatedAt: null
      },
      defaultItem: {
        id: null,
        name: '',
        email: null,
        phone: null,
        address: null,
        gender: null,
        birthDate: null,
        createdAt: null,
        updatedAt: null
      },
      metadataForm: {
        menuBirthDate: false
      },
      genderSelection: [
        { value: 'MALE', label: 'Laki - Laki' },
        { value: 'FEMALE', label: 'Perempuan' }
      ],
      activePicker: null,
      isValid: false,
      errorMessage: {},
      accounts: []
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Tambah Scholar' : 'Ubah Scholar'
    },

    formDateFormatted() {
      return this.editedItem.birthDate ? this.$moment(this.editedItem.birthDate).format('DD MMMM YYYY') : ''
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },

    dialogDelete(val) {
      val || this.closeDelete()
    },

    'metadataForm.menuBirthDate'(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },

    search(newVal) {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.fetchScholars({ ...this.options, search: newVal, page: 1 })
      }, 1000)
    }
  },

  created() {
    this.fetchScholars({ ...this.options, search: this.search })
    this.fetchAccounts()
  },

  methods: {
    async fetchAccounts() {
      try {
        const a = await this.$repo.account.getAccounts()
        const res = a.data
        if (res && res.status) {
          this.accounts = res.results
        }
      } catch (e) {}
    },

    async fetchScholars(options) {
      try {
        this.loading = true
        const a = await this.$repo.scholar.getScholars(options)
        const res = a.data
        if (res && res.status) {
          this.scholars = res.results
          this.totalScholars = res.count
          this.options = {
            page: res.page,
            itemsPerPage: res.itemsPerPage
          }
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

    saveBirthDate(date) {
      this.$refs.menuBirthDate.save(date)
    },

    editItem(item) {
      this.editedIndex = this.scholars.indexOf(item)

      this.editedItem = Object.assign({}, item)
      if (this.editedItem.birthDate) {
        this.editedItem.birthDate = this.$moment(this.editedItem.birthDate).format('YYYY-MM-DD')
      }

      if (this.editedItem.phone) {
        this.editedItem.phone = this.$helpers.remove62FromMsisdn(this.editedItem.phone)
      }

      this.showDialog()
    },

    showDialog() {
      this.$refs.form.resetValidation()
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.scholars.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.deleteScholar(this.editedItem)
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
      this.postScholar(this.editedItem)
    },

    async postScholar(editedItem) {
      const form = {
        ...editedItem,
        phone: 62 + this.editedItem.phone
      }

      if (this.$refs.form.validate()) {
        this.loading = true
        this.errorMessage = {}
        try {
          const a =
            this.editedIndex > -1
              ? await this.$repo.scholar.updateScholar(form.id, form)
              : await this.$repo.scholar.create(form)
          const res = a.data
          if (res && res.status) {
            this.$YAlert.show({ content: res.messages, timeout: '2000' })
            this.$refs.form.resetValidation()
            this.fetchScholars({ ...this.options, search: this.search })
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

    async deleteScholar(form) {
      this.errorMessage = {}
      this.loading = true
      try {
        const a = await this.$repo.scholar.delete(form.id, form)
        const res = a.data
        if (res && res.status) {
          this.$YAlert.show({ content: res.messages, timeout: '2000' })
          this.fetchScholars({ ...this.options, search: this.search })
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
