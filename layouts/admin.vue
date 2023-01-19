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
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$helpers.getBusinessInfo().title" />
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

export default {
  mixins: [allLayoutMixins, breakpointMixin],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      navItems: [
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/admin/akun'
        },
        {
          icon: 'mdi-account-tie',
          title: 'Scholars',
          to: '/admin/scholars'
        },
        {
          icon: 'mdi-clipboard-edit',
          title: 'Research',
          to: '/admin/research'
        }
      ],

      miniVariant: false
    }
  },

  mounted() {}
}
</script>
