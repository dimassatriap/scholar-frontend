<template>
  <div>
    <NuxtLink v-for="(item, i) in items" :key="'items' + i" :to="item.to">
      <div>
        <v-icon>{{ item.icon }}</v-icon>
      </div>
      <div>
        {{ item.title }}
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import accountScholarMixins from '~/mixins/account-scholar'

export default {
  mixins: [accountScholarMixins],
  data() {
    return {
      items: [
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
      ]
    }
  }
}
</script>

<style></style>
