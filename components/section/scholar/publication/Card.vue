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
        <span v-if="value.publishDate">({{ $moment(value.publishDate).format('YYYY') }})</span>
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
        <YBtn text small @click="dialogDelete = true">Hapus</YBtn>
        <YBtn text small class="ml-4" @click="$emit('edit', value)">Ubah</YBtn>
      </div>
    </v-card-actions>

    <v-dialog v-model="dialogDelete" max-width="544px">
      <v-card>
        <v-card-title class="">Apakah kamu yakin untuk menghapus Publikasi ini?</v-card-title>
        <v-card-text class="py-0"> Judul: {{ value.name }} </v-card-text>

        <MessageInfo
          :messages.sync="errorMessage"
          class="mb-4"
          card-class="sred20"
          text-class="sblack--text"
          icon-color="sred60"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <YBtn color="primary" text @click="dialogDelete = false">Batalkan</YBtn>
          <YBtn :loading="isDeletePublicationLoading" color="primary" @click="deletePublication">Hapus</YBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      isDeletePublicationLoading: false,
      dialogDelete: false,
      errorMessage: {}
    }
  },

  computed: {},

  watch: {
    dialogDelete() {
      this.errorMessage = {}
    }
  },

  mounted() {},

  methods: {
    async deletePublication() {
      this.isDeletePublicationLoading = true
      this.errorMessage = {}

      try {
        const a = await this.$repo.scholar.deletePublication(this.value.id)
        const res = a.data
        this.$YAlert.show({ content: res.messages, timeout: '3000' })
        if (res && res.status) {
          this.$store.commit('alert/scholarPublicationChanged')
        } else {
          this.errorMessage = this.$helpers.keysToCamel(res.messages)
        }
      } catch (e) {
        const res = e.response.data
        this.errorMessage = this.$helpers.keysToCamel(res.messages)
      } finally {
        this.isDeletePublicationLoading = false
      }
    }
  }
}
</script>

<style></style>
