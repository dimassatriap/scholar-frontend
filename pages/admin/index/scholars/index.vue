<template>
  <div>
    <v-container class="pa-0 pa-sm-4">
      <v-row :no-gutters="isXs" justify="center" align="center">
        <v-col cols="12" sm="10">
          <div class="mt-4">
            <AdminScholarsTable />
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
