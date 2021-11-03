<template>
  <div class="d-flex flex-column align-center">
    <div class="d-flex">
      <YBtn fab tertiary height="28" width="28" class="" :disabled="isMinusDisabled || loading" @click="substractValue">
        -
      </YBtn>
      <div class="mx-1" :style="`width: ${(value.toString().length + 1) * 8}px`">
        <v-text-field
          ref="qty"
          :key="rerenderKey"
          :value="value"
          type="number"
          class="mt-0 pt-0"
          hide-details="auto"
          :loading="loading"
          @input="emitInput"
        ></v-text-field>
      </div>
      <YBtn fab height="28" width="28" :disabled="isPlusDisabled || loading" @click="addValue"> + </YBtn>
    </div>
    <div class="text-caption sblack60--text pt-1">{{ caption }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    maxValue: {
      type: Number,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    caption: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      quantity: 0,
      rerenderKey: 0
    }
  },

  computed: {
    isMinusDisabled() {
      return this.value <= 1
    },
    isPlusDisabled() {
      if (this.maxValue || this.maxValue === 0) {
        return this.value >= this.maxValue
      } else {
        return false
      }
    }
  },

  watch: {},

  methods: {
    resetInput() {
      // refresh
      this.rerenderKey += 1
      setTimeout(() => {
        this.$refs.qty.$refs.input.focus()
      })
    },

    emitInput(val) {
      if (this.maxValue && val > this.maxValue) {
        this.resetInput()
        this.$emit('input', parseInt(this.maxValue))
      } else if (parseInt(val) && parseInt(val) > 1) {
        this.$emit('input', parseInt(val))
      } else {
        this.resetInput()
        this.$emit('input', 1)
      }
    },

    emitChange(oldVal) {
      clearTimeout(this._searchTimerId)
      this._searchTimerId = setTimeout(() => {
        this.$emit('change', this.value, oldVal)
      }, 1000)
    },

    substractValue() {
      if (!this.isMinusDisabled) {
        const oldVal = parseInt(this.value)
        this.$emit('input', parseInt(this.value) - 1)
        this.$emit('substract', this.value)

        this.emitChange(oldVal)
      }
    },
    addValue() {
      if (!this.isPlusDisabled) {
        const oldVal = parseInt(this.value)
        this.$emit('input', parseInt(this.value) + 1)
        this.$emit('add', this.value)

        this.emitChange(oldVal)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
::v-deep {
  .v-text-field input {
    text-align: center;
    padding-left: 2px;
    padding-right: 2px;
  }

  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
}
</style>
