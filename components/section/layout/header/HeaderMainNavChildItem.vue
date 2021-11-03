<template>
  <div :class="{ 'pl-4': subGroup }">
    <v-list-group
      v-if="value.child && value.child.length"
      v-model="isActive"
      :sub-group="subGroup"
      :append-icon="null"
      :prepend-icon="null"
      color="sblack60"
    >
      <template v-slot:prependIcon>
        <span></span>
      </template>

      <template v-slot:activator>
        <v-list-item-title :class="!subGroup && isSmAndDown ? 'text-subtitle3' : 'text-body2'">
          <div class="d-flex align-center" :class="{ 'justify-space-between': isSmAndDown }">
            <div>{{ value.parameter }}</div>
            <v-icon size="14" class="ml-2" :class="{ 'animate-rotate': isActive }">$ChevronDownLightIcon</v-icon>
          </div>
        </v-list-item-title>
      </template>

      <!-- {{ value.parameter }} -->
      <v-list-item :to="value.url" :class="{ 'border-top': isSmAndDown && !subGroup }" @click="$emit('selected')">
        <v-list-item-title
          class="text-body2 pl-4"
          :class="$route.fullPath === value.url ? 'primary--text' : 'sblack60--text'"
        >
          Semua
        </v-list-item-title>
      </v-list-item>
      <HeaderMainNavChildItem
        v-for="(grand, y) in value.child"
        :key="'grand' + y"
        :value="grand"
        @selected="$emit('selected')"
      />
    </v-list-group>

    <v-list-item v-else :to="value.url" @click="$emit('selected')">
      <v-list-item-title
        :class="{
          'text-subtitle3': !subGroup && isSmAndDown,
          'text-body2': !(!subGroup && isSmAndDown),
          'primary--text': $route.fullPath === value.url,
          'sblack60--text': $route.fullPath !== value.url
        }"
      >
        {{ value.parameter }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'

export default {
  mixins: [breakpointMixin],
  props: {
    value: {
      type: Object,
      default: () => {
        return { child: [] }
      }
    },
    subGroup: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isActive: false
    }
  },

  watch: {
    isActive(newVal) {
      // console.log('newVal: ', newVal)
    }
  },

  mounted() {
    // console.log('this.$route.fullPath: ', this.$route.fullPath)
  }
}
</script>

<style lang="stylus" scoped>
::v-deep
  .v-list-item__icon
    margin 0
  .v-list-item__icon.v-list-group__header__prepend-icon
      margin 0
  .v-list-item__icon
    min-width: 0
  .v-list-item.v-list-item--link.theme--light
    padding-left 24px
  .v-list-group__header.v-list-item.v-list-item--link.theme--light
    padding-left 24px
    .v-list-item__icon.v-list-group__header__prepend-icon
      margin 0
  .v-list-group--sub-group
    .v-list-group__items
      .v-list-item.v-list-item--link.theme--light
        padding-left 24px
      .v-list-item__icon.v-list-group__header__prepend-icon
        margin 0
  .v-list-item
    padding-left 24px
    padding-right 24px
  .v-list-item--dense, .v-list--dense .v-list-item
    min-height 37px
  .v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle
    font-size 14px
    font-weight 400
    line-height 150%
    font-family 'Lato', sans-serif
  .v-list-item--link:before
    background-color white
</style>
