<template>
  <div>
    <div v-if="label" class="mb-1 text-truncate">
      <label :for="id" class="text-body2 sblack60--text">{{ label }}</label>
    </div>

    <v-text-field
      :id="id"
      :value="value"
      :placeholder="placeholder"
      :filled="filled"
      :outlined="outlined"
      :rounded="rounded"
      :hide-details="hideDetails"
      :hint="hint"
      :rules="rules"
      :clearable="clearable"
      :clear-icon="clearIcon"
      :readonly="readonly"
      :prepend-inner-icon="prependInnerIcon"
      :color="color"
      :loading="loading"
      :dense="dense"
      :type="password ? (showPass ? 'text' : 'password') : type"
      :append-icon="password ? (showPass ? '$EyeBoldIcon' : '$EyeSlashBoldIcon') : null"
      :class="[appendButtonText ? 'rounded-8' : '', fieldClass]"
      @click:append="
        () => {
          if (password) {
            showPass = !showPass
          }
        }
      "
      @input="$emit('input', $event)"
      @blur="$emit('blur', $event)"
    >
      <template
        v-if="(!prependInnerIcon && (prependInnerText || $slots['prepend-inner'])) || $slots.append"
        v-slot:prepend-inner
      >
        <div
          v-if="prependInnerText"
          class="sblack20 sblack--text px-2 d-flex flex-column justify-center rounded-l-inherit pr-2"
          style="position: absolute !important; top: 0; left: 0; bottom: 0"
        >
          {{ prependInnerText }}
        </div>
        <div v-if="prependInnerText" class="px-2 ml-n2 pr-2" style="opacity: 0">
          {{ prependInnerText }}
        </div>

        <div
          v-if="$slots['prepend-inner']"
          class="d-flex flex-column justify-center rounded-l-inherit pr-2"
          :class="[prependInnerClass]"
          style="position: absolute !important; top: 0; left: 0; bottom: 0"
        >
          <slot name="prepend-inner"></slot>
        </div>
        <div v-if="$slots['prepend-inner']" class="pr-2" style="opacity: 0">
          <slot name="prepend-inner"></slot>
        </div>

        <div
          v-if="$slots.append"
          v-ripple="appendInnerClick"
          class="d-flex flex-column justify-center rounded-r-inherit pl-2"
          :class="[appendInnerClass, { 'cursor-pointer': appendInnerClick }]"
          style="position: absolute !important; top: 0; right: 0; bottom: 0"
          @click="appendInnerClick ? appendInnerClick() : () => {}"
        >
          <slot name="append"></slot>
        </div>
      </template>

      <template v-if="appendButtonText || $slots.append" v-slot:append>
        <div
          v-if="appendButtonText"
          class="d-flex flex-column justify-center pl-2"
          style="position: absolute !important; top: 0; right: 0; bottom: 0"
        >
          <YBtn
            height="100%"
            class="rounded-r-8"
            :color="appendButtonColor"
            :class="appendButtonClass"
            :loading="appendButtonLoading"
            @click="$emit('btn-click')"
          >
            {{ appendButtonText }}
          </YBtn>
        </div>

        <div v-if="appendButtonText" class="pl-2" style="opacity: 0">
          <YBtn @click="$emit('btn-click')">{{ appendButtonText }}</YBtn>
        </div>

        <div v-if="$slots.append" class="pl-2" style="opacity: 0; z-index: -1">
          <slot name="append"></slot>
        </div>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Object, null],
      default: null
    },
    id: {
      type: [String, null],
      default: null
    },
    placeholder: {
      type: [String, null],
      default: null
    },
    label: {
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
    rounded: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: [Boolean, String, null],
      default: 'auto'
    },
    hint: {
      type: [String, null],
      default: null
    },
    type: {
      type: [String, null],
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: [String, null],
      default: '$clear'
    },
    rules: {
      type: Array,
      default: () => []
    },
    prependInnerText: {
      type: String,
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    },
    appendButtonText: {
      type: String,
      default: ''
    },
    appendButtonColor: {
      type: String,
      default: 'primary'
    },
    appendButtonClass: {
      type: String,
      default: ''
    },
    appendButtonLoading: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    prependInnerIcon: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      default: false
    },
    fieldClass: {
      type: String,
      default: ''
    },
    prependInnerClass: {
      type: String,
      default: 'sblack5 sblack60--text border px-2'
    },
    appendInnerClass: {
      type: String,
      default: 'sblack5 sblack60--text border px-2'
    },
    dense: {
      type: Boolean,
      default: false
    },
    appendInnerClick: {
      type: [Function, null],
      default: null
    }
  },

  data() {
    return {
      showPass: false
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-input__prepend-inner
    border-radius inherit
  .v-input__append-inner
    border-radius inherit
  .v-text-field--filled.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot,
  .v-text-field--filled.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot,
  .v-text-field--filled.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot,
  .v-text-field--full-width.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot,
  .v-text-field--full-width.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot,
  .v-text-field--full-width.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot,
  .v-text-field--outlined.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot,
  .v-text-field--outlined.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot,
  .v-text-field--outlined.v-input--dense.v-text-field--outlined.v-text-field--filled > .v-input__control > .v-input__slot
    min-height 37px
  .v-input__prepend-inner
    padding-right 0 !important
  .v-input__append-inner
    padding-left 0 !important
</style>
