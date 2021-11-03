<template>
  <span>
    <YBtn secondary :small="small" :block="block" min-height="26" @click="copyToClipboard">SALIN</YBtn>
    <span ref="copyText"></span>
  </span>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
  name: 'CopyText',
  props: {
    block: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: true
    },
    text: {
      type: [String, Number],
      required: true
    },
    notif: {
      type: String,
      default: 'Berhasil Tersalin'
    }
  },
  data() {
    return {}
  },
  methods: {
    copyToClipboard() {
      this.$copyText(this.text, this.$refs.copyText).then(
        (e) => {
          this.$YAlert.show({ content: this.notif, timeout: 3000 })
        },
        (e) => {}
      )
    }
  }
}
</script>

<style scoped></style>
