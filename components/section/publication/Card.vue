<template>
  <v-card elevation="0" outlined @click="$router.push(`/research/${value.id}`)">
    <v-card-title class="headline">
      <div>
        {{ value.name }}

        <span v-if="value.publishDate"> ({{ $moment(value.publishDate).format('YYYY') }}) </span>
      </div>
    </v-card-title>
    <v-card-subtitle class="mt-n3 subtitle-1 text-justify">
      <div v-if="value.scholar" class="d-flex align-center">
        <YAvatar size="32" :src="value.scholar.image"> </YAvatar>
        <div class="ml-2">
          {{ $helpers.fullName(value.scholar.name, value.scholar.frontTitle, value.scholar.backTitle) }}
        </div>
      </div>
      <div v-if="value.coAuthor" class="mt-1">
        {{ value.coAuthor.replaceAll(',,', '; ') }}
      </div>
    </v-card-subtitle>
    <v-card-text>
      <div class="ellipsis-2-lines">
        {{ value.abstract }}
      </div>

      <div class="mt-2 d-flex align-center flex-wrap" style="gap: 8px">
        <button
          v-for="(keyword, j) in value.keywords"
          :key="'keyword-' + value.id + '-' + j"
          class="border pa-1 rounded-4 text-capitalize"
        >
          {{ keyword.name }}
        </button>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  methods: {}
}
</script>

<style></style>
