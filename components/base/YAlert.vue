<template>
  <v-snackbar v-model="show" :color="color" centered :timeout="timeout">
    {{ message }}
    <template v-slot:action>
      <v-btn plain text class="font-weight-regular pl-2 pr-0 border-left" @click="onOk">{{ actionText }}</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: '',
      timeout: -1,
      actionText: 'OK',
      onOk: () => {
        this.show = false
      }
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'alert/showMessage') {
        this.message = state.alert.content
        this.color = state.alert.color
        this.timeout = state.alert.timeout
        this.actionText = state.alert.actionText
        if (state.alert.onOk) {
          this.onOk = state.alert.onOk
        }
        this.show = true
      }

      if (mutation.type === 'alert/closeAll') {
        this.show = false
      }
    })
  },

  methods: {
    refresh() {
      window.location.reload(false)
    }
  }
}
</script>

<style scoped>
::v-deep .v-snack__content {
  padding-right: 0;
}
.border-left {
  margin-top: -25px;
  margin-bottom: -25px;
  border-radius: 0;
  border-left: 1px solid #847f82;
  margin-left: 16px;
  padding-left: 8px;
  font-size: 12px !important;
}
::v-deep .v-btn:not(.v-btn--round).v-size--default {
  height: 35px;
  min-width: 32px;
}
::v-deep .v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) .v-btn__content {
  opacity: 1;
}
</style>
