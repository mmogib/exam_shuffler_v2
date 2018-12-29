<template>
  <div>
    <v-toolbar dense flat app dark color="rgb(2,126,64)">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Exam Shuffler</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed dark color="rgp(222,205,106)" @click="gotoexam">
        <span class="mr-2">New Exam</span>
      </v-btn>
    </v-toolbar>
    <Drawer :drawer="true"/>
  </div>
</template>

<script>
import Drawer from "./Drawer"
export default {
  components: {
    Drawer
  },
  methods: {
    gotoexam() {
      const exam = this.$store.getters.getDefaultExam
      this.$store.dispatch("setCurrentExam", exam)
      this.$router.push({ name: "exam" })
    }
  }
}
</script>

<style>
</style>
