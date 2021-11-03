<template>
  <div id="header-bar" :class="transparentNavbarRoute ? 'fixed-transparent' : 'sticky'">
    <v-container :class="containerClass">
      <v-row align="center" no-gutters>
        <template v-if="$slots.default && $slots.default.length">
          <slot> </slot>
        </template>

        <template v-else>
          <v-col cols="1">
            <YBtn icon color="sblack" @click="$emit('back')">
              <v-icon>$prev</v-icon>
            </YBtn>
          </v-col>
          <v-col cols="10">
            <div class="text-center text-truncate" :class="titleClass">
              {{ title }}
            </div>
          </v-col>
          <v-col cols="1"> </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: 'text-subtitle2 text-sm-24 sm-bold'
    },
    containerClass: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      transparentNavRoute: ['index']
    }
  },

  computed: {
    transparentNavbarRoute() {
      if (this.transparentNavRoute.includes(this.$route.name) && process.browser) {
        window.addEventListener('scroll', this.handleScroll)
      } else if (!this.transparentNavRoute.includes(this.$route.name) && process.browser) {
        window.removeEventListener('scroll', this.handleScroll)
      }
      return this.transparentNavRoute.includes(this.$route.name)
    }
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  mounted() {},

  methods: {
    handleScroll(event) {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      // console.log(currentScrollPosition)

      if (currentScrollPosition < 1) {
        document.getElementById('header-bar').setAttribute('class', 'fixed-transparent')
      } else {
        document.getElementById('header-bar').setAttribute('class', 'fixed')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.sticky
  position -webkit-sticky
  position sticky
  top 0
  z-index 99
  background-color rgba(255, 255, 255, 1)
  box-shadow 0px 4px 8px rgba(113, 115, 115, 0.08)

.fixed
  position fixed
  width 100vw
  background-color rgba(255, 255, 255, 1)
  box-shadow 0px 4px 8px rgba(113, 115, 115, 0.08)
  z-index 99

  transition background 0.2s ease-in
  -ms-transition background 0.2s ease-in
  -moz-transition background 0.2s ease-in
  -webkit-transition background 0.2s ease-in

.fixed-transparent
  position fixed
  width 100vw
  background-color rgba(255, 255, 255, 0)
  z-index 99

  transition background 0.2s ease-out
  -ms-transition background 0.2s ease-out
  -moz-transition background 0.2s ease-out
  -webkit-transition background 0.2s ease-out
</style>
