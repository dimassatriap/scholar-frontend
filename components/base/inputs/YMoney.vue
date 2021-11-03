<template>
  <vuetify-money
    v-model="money"
    :placeholder="placeholder"
    :options="options"
    :rules="rules"
    :filled="filled"
    :outlined="outlined"
    :properties="properties"
    persistent-hint
    hide-details="auto"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: NaN
    },
    placeholder: {
      type: [String, null],
      default: null
    },
    filled: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {
        return {
          locale: 'pt-BR',
          prefix: 'Rp',
          precision: 0
        }
      }
    },
    properties: {
      type: Object,
      default: () => {
        return {
          filled: true
        }
      }
    }
  },

  data() {
    return {
      money: NaN
    }
  },

  watch: {
    value(value) {
      this.money = parseInt(value)
    },

    money(money) {
      this.$emit('input', parseInt(money))
    }
  },

  mounted() {
    this.money = parseInt(this.value)
  }
}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-text-field fieldset
    border 1px solid $sblack-20 !important
  .v-text-field__prefix
    background-color var(--v-sblack20-base)
  .v-text-field--outlined .v-text-field__prefix
    height 100%
    max-height 100%
    display flex
    justify-content center
    align-items center
    padding 8px
    margin-right 8px
    border-radius 4px 0px 0px 4px
    color #131515 !important

  .v-text-field--filled > .v-input__control > .v-input__slot,
  .v-text-field--full-width > .v-input__control > .v-input__slot,
  .v-text-field--outlined > .v-input__control > .v-input__slot
    min-height 37px
  .v-text-field__slot
    font-size 14px
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot,
  .v-text-field.v-text-field--enclosed .v-text-field__details
    padding-left 0
  .v-text-field
    padding 0
    margin 0
</style>
