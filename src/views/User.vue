<template>
  <div class="user">
    <div id="title">
      <h2 class="page-title" v-if="createView">
        Create New User
      </h2>
      <h2 v-else class="page-title"> Edit User </h2>
    </div>
    <RegisterForm ref="register"></RegisterForm>
    <v-layout>
      <v-col class="d-flex" cols="12" sm="2">
        <v-btn
            color="#1E90FF"
            class="mr-4"
            block
            to="/users"
        >
          Back
        </v-btn>
      </v-col>
      <v-col class="d-flex" cols="12" sm="2">
        <v-btn
            color="#1E90FF"
            class="mr-4"
            @click="saveUser"
            block
        >
          Save User
        </v-btn>
      </v-col>
    </v-layout>

  </div>
</template>

<script>

import RegisterForm from "@/components/RegisterForm";

export default {
  name: "User",
  components: {RegisterForm},
  mounted() {
    let self = this;
    if (self.$route.params.id > 0) {
      self.editView = true;
      let url = `http://${self.$config.api_url}:${self.$config.api_port}/api/users/${self.$route.params.id}`;
      self.get(url).then(function (response) {
        self.$refs.register.model = response;
        self.$refs.register.thisUser = self.isThisUser();
      })
    } else {
      self.createView = true;
    }

  },
  data() {
    return {
      loading: false,
      createView: true,
      editView: false
    }
  },
  methods: {
    // checks if new / already existing  user is to be created / updated and does the actual creation / update
    saveUser() {
      let self = this;
      let data = self.$refs.register.model;
      if (self.$refs.register.$refs.form.validate()) {
        if (self.$route.params.id > 0) {
          let url = `http://${self.$config.api_url}:${self.$config.api_port}/api/users/${self.$route.params.id}`;
          let data = self.$refs.register.model;
          self.update(url, data).then(function () {
            self.$router.push("/users");
          })
        } else {
          let url = `http://${self.$config.api_url}:${self.$config.api_port}/api/users/registration`;
          self.add(url, data).then(function () {
            self.$router.push('/users');
          })
        }
      }
    },
    // checks if the opened user is the signed one and according to it the password field is shown/hidden
    isThisUser() {
      let isThis = this.$refs.register.model.email === this.getEmail();
      return isThis;
    }
  },
}

</script>
