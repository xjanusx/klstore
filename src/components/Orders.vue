<template>
  <v-layout>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-toolbar flat>
              <v-toolbar-title>
                Commandes
              </v-toolbar-title>
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
          </v-card-title>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <tr @click="select" style="cursor: pointer">
              <!-- <td>{{ props.item.name }}</td> -->
              <td class="text-xs-left"> <img :src="props.item.imageUrl" height="100px" /></td>
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.client }}</td>
              <td class="text-xs-left">{{ props.item.price}}</td>
              <td class="text-xs-left">{{ props.item.quantity}}</td>
              <td class="text-xs-left">{{ props.item.description}}</td>
            </tr>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-card>
        </v-flex>
    </v-layout>
  </v-container>
  </v-layout>
</template>


<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Aperçu', value: 'imageUrl', align: 'left' },
        { text: 'Commande N°', value: 'id', align: 'left' },
        { text: 'Client', value: 'title' },
        { text: 'PU (F CFA)', value: 'price' },
        { text: 'Quantité', value: 'quantity' },
        { text: 'Description', value: 'description' }
      ],
      items: [
        {
          imageUrl:
            'https://www.retif.eu/media/catalog/category/Sac_kraft_poignee_plate_2.jpg',
          id: 'kjsndfoiew8493wwd',
          title: 'Sac Papier Premium',
          description: 'Sac en Papier de qualité Premium',
          price: 1200,
          quantity: 10000,
          client: 'Canal+'
        },
        {
          imageUrl:
            'http://www.sudemballages.fr/site/images/normal/sac%20personnlise%20%20papier%20kraft%20blanc.jpg',
          id: 'jsd8984932d',
          title: 'Sac Papier Logo',
          description: 'Sac en Papier avec logos et publicité',
          price: 640,
          quantity: 1000,
          client: 'BOA Togo'
        },
        {
          imageUrl:
            'http://www.detailspourinvites.com/32607-thickbox_default/sac-en-papier-d-co.jpg',
          id: 'kddi984849377',
          title: 'Sac en Papier Deco',
          description: 'Sac en Papier décoré',
          price: 600,
          quantity: 5000,
          client: 'Togo Telecom'
        },
        {
          imageUrl:
            'http://i2.cdscdn.com/pdt2/5/3/4/1/300x300/auc3700265803534/rw/salon-de-jardin-haut-avec-parasol-manhattan.jpg',
          id: 'wuew9283we',
          title: 'Salon Jardin',
          description: 'Salon complet pour jardin',
          price: 180000,
          quantity: 7,
          client: 'M. Didier'
        },
        {
          imageUrl:
            'http://i2.cdscdn.com/pdt2/9/5/4/1/300x300/mia4056282421954/rw/parasol-de-jardin-terrasse-deporte-rond-avec-maniv.jpg',
          id: 'uiewuieuw',
          title: 'Parasol de Jardin',
          description: 'Parasol de Jardin ou Terrasse',
          price: 9500,
          quantity: 100,
          client: 'Canal+'
        },
        {
          imageUrl:
            'https://img1.etsystatic.com/200/0/13512889/il_340x270.1284844519_8mmy.jpg',
          id: 'sdjdur',
          title: 'Verres Fancy',
          description: 'Verres à Vin personnalisés',
          price: 7500,
          quantity: 500,
          client: 'BOA Togo'
        },
        {
          imageUrl:
            'http://i2.cdscdn.com/pdt2/0/0/8/1/300x300/auc3561864810008/rw/porte-cle-sifflez-c-est-trouv.jpg',
          id: '394nbskjdf',
          title: 'Porte Clés',
          description: 'Porte Clés avec LED et Bippeur',
          price: 350,
          quantity: 1500,
          client: 'INAM'
        },
        {
          imageUrl:
            'http://www.monproduitdecom.com/images/produits/casquettes-6158.jpg',
          id: 'mksd9275',
          title: 'Casquettes avec Logo',
          description: 'Casquettes avec Logo personnalisé',
          price: 400,
          quantity: 1000,
          client: 'GRKKL SARL'
        }
      ]
    }
  },
  methods: {
    select () {
      console.log('Selected')
    }
  }
}
</script>
