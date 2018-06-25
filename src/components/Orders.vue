<template>
  <v-layout>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>
              <h1>Commandes</h1>
            </v-toolbar-title>
            <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
              @click="addDialog=true"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
            <v-spacer></v-spacer>   
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
        <v-data-table
          :headers="headers"
          :items="orders"
          :search="search"
          :loading="loading"
        >
          <template slot="items" slot-scope="props">
            <tr @click="select(props.item)" style="cursor: pointer">
              <!-- <td>{{ props.item.name }}</td> -->
              <td class="text-xs-left"> <img :src="props.item.imageUrl" height="100px" contain/></td>
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.client }}</td>
              <td class="text-xs-left">{{ props.item.price}}</td>
              <td class="text-xs-left">{{ props.item.quantity}}</td>
              <td class="text-xs-left">{{ props.item.description}}</td>
              <td class="text-xs-left">{{ props.item.date}}</td>
            </tr>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>w
        </v-data-table>
      </v-card>
        </v-flex>
    </v-layout>
  </v-container>
  <!-- Order Dialog -->
    <v-dialog v-model="orderDialog" 
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable >
        <v-container fluid>
        <v-card>
          <v-tabs
            color="pink-lighten"
            dark
            slider-color="white"
          >
            <v-tab v-for="tab in tabs" :key="tab.id" ripple>
              {{ tab.title }}
            </v-tab>
            <v-tab-item
              v-for="n in 3"
              :key="n"
            >
        <v-card v-model="order">
        <v-toolbar flat>
          <h1>
           {{order.title}}
          </h1>
          <v-spacer></v-spacer>
          <v-btn
            dark
            fab
            top
            right
            color="pink"
            @click="orderDialog=false"
          >
            <v-icon>close</v-icon>
         </v-btn>
        </v-toolbar>
        <v-container>
            <v-card-media :src="order.imageUrl" height="300px" contain background-color="grey lighten-5"></v-card-media>
            <v-divider></v-divider>
            <v-list>
              <v-list-tile>
              <h1><b>Client: </b> {{order.client}} </h1>
              </v-list-tile>
              <v-list-tile>
              <b>N°: </b> {{order.id}}            
              </v-list-tile>
              <v-list-tile>
              <b>Quantité demandée: </b> {{order.quantity}}              
              </v-list-tile>
              <v-list-tile>
              <b>Prix Unitaire: </b> {{order.price}}              
              </v-list-tile>
              <v-list-tile>
              <b>Description: </b> {{order.description}}              
              </v-list-tile>
            </v-list>
          </v-container>
          </v-card>
          </v-tab-item>
         </v-tabs>
      </v-card>
      </v-container>
    </v-dialog>  
    <!-- Add New Order dialog -->
  <v-dialog v-model="addDialog" persistent max-width="600">
    <v-card>
      <v-toolbar class="pink darken-3" dark>
        <v-toolbar-title>
          Nouvelle Commande
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <!-- <v-text-field
          label="ID (will be auto-generated with a DB)"
          v-model="id"
          :counter="9"
          required
        ></v-text-field> -->
        <v-text-field 
          label="Titre (12 max)"
          v-model="order.title"
          :counter="12"
          required
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="order.description"
          required
        ></v-text-field>
        <v-text-field
          label="Echéance"
          v-model="order.date"
          required
        ></v-text-field>
        <v-text-field
          label="Quantité"
          v-model="order.quantity"
          required
        ></v-text-field>
        <v-text-field
          label="Client"
          v-model="order.client"
          required
        ></v-text-field>
        <v-text-field
          label="Prix unitaire"
          v-model="order.price"
          required
        ></v-text-field>
        <v-text-field
          label="URL Image"
          v-model="order.imageUrl"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn dark color="blue" @click.native="addOrder(order)">
          Entrer
        </v-btn>
        <v-btn dark color="grey" @click="addDialog=false">
          Fermer
        </v-btn>
      </v-card-actions>
      </v-card>
  </v-dialog>
  </v-layout>
</template>


<script>
import firebase from '../lib/firebase'
export default {
  data () {
    return {
      orderDialog: false,
      addDialog: false,
      loading: false,
      search: '',
      headers: [
        { text: 'Aperçu', value: 'imageUrl', align: 'left' },
        { text: 'Commande N°', value: 'id', align: 'left' },
        { text: 'Article', value: 'title' },
        { text: 'Client', value: 'client' },
        { text: 'PU (F CFA)', value: 'price' },
        { text: 'Quantité', value: 'quantity' },
        { text: 'Description', value: 'description' },
        { text: 'Echéance', value: 'date' }
      ],
      order: {
        imageUrl: '',
        id: '',
        title: '',
        description: '',
        price: '',
        quantity: '',
        client: '',
        date: ''
      },
      orders: [],
      tabs: [
        { id: 1, title: 'Description' },
        { id: 2, title: 'Détails Techniques' },
        { id: 3, title: 'Facturation' }
      ]
    }
  },
  created () {
    this.getOrders()
  },
  methods: {
    select (order) {
      this.orderDialog = true
      this.order.id = order.id
      this.order.imageUrl = order.imageUrl
      this.order.client = order.client
      this.order.title = order.title
      this.order.description = order.description
      this.order.date = order.date
      this.order.price = order.price
      this.order.quantity = order.quantity
    },
    getOrders () {
      this.loading = true
      let orderCol = []
      firebase.collection('orders').get()
        .then(response => {
          response.forEach(val => {
            const newOrder = {
              id: val.id,
              imageUrl: val.data().imageUrl,
              title: val.data().title,
              client: val.data().client,
              date: val.data().date,
              price: val.data().price,
              quantity: val.data().quantity,
              description: val.data().description
            }
            orderCol.push(newOrder)
            console.log(val.id, ' => ', val.data())
          })
          console.log(orderCol)
          this.orders = orderCol
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    addOrder (newOrder) {
      // order.imageUrl = this.order.imageUrl
      // order.title = this.order.title
      // order.description = this.order.description
      // item.id = Math.random().toString(36).substring(2)
      firebase.collection('orders').add(newOrder)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      console.log(newOrder)
      // this.items.push(item)
      // close dialog
      this.addDialog = false
      this.getOrders()
    }
  }
}
</script>