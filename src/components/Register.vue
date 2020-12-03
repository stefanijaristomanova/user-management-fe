<template>
  <div>
    <v-dialog v-model="dialog" max-width="1200">
      <v-card-title class="register-title">Register a user</v-card-title>
      <RegisterForm ref="register"></RegisterForm>
      <v-btn
          color="#1E90FF"
          class="mr-4"
          @click="validate"
          block
      >
        Register
      </v-btn>
    </v-dialog>
    <v-snackbar v-model="snackbar"
                color="#1E90FF"
                :timeout=3000
                :bottom=true
                :right=true>
      {{ text_snackbar }}
    </v-snackbar>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";
import axios from "axios";

export default {
  name: "Register",
  components: {RegisterForm},
  data() {
    return {
      dialog: false,
      snackbar: false,
      text_snackbar: ''
    }
  },
  methods: {
    // validates register form
    validate() {
      if (this.$refs.register.$refs.form.validate()) {
        this.register();
      }
    },
    //closes register dialog
    closeDialog() {
      this.dialog = false;
    },
    // creates user without token required
    register() {
      let self = this;
      try {
        let data = self.$refs.register.model;
        let url = `http://${self.$config.api_url}:${self.$config.api_port}/api/users/registration`;
        axios.post(url, data).then((response) => {
          console.log('response ', response);
          if (response.status === 200) {
            self.snackbar = true;
            self.text_snackbar = 'Successfully created user. Please log in to continue!';
            self.closeDialog();

          } else {
            console.log(`Register failed with status: ${response.status}`);
          }
        })
            .catch((error) => {
              console.log(`[ERROR] ${error}`);
            })
      } catch (er) {
        console.log(er);
      }
    }
  }
}
</script>
<style>
.register-title {
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.12);
  background-color: dodgerblue;
}
</style>