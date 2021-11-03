<template>
  <v-menu v-model="isActive" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text dark v-bind="attrs" v-on="on">
        <div class="d-flex align-center">
          <div>{{ value.parameter }}</div>
          <v-icon size="14" class="ml-2" :class="{ 'animate-rotate': attrs['aria-expanded'] === 'true' }">
            $ChevronDownLightIcon
          </v-icon>
        </div>
      </v-btn>
    </template>

    <v-list style="max-height: 50vh; overflow-y: auto">
      <HeaderMainNavChildItem
        v-for="(child, x) in value.child"
        :key="'child+' + x"
        :value="child"
        :sub-group="false"
        @selected="isActive = false"
      />
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return { child: [] }
      }
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

  mounted() {}
}
</script>

<style></style>
