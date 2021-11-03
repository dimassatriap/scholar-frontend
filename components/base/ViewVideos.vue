<template>
  <v-dialog v-model="isActive" transition="dialog-transition" overlay-opacity="0.8">
    <v-container class="px-0 px-sm-4">
      <v-row class="mx-0 mx-sm-n2" justify="center">
        <v-col v-if="videos.length > 1" cols="12">
          <div class="d-flex">
            <div class="flex-grow-1" @click="$emit('update:active', false)" />
            <div class="py-1 px-2 white--text rounded-xl border-white">({{ index + 1 }}/{{ videos.length }})</div>
            <div class="flex-grow-1" @click="$emit('update:active', false)" />
          </div>
        </v-col>
        <v-col cols="2" sm="1" class="d-flex flex-column">
          <div class="flex-grow-1" @click="$emit('update:active', false)" />
          <div>
            <v-btn
              v-show="videos.length > 1"
              :x-small="$vuetify.breakpoint.xs"
              :small="$vuetify.breakpoint.smAndUp"
              fab
              class="border-white"
              color="rgba(0, 0, 0, 0)"
              dark
              :disabled="index < 1"
              @click="before"
            >
              <v-icon>$prev</v-icon>
            </v-btn>
          </div>
          <div class="flex-grow-1" @click="$emit('update:active', false)" />
        </v-col>
        <v-col :cols="videos.length > 1 ? 8 : 12" sm="10" lg="9" xl="10" class="px-0 px-sm-2">
          <div style="position: relative; overflow: hidden; width: 100%; padding-top: 56.25%">
            <iframe
              :key="rerenderKey"
              :class="$vuetify.breakpoint.smAndUp ? 'rounded-lg' : 'rounded-0'"
              :src="videos[index]"
              frameborder="0"
              allowfullscreen="allowfullscreen"
              style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%"
            >
            </iframe>
          </div>
        </v-col>
        <v-col cols="2" sm="1" class="d-flex flex-column">
          <div class="flex-grow-1" @click="$emit('update:active', false)" />
          <div class="ml-auto">
            <v-btn
              v-show="videos.length > 1"
              :x-small="$vuetify.breakpoint.xs"
              :small="$vuetify.breakpoint.smAndUp"
              fab
              class="border-white"
              color="rgba(0, 0, 0, 0)"
              dark
              :disabled="index >= videos.lastIndex"
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
  name: 'ViewVideos',
  props: {
    active: {
      required: true,
      type: Boolean
    },
    videos: {
      required: true,
      type: Array
    },
    video: {
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
    video(newVal) {
      this.index = this.videos.indexOf(newVal)
    }
  },

  mounted() {
    this.index = this.videos.indexOf(this.video)
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
