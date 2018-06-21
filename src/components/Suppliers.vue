<template>
  <v-layout>
    <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar flat class="mb-3">
          <v-toolbar-title>
            Fournisseurs
          </v-toolbar-title>
          <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
              @click="addSupplierDialog=true"
            >
        <v-icon>add</v-icon>
      </v-btn>
        </v-toolbar>
      </v-flex>
      <v-container fluid>
        <v-layout wrap>
        <v-flex mb-3 xs12>
        <v-card>
          <v-data-table
          :headers="headers"
          :items="suppliers"
          :search="search"
          :loading="loading"
        >
          <template slot="items" slot-scope="props">
            <tr>
            <!-- <tr @click="select(props.item)" style="cursor: pointer"> -->
              <!-- <td>{{ props.item.name }}</td> -->
              <!-- <td class="text-xs-left">{{ props.item.id }}</td> -->
              <td class="text-xs-left">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.phone}}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.skill }}</td>
              <td class="text-xs-left">{{ props.item.city}}</td>
              <td class="text-xs-left">{{ props.item.country}}</td>
              <td class="text-xs-right">
                <span>
                <v-btn dark flat fab color="green" small>
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>
                <v-btn dark flat fab color="red" small>
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
  </v-layout>
  <!-- Add Supplier dialog -->
    <v-dialog v-model="addSupplierDialog" temporary max-width="400">
      <v-card fluid>
        <v-toolbar flat>
          <v-toolbar-title>
            Nouveau Fournisseur
          </v-toolbar-title>
        </v-toolbar>
      <v-card-text>
      <v-form ref="form" @submit="addSupplier()" lazy-validation>
        <v-text-field
        label="Nom Fournisseur"
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
        label="N° de Téléphone (+228)"
        v-model="phone"
        type="number"
        :max=8
        :counter="8"
        required
        ></v-text-field>
        <v-text-field
        label="Spécialités"
        v-model="skill"
        autofocus
        required
        ></v-text-field>
        <v-text-field
        label="Ville"
        v-model="city"
        autofocus
        required
        ></v-text-field>
        <v-text-field
        label="Pays"
        v-model="country"
        autofocus
        required
        ></v-text-field>
        <v-spacer></v-spacer>              
        <v-btn
        @click.native="addSupplier()"
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
      addSupplierDialog: false,
      btnLoading: false,
      search: '',
      suppliers: [],
      name: null,
      phone: null,
      email: null,
      skill: null,
      city: null,
      country: null,
      loading: false,
      headers: [
        { text: 'Nom', value: 'name', align: 'left' },
        { text: 'Téléphone', value: 'phone' },
        { text: 'Email', value: 'email', align: 'left' },
        { text: 'Spécialités', value: 'skill', align: 'left' },
        { text: 'Ville', value: 'city' },
        { text: 'Pays', value: 'country' },
        { text: 'Actions', sortable: false, align: 'right' }
      ],
      emailRules: [
        (v) => !!v || 'E-mail requis',
        // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        (v) => /\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail invalide'
      ]
    }
  },
  created () {
    this.getSuppliers()
  },
  methods: {
    addSupplier () {
      const newSupplier = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        skill: this.skill,
        city: this.city,
        country: this.country
      }
      firebase.collection('suppliers').add(newSupplier)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
      this.addSupplierDialog = false
      this.su = null
      this.getSuppliers()
    },
    getSuppliers () {
      this.loading = true
      let suppliersCol = []
      firebase.collection('suppliers').get()
        .then(querySnapshot => {
          querySnapshot.forEach(val => {
            const fSupplier = {
              name: val.data().name,
              phone: val.data().phone,
              email: val.data().email,
              skill: val.data().skill,
              city: val.data().city,
              country: val.data().country
            }
            suppliersCol.push(fSupplier)
          })
          this.suppliers = suppliersCol
          console.log(this.suppliers)
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
