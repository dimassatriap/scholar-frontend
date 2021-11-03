<template>
  <client-only>
    <div
      class="py-1 px-2 rounded-4 text-12 d-inline-block text-no-wrap"
      :class="{
        'sred20 sred--text': error || color === 'error',
        'syellow20 syellow--text': warning || color === 'warning',
        'sgreen20 sgreen--text': success || color === 'success',
        'sblue20 sblue--text': info || color === 'info',
        'accent primary--text': primary || color === 'primary',
        'sblack5 sblack60--text': isDefault
      }"
    >
      <slot></slot>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    info: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    }
  },

  data() {
    return {}
  },

  computed: {
    isDefault() {
      return (
        !this.error &&
        this.color !== 'error' &&
        !this.warning &&
        this.color !== 'warning' &&
        !this.success &&
        this.color !== 'success' &&
        !this.info &&
        this.color !== 'info' &&
        !this.primary &&
        this.color !== 'primary'
      )
    }
  },

  mounted() {}
}
</script>

<style></style>
