<template>
  <v-container fluid grid-list-xs>
    <v-textarea v-model="snippet" box :label="label||''" rows="10"></v-textarea>
    <v-btn color="blue darken-1" flat @click="closeIt">Close</v-btn>
    <v-btn color="blue darken-1" flat @click="saveIt">Save</v-btn>
  </v-container>
</template>
<script>
export default {
  props: ["label", "text", "index"],
  data: () => ({ snippet: "" }),
  methods: {
    closeIt() {
      this.$emit("close", this.index)
    },
    saveIt() {
      this.$emit("save", this.index, this.snippet)
    }
  },
  created() {
    this.snippet = this.text
  }
}
</script>

