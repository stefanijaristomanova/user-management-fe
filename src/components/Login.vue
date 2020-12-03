<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card color="#00000">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12 lg12>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-title>Login</v-card-title>
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  outlined
                  clearable
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  required
                  outlined
                  eye-icon="mdi-eye"
              ></v-text-field>
              <span class="invalid"> {{ message }} </span>
              <v-btn
                  :disabled="!valid"
                  color="#005a87"
                  class="mr-4"
                  @click="validate"
                  block
              >
                Login
              </v-btn>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      valid: true,
      dialog: false,
      email: '',
      password: '',
      value: String,
      emailRules: [
        v => !!v || 'Email is required',
        v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)) || 'Invalid Email address'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      invalid: false,
      message: ''
    }
  },
  methods: {
    //validate login form
    validate: function () {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    //close login dialog
    closeDialog: function () {
      this.dialog = false;
    },
    // do the actual login / authentication (using direct axios, without added headers)
    login: function () {
      let self = this;
      try {
        let data = {
          email: this.email,
          password: this.password
        };
        let url = `http://${self.$config.api_url}:${self.$config.api_port}/api/authenticate`;
        axios.post(url, data).then((response) => {
          if (response.data.jwt) {
            self.setToken(response.data.jwt)
            self.closeDialog();
            window.location = '/users';
           } else {
            console.log(`Auth failed with status: ${response.status}`);
          }
        })
            .catch((error) => {
              console.log(`ERROR: ${error}`);
              self.invalid = true;
              self.message = "User with this e-mail address is not found!";
              self.dialog = true;
            })
      } catch (er) {
        console.log(er);
      }
    }
  }
}
</script>

<style scoped>
.invalid {
  color: red;
}
</style>