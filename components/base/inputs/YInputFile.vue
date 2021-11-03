<template>
  <div>
    <div v-if="value && $slots['file-field']" class="d-flex flex-column justify-center align-center">
      <div v-ripple class="rounded-circle" @click="onClickInputFile">
        <slot name="file-field"></slot>
      </div>
    </div>
    <v-hover v-if="value && !$slots['file-field']">
      <template v-slot:default="{ hover }">
        <v-img
          v-ripple
          class="rounded-4 border-dash coursor-pointer"
          :aspect-ratio="16 / 9"
          :src="previewFile"
          @click="overlay = !overlay"
        >
          <div>
            <v-fade-transition>
              <v-overlay :absolute="true" :value="hover || overlay" class="cursor-pointer">
                <YBtn outlined color="white" @click="onClickInputFile"> Ubah Gambar </YBtn>
              </v-overlay>
            </v-fade-transition>
          </div>
          <YBtn
            small
            fab
            color="rgba(0, 23, 31, 0.6)"
            class="absolute-right ma-4"
            style="z-index: 50"
            @click="clearInput"
          >
            <v-icon size="16" color="white">$DeleteBoldIcon</v-icon>
          </YBtn>
        </v-img>
      </template>
    </v-hover>
    <v-slide-y-transition :hide-on-leave="true" leave-absolute>
      <!-- for custom input field -->
      <div v-if="!value && $slots['input-field']" class="d-flex flex-column justify-center align-center">
        <div v-ripple class="rounded-circle" @click="onClickInputFile">
          <slot name="input-field"></slot>
        </div>
      </div>
      <!-- reguler input field -->
      <v-img v-if="!value && !$slots['input-field']" v-ripple :aspect-ratio="16 / 9" src="" @click="onClickInputFile">
        <div
          class="d-flex flex column align-center justify-center rounded-4 border-dash sblack5 cursor-pointer"
          style="height: 100%"
        >
          <slot></slot>
        </div>
      </v-img>
    </v-slide-y-transition>
    <input ref="file" type="file" :accept="accept" class="d-none" @change="onFileChanged" />
    <v-dialog v-model="showDialog" max-width="300px" persistent transition="dialog-transition">
      <v-card class="" elevation="0">
        <v-card-text>
          <div class="text-subtitle4 sblack--text">{{ message }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <YBtn @click="showDialog = false">Ok</YBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    accept: {
      type: String,
      default: null
    },
    acceptSize: {
      type: Number,
      default: 5
    }
  },

  data() {
    return {
      overlay: false,
      showDialog: false,
      message: ''
    }
  },

  computed: {
    previewFile() {
      if (this.value instanceof File) {
        return URL.createObjectURL(this.value)
      } else {
        return this.value
      }
    }
  },

  watch: {
    value(newVal) {
      if (!newVal) {
        this.$refs.file.value = null
      }
    }
  },

  methods: {
    clearInput() {
      this.$refs.file.value = null
      this.$emit('input', null)
    },

    onClickInputFile() {
      this.$refs.file.click()
    },

    validationFileType(file) {
      const fileType = file.type
      let bool = false
      const acc = this.accept.split(',')

      acc.forEach((el) => {
        if (el.includes(fileType)) {
          bool = true
        }
      })

      if (!bool) {
        this.showDialog = true
        this.message = 'Jenis file yang diterima hanyalah ' + this.accept
        this.clearInput()
      }
    },

    validationFileSize(file) {
      const fileSize = file.size / 1000 / 1000 // in MB
      const bool = fileSize <= this.acceptSize
      if (!bool) {
        this.showDialog = true
        this.message = 'Ukuran file tidak boleh melebihi ' + this.acceptSize + 'MB'
        this.clearInput()
      }
    },

    onFileChanged(e) {
      const file = e.target.files[0]
      this.$emit('input', file)
      if (file) {
        this.validationFileType(file)
        this.validationFileSize(file)
      }
    }
  }
}
</script>

<style></style>
