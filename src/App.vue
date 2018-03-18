<template>
  <!-- Global wrapper for the Vue app  -->
  <v-app>
    <!-- Navigation drawer -->
	  <v-navigation-drawer fixed clipped app v-model="sideNav">
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
      KHIS & LAIGHT
      </router-link>
		  </v-toolbar-title>	  		  
		  <v-spacer></v-spacer>
		  <!-- <v-toolbar-items class="hidden-xs-only" v-for="item in adminItems" :key="item.title" :to="item.link"> -->
		  <v-toolbar-items class="hidden-xs-only">
        <!-- <v-btn flat @click.stop="item.link"> 
				  <v-icon left>{{item.icon}}</v-icon>
				  {{item.title}}
			  </v-btn> -->
			  <v-btn flat v-if="isLoggedIn"> 
				  <v-icon left>face</v-icon>
				  {{user.name}}
			  </v-btn>
        <v-btn flat v-if="isLoggedIn" @click="logout"> 
				  <v-icon left>lock</v-icon>
				  Logout
			  </v-btn>
        <v-btn flat v-if="!isLoggedIn" @click="loginDialog=true"> 
				  <v-icon left>lock_open</v-icon>
				  Login
			  </v-btn>
		  </v-toolbar-items>
	  </v-toolbar>
    <!-- About dialog -->
    <v-dialog v-model="loginDialog" temporary max-width="400">
      <v-card fluid>
        <v-toolbar flat>
          <v-toolbar-title>
            Login
          </v-toolbar-title>
        </v-toolbar>
      <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
        label="E-mail"
        v-model="email"
        :rules="emailRules"
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
        <v-spacer></v-spacer>              
        <v-btn
        @click.native="logUserIn"
        :disabled="!valid"
        class="primary dark"
        >
        Valider
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  </v-dialog>
	 <!-- Main content of the application -->
	  <v-content app>
		  <router-view></router-view>
	  </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      <span>&copy; Aries.io 2017 </span>
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
      user: {
        name: null,
        email: null,
        profile: null,
        lastlog: null
      },
      sideNav: 'persistent',
      sideNavItems: [
        { icon: 'dashboard', title: 'Tableau de Bord', link: '/dashboard' },
        { icon: 'shopping_cart', title: 'Commandes', link: '/orders' },
        { icon: 'card_giftcard', title: 'Catalogue', link: '/' },
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
      ]
    }
  },
  methods: {
    logout () {
      this.isLoggedIn = false
    },
    logUserIn () {
      console.log('Logging in with ' + this.email + ' and ' + this.password)
      firebase.app.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.user.email = res.email
          this.user.lastlog = res.metadata.lastSignInTime
          console.log(this.user)
          firebase.collection('users').where('email', '==', this.email).get().then(querySnapshot => {
            console.log(querySnapshot)
          })
        })
        .catch((error) => {
          console.log(error.message)
        })
      // firebase.default.
      // this.loginDialog = false
      // this.isLoggedIn = true
      // console.log('Logged In')
    }
  },
  name: 'App'
}
</script>
