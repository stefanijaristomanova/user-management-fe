<!--Reusable component which is included in the Register dialog and Create / Update User page-->
<template>
  <v-card color="#00000">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12 md12 lg12>
          <v-form ref="form" lazy-validation>
            <v-layout>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                    v-model="model.name"
                    :rules="nameRules"
                    label="Name"
                    required
                    clearable
                    outlined
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                    v-model="model.surname"
                    :rules="nameRules"
                    label="Surname"
                    required
                    clearable
                    outlined
                ></v-text-field>
              </v-col>
            </v-layout>
            <v-layout>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                    label="Email"
                    v-model="model.email"
                    :value="model.email"
                    outlined
                    type="text"
                    required
                    clearable
                    filled
                    autocomplete="off"
                    :rules="emailRules"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field
                    v-if="thisUser === true"
                    v-model="model.password"
                    :rules="passwordRules"
                    label="Password"
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="changeValue"
                    :type="value ? 'password' : 'text'"
                    required
                    outlined
                    eye-icon="mdi-eye"
                ></v-text-field>
              </v-col>
            </v-layout>
            <v-layout align-center>
              <v-col class="d-flex" cols="12" sm="6">
                <vue-tel-input-vuetify
                    outlined
                    v-model="model.phone"
                ></vue-tel-input-vuetify>
              </v-col>
              <v-date-picker
                  v-model="model.date"
                  width="290"
                  class="mt-4"
              ></v-date-picker>
              <span>{{ message }}</span>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "RegisterForm",
  props: {},
  data() {
    return {
      nameRules: [
        v => !!v || 'Username is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)) || 'Invalid Email address'
      ],
      admin: false,
      value: String,
      model: {
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        date: ''
      },
      message: '',
      thisUser: true
    }
  },
  methods: {
    // swap values when the password icon is clicked
    changeValue() {
      this.value = !this.value;
    },
  }
}
</script>
