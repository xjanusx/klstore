<template>
  <!-- Global wrapper for the Vue app  -->
  <v-app>
    <!-- Navigation drawer -->
	  <v-navigation-drawer fixed clipped app v-model="sideNav" v-if="isLoggedIn">
      <v-list>
        <v-list-tile  v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>            
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      <v-divider></v-divider>
        <v-list-tile  v-for="item in adminItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>            
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>      
	  </v-navigation-drawer>
	  <!-- toolbar -->
	  <v-toolbar app clipped-left fixed class="purple" dark>
		<v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
		  <v-toolbar-title>
			<router-link to="/" tag="span" style="cursor: pointer">
      KHISS & LAIGHT
      </router-link>
		  </v-toolbar-title>	  		  
		  <v-spacer></v-spacer>
		  <!-- <v-toolbar-items class="hidden-xs-only" v-for="item in adminItems" :key="item.title" :to="item.link"> -->
		  <v-toolbar-items class="hidden-xs-only">
        <!-- <v-btn flat @click.stop="item.link"> 
				  <v-icon left>{{item.icon}}</v-icon>
				  {{item.title}}
			  </v-btn> -->
			  <v-btn flat v-if="isLoggedIn" @click="userDialog=true"> 
				  <v-icon left>face</v-icon>
				  {{user.name}}
			  </v-btn>
        <v-btn flat v-if="isLoggedIn" @click="logUserOut"> 
				  <v-icon left>lock</v-icon>
				  Logout
			  </v-btn>
        <v-btn flat v-if="!isLoggedIn" @click="loginDialog=true"> 
				  <v-icon left>lock_open</v-icon>
				  Login
			  </v-btn>
		  </v-toolbar-items>
	  </v-toolbar>
    <!-- Login dialog -->
    <v-dialog v-model="loginDialog" temporary max-width="400">
      <v-card fluid>
        <v-toolbar flat>
          <v-toolbar-title>
            Login
          </v-toolbar-title>
        </v-toolbar>
      <v-card-text>
      <v-form v-model="valid" ref="form" @submit="logUserIn" lazy-validation>
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
        @submit="logUserIn"
        ></v-text-field>
        <v-spacer></v-spacer>              
        <v-btn
        @click.native="logUserIn"
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
  <!-- User dialog -->
    <v-dialog v-model="userDialog" temporary max-width="400">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
          <div class="headline">{{user.name}}</div>
          </v-toolbar-title>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-card-text>
          <div class="grey--text">
            <p>
            Email: {{user.email}}              
            </p>
            <p>
              Profil: {{user.profile}}
            </p>
            <p>
              Dernière connexion: {{user.lastlog}}
            </p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink darken-1" flat="flat" @click.native="userDialog=false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
	 <!-- Main content of the application -->
	  <v-content app>
		  <router-view></router-view>
	  </v-content>
    <v-flex xs12 class="mb-3"></v-flex>
    <v-footer>
      <v-spacer></v-spacer>
      <span>&copy; 2018 IRON Technologies </span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from './lib/firebase'
export default {
  data () {
    return {
      isLoggedIn: false,
      loginDialog: false,
      userDialog: false,
      user: {
        id: null,
        name: null,
        email: null,
        profile: null,
        lastlog: null,
        phoneNumber: null,
        created: null
      },
      sideNav: 'persistent',
      sideNavItems: [
        { icon: 'card_giftcard', title: 'Catalogue', link: '/' },
        { icon: 'dashboard', title: 'Statistiques', link: '/dashboard' },
        { icon: 'shopping_cart', title: 'Commandes', link: '/orders' },
        { icon: 'group', title: 'Clients', link: '/clients' },
        { icon: 'group_work', title: 'Fournisseurs', link: '/suppliers' }
      ],
      adminItems: [
        { icon: 'settings', title: 'Paramètres', link: '/settings' }
      ],
      valid: false,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'E-mail requis',
        // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        (v) => /\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail invalide'
      ],
      passwordRules: [
        (v) => !!v || 'Mot de passe requis'
      ],
      btnLoading: false
    }
  },
  methods: {
    logUserIn () {
      // console.log('Logging in with ' + this.email + ' and ' + this.password)
      this.btnLoading = true
      firebase.app.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res)
          this.user.uid = res.uid
          this.user.email = res.email
          this.user.lastlog = res.metadata.lastSignInTime
          this.user.created = res.metadata.creationTime
          // this.user.name = res.displayName
          // this.user.profile = res.profile
          // this.loginDialog = false
          // this.isLoggedIn = true
          // alert({
          //   message: 'Logged in as ' + this.user.name,
          //   timeout: 2000
          // })
          // this.btnLoading = false
          // this.sideNav = 'persistent'
          firebase.collection('users').where('email', '==', this.email).get().then(querySnapshot => {
            console.log(querySnapshot)
            querySnapshot.forEach(val => {
              console.log(val)
              const currentUser = {
                uid: this.user.uid,
                id: val.id,
                name: val.data().name,
                email: val.data().email,
                phoneNumber: val.data().phoneNumber,
                created: this.user.created,
                lastlog: this.user.lastlog,
                profile: val.data().profile
              }
              this.user.name = currentUser.name
              this.user.profile = currentUser.profile
              // Update data in Users' database /////////////////////////////////
              firebase.collection('users').doc(currentUser.id).set(currentUser)
                .then(res => {
                  console.log(res)
                })
                .catch(error => {
                  console.log('Error when setting LastLog: ' + error)
                })
              // alert('Logged in as ' + currentUser.name)
              this.loginDialog = false
              this.isLoggedIn = true
              this.btnLoading = false
              this.sideNav = 'persistent'
            })
          })
        })
        .catch((error) => {
          console.log(error.message)
          this.btnLoading = false
          alert(error)
          this.loginDialog = false
        })
    },
    logUserOut () {
      firebase.app.auth().signOut()
        .then(() => {
          this.isLoggedIn = false
          this.name = null
          this.email = null
          this.profile = null
          this.lastlog = null
          this.$router.push('/')
        })
        .catch(error => {
          alert(error)
        })
    }
  },
  name: 'App'
}
</script>
