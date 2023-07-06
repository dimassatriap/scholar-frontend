<template>
  <v-card
    :loading="loading"
    :flat="flat"
    :class="{ 'shadow-card-sm': !flat }"
    style="min-height: 100%"
    @click="$emit('click')"
  >
    <template slot="progress">
      <v-progress-linear color="primary" height="10" indeterminate></v-progress-linear>
    </template>
    <v-card-text class="text--primary" :class="{ 'px-0': flat, 'pt-sm-6 px-sm-6': !flat, 'py-0': !showDivider }">
      <div class="text-body1 bold">
        {{ value.name }}
      </div>
      <div class="text-body2 sblack60--text mt-2">
        <i>{{ value.journal }}</i>
      </div>
      <div class="text-body2 sblack60--text mt-2">
        <i>{{ value.conference }}</i>
      </div>
      <div class="text-body2 sblack60--text mt-2">
        <span v-for="(keyword, j) in value.keywords" :key="'keyword-' + value.id + '-' + j"
          ><span v-if="j > 0">, </span>{{ keyword.name }}</span
        >
      </div>
    </v-card-text>
    <v-divider v-if="showDivider"></v-divider>
    <v-card-actions v-if="!hideActions" class="pt-4 px-sm-6 justify-space-between align-center">
      <div>
        <YBtn text small :loading="isDeletePublicationLoading" @click="deletePublication">Hapus</YBtn>
        <YBtn text small class="ml-4" @click="$emit('edit', value)">Ubah</YBtn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'

export default {
  mixins: [breakpointMixin],
  props: {
    value: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    showDivider: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isDeletePublicationLoading: false
    }
  },

  computed: {},

  mounted() {},

  methods: {
    async deletePublication() {
      this.isDeletePublicationLoading = true
      try {
        const a = await this.$repo.scholar.deletePublication(this.value.id)
        const res = a.data
        this.$YAlert.show({ content: res.messages, timeout: '3000' })
        if (res && res.status) {
          this.$store.commit('alert/scholarPublicationChanged')
        }
      } catch (e) {
        // console.log('e: ', e)
      } finally {
        this.isDeletePublicationLoading = false
      }
    }
  }
}
</script>

<style></style>
