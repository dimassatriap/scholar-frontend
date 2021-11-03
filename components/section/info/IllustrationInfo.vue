<template>
  <div>
    <div>
      <YImg class="mx-auto mb-4" :max-width="maxWidth" :src="img"></YImg>
    </div>
    <div class="text-subtitle1 mb-2 mx-auto text-center" :class="subtitleClass" :style="`max-width: ${maxWidth}px`">
      {{ subtitle }}
    </div>
    <div class="text-body2 sblack60--text mx-auto text-center" :class="bodyClass" :style="`max-width: ${maxWidth}px`">
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: [String, Function],
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: Number,
      default: 328
    },
    subtitleClass: {
      type: String,
      default: ''
    },
    bodyClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
