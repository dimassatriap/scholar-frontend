<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <template>
          <v-list-item v-for="(item, i) in navItems" :key="'accountItems' + i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="refresh()">
            <v-list-item-action>
              <v-icon> mdi-logout </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Keluar '" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar height="130" max-height="130" :clipped-left="clipped" fixed app elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <YImg contain :src="require('~/assets/logos/logo-unpad.svg')" max-width="320" class="ml-8" position="left"></YImg>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <YAlert />
  </v-app>
</template>

<script>
import allLayoutMixins from '~/mixins/all-layout'
import breakpointMixin from '~/mixins/breakpoint'
import adminMixin from '~/mixins/admin'

export default {
  mixins: [allLayoutMixins, breakpointMixin, adminMixin],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      navItems: [
        {
          icon: 'mdi-account',
          title: 'Akun',
          to: '/admin/akun'
        },
        {
          icon: 'mdi-account-tie',
          title: 'Dosen',
          to: '/admin/scholars'
        },
        {
          icon: 'mdi-clipboard-edit',
          title: 'Publikasi',
          to: '/admin/research'
        },
        {
          icon: 'mdi-town-hall',
          title: 'Universitas',
          to: '/admin/university'
        },
        {
          icon: 'mdi-help-network',
          title: 'Pesan Kendala',
          to: '/admin/helpdesk'
        }
      ],

      miniVariant: false
    }
  },

  mounted() {},

  methods: {
    refresh() {
      window.location.reload(false)
    }
  }
}
</script>
