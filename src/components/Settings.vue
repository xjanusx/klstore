<template>
  <v-layout>
    <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
        <v-toolbar flat class="mb-3">
          <v-toolbar-title>
            Paramètres
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
        <v-layout wrap>
        <v-flex mb-3 xs12>
        <v-card>
          <v-toolbar flat class="mb-3">
          <v-toolbar-title>
            Utilisateurs
          </v-toolbar-title>
            <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
              @click="signupDialog=true"
            >
        <v-icon>add</v-icon>
      </v-btn>
        </v-toolbar>
        <v-container fluid>
        <v-layout wrap>
        <v-flex xs12>
        <v-flex sm3 right>
            <v-text-field
            append-icon="search"
            label="Rechercher"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-flex>
        </v-flex>
        <v-flex mb-3 xs12>
        <v-card flat>
          <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :loading="loading"
        >
          <template slot="items" slot-scope="props">
            <tr>
            <!-- <tr @click="select(props.item)" style="cursor: pointer"> -->
              <!-- <td>{{ props.item.name }}</td> -->
              <!-- <td class="text-xs-left">{{ props.item.id }}</td> -->
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.profile}}</td>
              <td class="text-xs-left">{{ props.item.phoneNumber}}</td>
              <td class="text-xs-left">{{ props.item.created}}</td>
              <td class="text-xs-left">{{ props.item.lastlog}}</td>
              <td class="text-xs-left">
                <span>
                <v-btn dark small flat fab color="green">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>
                <v-btn dark small flat fab color="red" @click="deleteUser(props.item)">
                  <v-icon>delete</v-icon>
                </v-btn>
                </span>
                </span>
              </td>
            </tr>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Aucune donnée trouvée.
          </v-alert>
        </v-data-table>
        </v-card>
        </v-flex>
        </v-layout>
        </v-container>
        </v-card>
        </v-flex>
        </v-layout>
        </v-container>
      </v-card>
      </v-flex>
  </v-layout>
  <!-- Signup dialog -->
    <v-dialog v-model="signupDialog" temporary max-width="400">
      <v-card fluid>
        <v-toolbar flat>
          <v-toolbar-title>
            Nouvel Utilisateur
          </v-toolbar-title>
        </v-toolbar>
      <v-card-text>
      <v-form v-model="valid" ref="form" @submit="userSignup()" lazy-validation>
        <v-text-field
        label="Nom Complet"
        v-model="name"
        autofocus
        required
        ></v-text-field>
        <v-text-field
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        autofocus
        required
        ></v-text-field>
        <v-text-field
        label="Mot de passe"
        v-model="password"
        type="password"
        :min=6
        :counter="32"
        :rules="passwordRules"
        required
        ></v-text-field>
        <v-text-field
        label="Confirmer le Mot de passe"
        v-model="pwdConfirm"
        type="password"
        :min=6
        :counter="32"
        :rules="confirmRules"
        required
        ></v-text-field>
        <v-text-field
        label="N° de Téléphone (+228)"
        v-model="phoneNumber"
        type="number"
        :max=8
        :counter="8"
        required
        ></v-text-field>
        <v-select
          :items="profilesList"
          v-model="profile"
          label="Profil"
          single-line
        ></v-select>
        <v-spacer></v-spacer>              
        <v-btn
        @click.native="userSignup()"
        :disabled="!valid"
        :loading="btnLoading"
        class="primary dark"
        >
        Valider
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  </v-dialog>
  </v-container>
  </v-layout>
</template>


<script>
import firebase from '../lib/firebase'
export default {
  data () {
    return {
      isLoggedIn: false,
      signupDialog: false,
      btnLoading: false,
      search: '',
      users: [],
      // user: {
      //   name: null,
      //   email: null,
      //   profile: null,
      //   phoneNumber: null,
      //   created: null,
      //   lastlog: null
      // },
      name: null,
      email: null,
      password: null,
      profile: null,
      phoneNumber: null,
      created: null,
      lastlog: null,
      valid: false,
      pwdConfirm: '',
      emailRules: [
        (v) => !!v || 'E-mail requis',
        // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        (v) => /\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail invalide'
      ],
      passwordRules: [
        (v) => !!v || 'Mot de passe requis'
      ],
      confirmRules: [
        (v) => !!this.password || 'Les Mots de passe ne concordent pas'
      ],
      loading: false,
      headers: [
        { text: 'Nom Complet', value: 'name', align: 'left' },
        { text: 'Email', value: 'email', align: 'left' },
        { text: 'Profile', value: 'profile' },
        { text: 'Téléphone', value: 'phoneNumber' },
        { text: 'Création', value: 'created' },
        { text: 'Dernière connexion', value: 'lastlog' },
        { text: 'Actions', sortable: false, align: 'center' }
      ],
      profilesList: [
        'Admin', 'User'
      ]
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    userSignup () {
      firebase.app.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res)
          const newUser = {
            id: res.uid,
            name: this.name,
            email: res.email,
            profile: this.profile,
            phoneNumber: this.phoneNumber,
            created: res.metadata.creationTime,
            lastlog: res.metadata.LastSignInTime || 'null'
          }
          console.log(newUser)
          firebase.collection('users').add(newUser)
            .then(res => {
              console.log(res)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
      this.signupDialog = false
      this.getUsers()
    },
    getUsers () {
      this.loading = true
      let usersCol = []
      firebase.collection('users').get()
        .then(querySnapshot => {
          querySnapshot.forEach(val => {
            const fUser = {
              name: val.data().name,
              email: val.data().email,
              profile: val.data().profile,
              phoneNumber: val.data().phoneNumber,
              created: val.data().created,
              lastlog: val.data().lastlog
            }
            usersCol.push(fUser)
          })
          this.users = usersCol
          console.log(this.users)
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteUser (user) {
      firebase.collection('users').where('name', '==', user.name).get()
        .then(querySnapshot => {
          querySnapshot.forEach(val => {
            const mUser = {
              uid: val.id
            }
            firebase.collection('users').doc(mUser.uid).delete()
            .then(res => {
              console.log(res)
            })
          })
          this.getUsers()
        })
        .catch(error => {
          console.log(error)
        })
      const sUser = {
        id: user.id,
        name: user.name
      }
      console.log(sUser)
    }
  }
}
</script>
