<template>
  <div>
    <v-container class="pa-0">
      <v-row no-gutters justify="center">
        <v-col :cols="containerCol.cols" :sm="containerCol.sm" :md="containerCol.md" :lg="containerCol.lg">
          <v-card class="shadow-sm-card-sm">
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col
                  :cols="sideCol.col"
                  :sm="sideCol.sm"
                  class="
                    primary
                    bg-pattern
                    d-flex
                    flex-column
                    justify-center
                    align-center
                    text-center
                    white--text
                    pa-4 pa-sm-6
                  "
                  :class="{ 'radius-inherit-left': isSmAndUp }"
                  style="min-height: 180px"
                >
                  <h2 class="mb-2">{{ myMerchant.title }}</h2>
                  <div class="text-body2">{{ myMerchant.tagline }}</div>
                </v-col>
                <v-col :cols="contentCol.cols" :sm="contentCol.sm" :class="{ 'radius-inherit-right': isSmAndUp }">
                  <slot></slot>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'

export default {
  mixins: [breakpointMixin],
  props: {
    containerCol: {
      type: Object,
      default: () => {
        return {
          cols: 12,
          sm: 10,
          lg: 8
        }
      }
    },
    sideCol: {
      type: Object,
      default: () => {
        return {
          cols: 12,
          sm: 5
        }
      }
    },
    contentCol: {
      type: Object,
      default: () => {
        return {
          cols: 12,
          sm: 7
        }
      }
    }
  },

  data() {
    return {}
  },

  computed: {
    myMerchant() {
      return this.$store.state.merchant.myMerchant
    }
  },

  mounted() {}
}
</script>

<style lang="stylus" scoped>
.radius-inherit-left
  border-bottom-left-radius inherit
  border-top-left-radius inherit

.radius-inherit-right
  border-bottom-right-radius inherit
  border-top-right-radius inherit

.bg-pattern
  background-image url('~assets/images/auth/side-bg-pattern-up.png'), url('~assets/images/auth/side-bg-pattern-down.png')
  background-size contain
  background-position left top, right bottom
</style>
