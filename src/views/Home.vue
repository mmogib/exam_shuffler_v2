<template>
  <v-container align-content-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="font-weight-medium">
          <v-card-title primary-title>
            <div>
              <div class="headline font-weight-bold">Welcome</div>
              <span>
                This app is for creating a LaTeX document of an exam.
                The exam is a multiple-choice exam. The app shuffles
                both the questions and answers.
              </span>
            </div>
          </v-card-title>
          <v-card-actions>
            <p>To have an idea how your exam is going to look, you may</p>

            <v-btn class="ml-2 primary" @click="dowloadTemplate">Download an Example</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <loading v-if="isBusy"/>
      </v-flex>
      <v-flex xs12>
        <v-card v-if="updateMessage">
          <v-card-title class="subheader">Update Message</v-card-title>
          <v-card-text>{{updateMessage}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue"
export default {
  components: {
    Loading
  },
  name: "home",
  computed: {
    updateMessage() {
      return this.$store.getters.getUpdateMessage
    },
    isBusy() {
      return this.$store.getters.isBusy
    }
  },
  methods: {
    dowloadTemplate() {
      this.$store.dispatch("setBusy", true)
      this.$store.dispatch("downloadTemplateExam")
    }
  }
}
</script>

