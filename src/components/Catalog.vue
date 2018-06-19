<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          <h1>Catalogue</h1>
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
      <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-spacer></v-spacer>
      <v-flex sm6 right>
        <v-text-field
          name="input-1"
          label="Rechercher"
          :search="search"
          append-icon="search"
        >
        </v-text-field>
      </v-flex>
      </v-flex>
      <v-flex xs12 v-if="loading">
        <v-progress-linear :indeterminate="true" primary></v-progress-linear>
      </v-flex>
      <v-flex xs3 v-for="item in items" :key="item.id">
        <v-card class="mb-3 mr-3" @click.native.stop="viewItem(item)" style="cursor: pointer" :hover=true :ripple=true>
          <v-card-media :src="item.imageUrl" height="150px" contain>
            <v-container fill-height fluid>
            <v-layout fill-height>
            </v-layout>
          </v-container>
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class='headline mb-0'>{{item.title}}</h3>
              <div>
                {{item.description}}
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
    <v-spacer></v-spacer>
  </v-card>
  <!-- Item Dialog -->
  <v-dialog v-model="itemDialog" max-width="800">
    <v-card model="item">
      <v-toolbar flat>
        <v-toolbar-title>
          <h3>{{item.title}}</h3>
        </v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-card-media :src="item.imageUrl" height="400px" contain></v-card-media>
        <v-list>
          <v-list-tile>
          {{item.description}}              
          </v-list-tile>
        </v-list>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink darken-1" flat="flat" @click.native="itemDialog = false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
<!-- Add New Item dialog -->
  <v-dialog v-model="addDialog" persistent max-width="600">
    <v-card>
      <v-toolbar class="pink darken-3" dark>
        <v-toolbar-title>
          Nouvel Article
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
          v-model="item.title"
          :counter="12"
          required
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="item.description"
          required
        ></v-text-field>
        <v-text-field
          label="URL Image"
          v-model="item.imageUrl"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn dark color="blue" @click.native="submit(item)">
          Entrer
        </v-btn>
        <v-btn dark color="grey" @click="addDialog=false">
          Fermer
        </v-btn>
      </v-card-actions>
      </v-card>
  </v-dialog>
  </v-container>
</template>

<script>
import firebase from '../lib/firebase'
export default {
  data () {
    return {
      search: '',
      loading: false,
      itemDialog: false,
      addDialog: false,
      item: {
        id: '',
        imageUrl: '',
        title: '',
        description: ''
      },
      items: []
      // items: [
      //   {
      //     imageUrl:
      //       'https://www.retif.eu/media/catalog/category/Sac_kraft_poignee_plate_2.jpg',
      //     id: 'kjsndfoiew8493wwd',
      //     title: 'Sac Papier Premium',
      //     description: 'Sac en Papier de qualité Premium'
      //   },
      //   {
      //     imageUrl:
      //       'http://www.sudemballages.fr/site/images/normal/sac%20personnlise%20%20papier%20kraft%20blanc.jpg',
      //     id: 'jsd8984932d',
      //     title: 'Sac Papier Logo',
      //     description: 'Sac en Papier avec logos et publicité'
      //   },
      //   {
      //     imageUrl:
      //       'http://www.detailspourinvites.com/32607-thickbox_default/sac-en-papier-d-co.jpg',
      //     id: 'kddi984849377',
      //     title: 'Sac en Papier Deco',
      //     description: 'Sac en Papier décoré'
      //   },
      //   {
      //     imageUrl:
      //       'http://i2.cdscdn.com/pdt2/5/3/4/1/300x300/auc3700265803534/rw/salon-de-jardin-haut-avec-parasol-manhattan.jpg',
      //     id: 'wuew9283we',
      //     title: 'Salon Jardin',
      //     description: 'Salon complet pour jardin'
      //   },
      //   {
      //     imageUrl:
      //       'http://i2.cdscdn.com/pdt2/9/5/4/1/300x300/mia4056282421954/rw/parasol-de-jardin-terrasse-deporte-rond-avec-maniv.jpg',
      //     id: 'uiewuieuw',
      //     title: 'Parasol de Jardin',
      //     description: 'Parasol de Jardin ou Terrasse'
      //   },
      //   {
      //     imageUrl:
      //       'https://img1.etsystatic.com/200/0/13512889/il_340x270.1284844519_8mmy.jpg',
      //     id: 'sdjdur',
      //     title: 'Verres Fancy',
      //     description: 'Verres à Vin personnalisés'
      //   },
      //   {
      //     imageUrl:
      //       'http://i2.cdscdn.com/pdt2/0/0/8/1/300x300/auc3561864810008/rw/porte-cle-sifflez-c-est-trouv.jpg',
      //     id: '394nbskjdf',
      //     title: 'Porte Clés',
      //     description: 'Porte Clés avec LED et Bippeur'
      //   },
      //   {
      //     imageUrl:
      //       'http://www.monproduitdecom.com/images/produits/casquettes-6158.jpg',
      //     id: 'mksd9275',
      //     title: 'Casquettes avec Logo',
      //     description: 'Casquettes avec Logo personnalisé'
      //   }
      // ]
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    viewItem (item) {
      this.itemDialog = true
      this.item.id = item.id
      this.item.imageUrl = item.imageUrl
      this.item.title = item.title
      this.item.description = item.description
    },
    submit (item) {
      item.imageUrl = this.item.imageUrl
      item.title = this.item.title
      item.description = this.item.description
      // item.id = Math.random().toString(36).substring(2)
      firebase.collection('items').add(item)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      console.log(item)
      // this.items.push(item)
      // close dialog
      this.addDialog = false
      this.getItems()
    },
    getItems () {
      this.loading = true
      let itemCol = []
      firebase.collection('items').get()
        .then(response => {
          response.forEach(val => {
            const newItem = {
              id: val.id,
              imageUrl: val.data().imageUrl,
              title: val.data().title,
              description: val.data().description
            }
            itemCol.push(newItem)
            console.log(val.id, ' => ', val.data())
          })
          console.log(itemCol)
          this.items = itemCol
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  -webkit-box-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 2em;
  bottom: 50px;
}
@media (max-width: 990px) {
  .resizeimg {
    height: 150px;
  }
}
</style>

