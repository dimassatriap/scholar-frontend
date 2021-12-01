<template>
  <div>
    <MessageInfo
      :messages.sync="errorMessage"
      class="mb-4"
      card-class="sred20"
      text-class="sblack--text"
      icon-color="sred60"
    />

    <v-data-table :headers="headers" :items="scholars" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <h3>Scholar</h3>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Scholar Baru </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Apakah kamu yakin untuk menghapus Akun ini?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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
export default {
  data() {
    return {
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
      errorMessage: {}
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Tambah Scholar' : 'Ubah Scholar'
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
        const a = await this.$repo.scholar.getScholars()
        const res = a.data
        if (res && res.status) {
          this.scholars = res.results
          return res
        } else {
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        const res = e.response.data
        this.errorMessage = this.$helpers.keysToCamel(res.messages)
      }
    },

    editItem(item) {
      this.editedIndex = this.scholars.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.scholars.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.scholars.splice(this.editedIndex, 1)
      this.closeDelete()
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
      if (this.editedIndex > -1) {
        Object.assign(this.scholars[this.editedIndex], this.editedItem)
      } else {
        this.scholars.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style></style>
