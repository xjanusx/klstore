<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          <h1>Catalogue</h1>
        </v-toolbar-title>
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
      <v-flex xs3 v-for="item in items" :key="item.id">
        <v-card class="mb-3 mr-3" @click.native.stop="itemDialog=true" style="cursor: pointer" :hover=true :ripple=true>
          <v-card-media :src="item.imageUrl" height="150px"></v-card-media>
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
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="pink"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-card>
  <!-- Item Dialog -->
  <v-dialog v-model="itemDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Aperçu global de l'article </v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink darken-1" flat="flat" @click.native="itemDialog = false">Modifier</v-btn>
        <v-btn color="pink darken-1" flat="flat" @click.native="itemDialog = false">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      itemDialog: false,
      items: [
        {
          imageUrl:
            'https://www.retif.eu/media/catalog/category/Sac_kraft_poignee_plate_2.jpg',
          id: 'kjsndfoiew8493wwd',
          title: 'Sac Papier Premium',
          description: 'Sac en Papier de qualité Premium'
        },
        {
          imageUrl:
            'http://www.sudemballages.fr/site/images/normal/sac%20personnlise%20%20papier%20kraft%20blanc.jpg',
          id: 'jsd8984932d',
          title: 'Sac Papier Logo',
          description: 'Sac en Papier avec logos et publicité'
        },
        {
          imageUrl:
            'http://www.detailspourinvites.com/32607-thickbox_default/sac-en-papier-d-co.jpg',
          id: 'kddi984849377',
          title: 'Sac en Papier Deco',
          description: 'Sac en Papier décoré'
        },
        {
          imageUrl:
            'http://i2.cdscdn.com/pdt2/5/3/4/1/300x300/auc3700265803534/rw/salon-de-jardin-haut-avec-parasol-manhattan.jpg',
          id: 'wuew9283we',
          title: 'Salon Jardin',
          description: 'Salon complet pour jardin'
        },
        {
          imageUrl:
            'http://i2.cdscdn.com/pdt2/9/5/4/1/300x300/mia4056282421954/rw/parasol-de-jardin-terrasse-deporte-rond-avec-maniv.jpg',
          id: 'uiewuieuw',
          title: 'Parasol de Jardin',
          description: 'Parasol de Jardin ou Terrasse'
        },
        {
          imageUrl:
            'https://img1.etsystatic.com/200/0/13512889/il_340x270.1284844519_8mmy.jpg',
          id: 'sdjdur',
          title: 'Verres Fancy',
          description: 'Verres à Vin personnalisés'
        },
        {
          imageUrl:
            'http://i2.cdscdn.com/pdt2/0/0/8/1/300x300/auc3561864810008/rw/porte-cle-sifflez-c-est-trouv.jpg',
          id: '394nbskjdf',
          title: 'Porte Clés',
          description: 'Porte Clés avec LED et Bippeur'
        },
        {
          imageUrl:
            'http://www.monproduitdecom.com/images/produits/casquettes-6158.jpg',
          id: 'mksd9275',
          title: 'Casquettes avec Logo',
          description: 'Casquettes avec Logo personnalisé'
        }
      ]
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
</style>

