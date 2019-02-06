<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Question</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeIt">{{closeLabel||'Close'}}</v-btn>
              <v-btn color="blue darken-1" flat @click="saveIt">{{saveLabel||'Save'}}</v-btn>
            </v-card-actions>
          </v-flex>
          <v-flex xs12>
            <v-textarea v-model="question.questionBody" box label="Question" auto-grow></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 v-for="i in numOfAnswers" :key="i">
            <v-textarea
              :label="`Option ${i}`"
              :hint="i===1? 'Correct Answer': ''"
              rows="2"
              v-model="options[i-1]"
            ></v-textarea>
            <v-switch :label="`Fix Order`" v-model="pins[i-1]" class="right ma-0 pa-0"></v-switch>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="closeIt">{{closeLabel||'Close'}}</v-btn>
      <v-btn color="blue darken-1" flat @click="saveIt">{{saveLabel||'Save'}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [
    "question",
    "options",
    "pins",
    "numOfAnswers",
    "closeLabel",
    "saveLabel"
  ],
  methods: {
    closeIt() {
      this.$emit("close", this.question)
    },
    saveIt() {
      this.question.options = []
      for (let i = 0; i < this.numOfAnswers; i++) {
        const questionOtion = {
          correct: i === 0,
          text: this.options[i] || "",
          order: i,
          pinned: this.pins[i] || false
        }
        this.question.options.push(questionOtion)
      }
      this.$emit("saveQuestion", this.question)
    }
  }
}
</script>
