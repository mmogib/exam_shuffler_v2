<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Update</v-card-title>

        <v-card-text>
          New update is available. Do you want it to download it?
          .
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="answer(true)">Yes</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="answer(false)">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  computed: {
    dialog() {
      return this.$store.getters.isUpdateAvailable
    }
  },
  methods: {
    answer(yes) {
      this.$store.dispatch("setUpdateAvailable", false)
      if (yes) {
        this.$store.dispatch("downloadUpdate")
      }
    }
  }
}
</script>