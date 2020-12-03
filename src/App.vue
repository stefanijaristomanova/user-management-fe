<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require('./assets/n47logo.png')"
            transition="scale-transition"
            width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <span class="mr-2" @click="showLoginDialog" v-if="!loggedIn">Login</span>
      <span class="mr-2" @click="logout" v-if="loggedIn">Logout</span>
      <span class="mr-2" @click="showRegisterDialog" v-if="!loggedIn">Register</span>
    </v-app-bar>

    <v-main>
      <router-view></router-view>

      <Login ref="login"></Login>
      <Register ref="register"></Register>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from './components/Footer';
import Register from "@/components/Register";
import Login from "@/components/Login";

export default {
  name: 'App',

  components: {
    Register,
    Footer,
    Login
  },
  data() {
    return {
      loggedIn: this.userLoggedIn()
    }
  },

  methods: {
    showLoginDialog() {
      let self = this;
      self.$refs.login.dialog = true;

      // close login dialog or login if esc/enter pressed
      document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 13) {
          self.$refs.login.login();
        }
        if (evt.keyCode == 27) {
          self.$refs.login.dialog = false;
        }
      }
    },
    showRegisterDialog() {
      let self = this;
      self.$refs.register.dialog = true;

      // close registration dialog or register if esc/enter pressed
      document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 13) {
          self.$refs.register.validate();
        }
        if (evt.keyCode == 27) {
          self.$refs.register.dialog = false;
        }
      }
    },
    logout() {
      this.clearToken();
      window.location = '/';
    }
  }
}
</script>
