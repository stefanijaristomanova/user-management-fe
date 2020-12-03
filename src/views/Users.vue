<template>
  <div id="users">
    <div id="title">
      <h2 class="page-title">
        Users
        <v-btn
            class="addButton"
            to="/users/0"
        >Add New User
        </v-btn>
      </h2>
    </div>
    <v-card class="card" raised>
      <v-data-table
          :headers="headers"
          :items="users"
          :key="users.id"
          :search="search"
          :loading="loading" loading-text="Loading... Please wait"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" style="margin-left: 70%">
            <v-text-field right
                          name="search"
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          autocomplete="off"
                          dense
                          hide-details
                          outlined
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <router-link :to="'/users/' + item.id">
            <v-icon class="icons" style="padding:6px;">
              mdi-pencil
            </v-icon>
          </router-link>
          <v-icon @click="deleteUser(item.id)" class="icons" style="padding:6px;">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <p class="no-data"> There are no users!</p>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Users",
  components: {},
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Surname',
          value: 'surname'
        },
        {
          text: 'Date',
          value: 'date'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Phone',
          value: 'phone'
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false
        },
      ],
      users: [],
      loading: false,
      confirmationDialog: false
    }
  },
  mounted() {
    this.loadTable();
  },
  methods: {
    // fills the data table from the database
    loadTable() {
      let self = this;
      self.loading = true;
      this.get(`http://${self.$config.api_url}:${self.$config.api_port}/api/users`).then(function (response) {
        response.forEach(function (val) {
          self.users.push({
            id: val.id,
            name: val.name,
            surname: val.surname,
            email: val.email,
            date: val.date,
            phone: val.phone
          });
        });
        self.loading = false;
      })
    },
    //deletes the selected user
    deleteUser(id) {
      let self = this;
      self.delete(`http://${self.$config.api_url}:${self.$config.api_port}/api/users/${id}`).then(function () {
        window.location = '/users';  // the page should be refreshed according to see the actual users after deleting
      })

    }
  },
}
</script>

<style scoped>
.page-title {
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.12);
  padding: 15px 30px 15px;
  font-size: 1.7em !important;
}


.icons {
  font-size: 1.7em !important;
  margin-right: 25px;
  text-decoration: none !important;
  border-radius: 2px !important;
}

.addButton {
  float: right;
  font-size: 0.6em !important;
  text-decoration: none !important;
}

</style>