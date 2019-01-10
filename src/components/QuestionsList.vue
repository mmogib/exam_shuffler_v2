<template>
  <v-container>
    <div class="d-flex justify-between align-center mb-3">
      <v-btn @click="all">Expand</v-btn>
      <v-btn @click="none">Collapse</v-btn>
    </div>
    <v-layout row wrap>
      <v-flex xs12 mb-3>
        <v-expansion-panel v-model="panel" popout expand>
          <v-expansion-panel-content v-for="(item,i) in questions" :key="i">
            <div slot="header">Question {{i+1}}</div>
            <question-body
              :options="item.options.map(val=>val.text)"
              :pins="item.options.map(val=>val.pinned)"
              :question="item"
              :numOfAnswers="numOfAnswers"
              :closeLabel="'delete'"
              :saveLabel="'Save'"
              @saveQuestion="edit"
              @close="del"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestionBody from "@/components/QuestionBody.vue"

export default {
  props: ["questions", "numOfAnswers"],
  components: {
    QuestionBody
  },
  data: () => ({ panel: [] }),
  methods: {
    del(question) {
      this.panel = this.panel.map((val, i) =>
        i === question.index ? false : val
      )
      this.$emit("del", question)
    },
    edit(question) {
      this.panel = this.panel.map((val, i) =>
        i === question.index ? false : val
      )
      this.$emit("edit", question)
    },
    all() {
      this.panel = this.questions.map(_ => true)
    },
    // Reset the panel
    none() {
      this.panel = []
    }
  }
}
</script>
