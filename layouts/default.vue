<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
    >
      <nuxt-link to ="/"><v-toolbar-title v-text="title" /></nuxt-link>
      <v-spacer />
      <v-btn text small to="/">Home</v-btn>
      <v-btn text small to="/about">About</v-btn>      
      <v-btn v-if="!user" text small to="/login">Login</v-btn>
      <v-btn v-if="!user" text small to="/register">Register</v-btn>
      <v-btn v-if="user" text small to="/profile">Profile</v-btn>
      <v-btn v-if="user" text small @click="logout" >Sign Out</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Stranuxt.js'
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  },
  watch: {
    // close the mobile menu when route changed.
    $route: function() {
      this.showMobileMenu = false
    }
  },
  mounted() {}  
}
</script>
