<template>
  <v-container class="my-sm-6">
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" sm="10" class="border rounded-lg">
        <div class="">
          <div
            class="primary py-6 px-4 px-sm-6 rounded-sm-t-8 d-flex flex-column align-center justify-center white--text"
            style="height: 112px"
          >
            <div class="text-capitalize">{{ scholar.name }}</div>
          </div>
          <div class="py-6 px-4 px-sm-6 white rounded-sm-b-8">
            <YAvatar class="border-4-white mb-6" :src="scholar.image" size="104" style="margin-top: -76px" />

            <v-row :dense="isXs">
              <v-col v-for="(info, i) in scholarProfileInfo" :key="'scholarProfileInfo' + i" cols="12" sm="6">
                <div class="text-body2 rounded-4 border pa-4">
                  <v-row no-gutters justify="space-between">
                    <v-col>
                      <div class="text-no-wrap">{{ info.label }}</div>
                    </v-col>
                    <v-col>
                      <div class="text-right text-no-wrap">{{ info.value(scholar) }}</div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

            <div class="mt-4 text-body2 rounded-4 border pa-4">
              <div class="">
                Program Studi:
                <span v-if="!!scholar.department">
                  {{ `${scholar.department.name}` }}
                  <span v-if="!!scholar.department.faculty">
                    {{ `, ${scholar.department.faculty.name}` }}
                  </span>
                </span>
                <span v-else>-</span>
              </div>
            </div>

            <div class="mt-4 text-body2 rounded-4 border pa-4">
              <div class="">Alamat</div>
              <div class="mt-1">{{ !!scholar.address ? scholar.address : '-' }}</div>
            </div>
          </div>
        </div>

        <v-list class="rounded-sm-8" flat>
          <v-list-item-group v-model="selectedProfileNav" color="primary">
            <div v-for="(item, i) in profileNav" :key="'profile-nav' + i">
              <v-list-item :value="item" dense flat class="pl-4 pl-sm-6" :to="item.to">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.label"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>

            <NuxtChild />

            <v-list-item dense flat class="pl-4 pl-sm-6" @click="logout">
              <v-list-item-icon>
                <v-icon color="red60">$LogoutLightIcon</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="red60--text">Keluar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import breakpointMixin from '~/mixins/breakpoint'
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [breakpointMixin, accountScholarMixins],
  data() {
    return {
      scholarProfileInfo: [
        {
          label: 'Tanggal Lahir',
          value: (scholar) => {
            return scholar.birthDate ? this.$moment(scholar.birthDate).format('DD MMM YYYY') : 'Belum diisi'
          }
        },
        {
          label: 'Jenis kelamin',
          value: (scholar) => {
            return this.$helpers.genderParse(scholar.gender)
          }
        },
        {
          label: 'Email',
          value: (scholar) => {
            return scholar.email
          }
        },
        {
          label: 'No.Handphone / Whatsapp',
          value: (scholar) => {
            return scholar.phone
          }
        }
      ],

      profileNav: [
        {
          label: 'Ubah Profil',
          icon: '$ProfileLightIcon',
          to: '/scholar/profile/edit'
        }
      ],
      selectedProfileNav: null
    }
  },

  methods: {
    logout() {
      this.$router.push('/logout')
    }
  }
}
</script>

<style></style>
