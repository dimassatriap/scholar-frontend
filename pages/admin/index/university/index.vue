<template>
  <div>
    <v-container class="">
      <v-row :no-gutters="isXs" justify="center" align="center">
        <v-col cols="12">
          <div class="mt-4">
            <AdminUniversityTable />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'

export default {
  mixins: [breakpointMixin]
}
</script>

<style></style>
