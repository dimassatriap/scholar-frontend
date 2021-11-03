<template>
  <div class="blue10 rounded-4 d-flex flex-column justify-center align-center" style="width: 66px; height: 45px">
    <YImg v-ripple contain :src="src" max-width="56px" max-height="28px"></YImg>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: [String, Object],
      default: null
    }
  }
}
</script>

<style></style>
