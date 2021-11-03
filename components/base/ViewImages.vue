<template>
  <v-dialog v-model="isActive" transition="dialog-transition" overlay-opacity="0.8">
    <v-container class="px-0 px-sm-4">
      <v-row class="mx-0 mx-sm-n2" dense justify="space-between">
        <v-col cols="12">
          <div class="d-flex">
            <div class="flex-grow-1" @click="$emit('update:active', false)" />
            <div class="py-1 px-2 white--text rounded-xl border-white">({{ index + 1 }}/{{ images.length }})</div>
            <div class="flex-grow-1" @click="$emit('update:active', false)" />
          </div>
        </v-col>
        <v-col cols="12" @click="$emit('update:active', false)"></v-col>
        <v-col v-if="!$vuetify.breakpoint.xs" cols="1" lg="2" class="d-flex flex-column">
          <div class="flex-grow-1" @click="$emit('update:active', false)" />
          <div>
            <v-btn small fab class="border-white" color="rgba(0, 0, 0, 0)" dark :disabled="index < 1" @click="before">
              <v-icon>$prev</v-icon>
            </v-btn>
          </div>
          <div class="flex-grow-1" @click="$emit('update:active', false)" />
        </v-col>
        <v-col cols="12" sm="10" lg="8" class="px-0 px-sm-2">
          <v-img
            :key="rerenderKey"
            :src="images[index]"
            alt="image"
            :transition="transition"
            :class="$vuetify.breakpoint.smAndUp ? 'rounded-lg' : 'rounded-0'"
          >
            <div v-if="$vuetify.breakpoint.xs" class="d-flex justify-space-between pa-2" style="height: 100%">
              <div class="d-flex flex-column justify-center">
                <div>
                  <v-btn
                    small
                    fab
                    class="border-white"
                    color="rgba(19, 21, 21, 0.5)"
                    dark
                    :disabled="index < 1"
                    @click="before"
                  >
                    <v-icon>$prev</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="d-flex flex-column justify-center">
                <div>
                  <v-btn
                    small
                    fab
                    class="border-white"
                    color="rgba(19, 21, 21, 0.5)"
                    dark
                    :disabled="index >= images.length - 1"
                    @click="next"
                  >
                    <v-icon>$next</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-img>
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.xs" cols="1" lg="2" class="d-flex flex-column">
          <div class="flex-grow-1" @click="$emit('update:active', false)" />
          <div class="ml-auto">
            <v-btn
              small
              fab
              class="border-white"
              color="rgba(0, 0, 0, 0)"
              dark
              :disabled="index >= images.length - 1"
              @click="next"
            >
              <v-icon large>$next</v-icon>
            </v-btn>
          </div>
          <div class="flex-grow-1" @click="$emit('update:active', false)" />
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: 'ViewImages',
  props: {
    active: {
      required: true,
      type: Boolean
    },
    images: {
      required: true,
      type: Array
    },
    image: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      isActive: this.active,
      index: 0,
      rerenderKey: 0,
      transition: 'slide-x-transition'
    }
  },

  watch: {
    isActive(newVal) {
      this.$emit('update:active', newVal)
    },
    active(newVal) {
      this.isActive = newVal
    },
    image(newVal) {
      this.index = this.images.indexOf(newVal)
    }
  },

  mounted() {
    this.index = this.images.indexOf(this.image)
  },

  methods: {
    before() {
      this.transition = 'slide-x-transition'
      this.rerenderKey += 1
      this.index -= 1
    },
    next() {
      this.transition = 'slide-x-reverse-transition'
      this.rerenderKey += 1
      this.index += 1
    }
  }
}
</script>

<style scoped>
::v-deep .v-dialog {
  box-shadow: none;
}
@media (max-width: 600px) {
  ::v-deep .v-dialog {
    margin: 0;
  }
}

::v-deep .slide-x-transition-enter-active,
::v-deep .slide-x-transition-leave,
::v-deep .slide-x-transition-leave-to {
  transition: all 0.3s ease !important;
}

::v-deep .slide-x-reverse-transition-enter-active,
::v-deep .slide-x-reverse-transition-leave,
::v-deep .slide-x-reverse-transition-leave-to {
  transition: all 0.3s ease !important;
}
</style>
