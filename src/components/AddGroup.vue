<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" small color="primary">Add Group
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add Group</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 offset-xs3>
                <v-text-field type="number" v-model="numofq" label="Number of questions" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    numofq: 1
  }),
  methods: {
    save() {
      this.$emit("newgroup", this.numofq)
      this.dialog = false
    }
  }
}
</script>