<template>
  <div>
    <div v-if="label" class="mb-1">
      <label :for="id" class="text-body2 sblack60--text">{{ label }}</label>
    </div>
    <div class="d-flex">
      <div
        v-for="(item, i) in valueList"
        :key="i"
        v-ripple
        class="d-flex align-center mr-2 rounded-4 pa-2 sblack5 text-16 cursor-pointer"
        @click="select(item)"
      >
        <div class="radio-btn" :class="{ active: item.value === value.value }">
          <div v-show="item.value === value.value" class="bullet"></div>
        </div>
        <span> {{ item.label }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Object, null],
      required: true
    },
    valueList: {
      type: Array,
      required: true
    },
    id: {
      type: [String, null],
      default: null
    },
    label: {
      type: [String, null],
      default: null
    }
  },

  methods: {
    select(item) {
      this.$emit('input', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.bullet
  width 8px
  height 8px
  border-radius 50%
  background var(--v-primary-base)
.radio-btn.active
  border 1px solid var(--v-primary-base)
.radio-btn
  margin-right 9px
  width 14px
  height 14px
  border-radius 50%
  border 1px solid $sblack-60
  display flex
  justify-content center
  align-items center
</style>
