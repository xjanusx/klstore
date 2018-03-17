<template>
  <v-layout>
    <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar flat class="mb-3">
          <v-toolbar-title>
            Clients
          </v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-flex xs3 v-for="i in 4" :key="i">
        <v-card>
          <v-card-text>Client {{ i }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-3">
        <v-card>
          Autres
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
    }
  }
}
</script>
