<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn slot="activator" small color="green" class="white--text">
        Add new question
        <v-icon dark>add</v-icon>
      </v-btn>

      <question-body
        :options="question.options.map(val=>val.text)"
        :pins="question.options.map(val=>val.pinned)"
        :correctIndex="1"
        :question="question"
        :numOfAnswers="numOfAnswers"
        @saveQuestion="save"
        @close="dialog=false"
      />
    </v-dialog>
  </v-layout>
</template>
<script>
import QuestionBody from "@/components/QuestionBody.vue"
export default {
  props: ["question", "numOfAnswers"],
  components: {
    QuestionBody
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    save(question) {
      this.$emit("addQuestion", question)
      this.dialog = false
    }
  }
}
</script>
/*
export const questionOtion = {
  correct: false,
  text: '',
  order: 0,
  pinned: false
}
export const question = {
  questionBody: '',
  options: [],
  pinned: false
}
 */