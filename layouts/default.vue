<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="'items' + i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <template>
          <v-list-item
            v-for="(item, i) in isLogin ? accountScholarItems : authItems"
            :key="'accountItems' + i"
            :to="item.to"
            router
            exact
          >
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
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [allLayoutMixins, breakpointMixin, accountScholarMixins],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire'
        // },
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Research Output',
          to: '/research'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Profiles',
          to: '/profiles'
        }
      ],

      authItems: [
        {
          icon: 'mdi-login-variant',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/register'
        }
      ],

      accountScholarItems: [
        {
          icon: 'mdi-account',
          title: 'Account',
          to: '/scholar/profile'
        },
        {
          icon: 'mdi-clipboard-text',
          title: 'My Research',
          to: '/scholar/research/publication'
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout'
        }
      ],

      miniVariant: false
    }
  },

  mounted() {}
}
</script>
