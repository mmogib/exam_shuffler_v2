<template>
  <v-tabs centered color="cyan" dark icons-and-text>
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab href="#tab-1">Setting
      <v-icon>settings</v-icon>
    </v-tab>

    <v-tab href="#tab-2">LaTeX
      <v-icon>school</v-icon>
    </v-tab>

    <v-tab href="#tab-3">Questions
      <v-icon>question_answer</v-icon>
    </v-tab>

    <v-tab-item :value="'tab-1'">
      <v-card flat class="pa-2">
        <exam-configuration/>
      </v-card>
    </v-tab-item>
    <v-tab-item :value="'tab-2'">
      <v-card flat class="pa-2">
        <latex/>
      </v-card>
    </v-tab-item>
    <v-tab-item :value="'tab-3'">
      <v-card flat class="pa-2">
        <questions/>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import ExamConfiguration from "@/components/ExamConfiguration.vue"
import Latex from "@/components/Latex.vue"
import Questions from "@/components/Questions.vue"

export default {
  data() {
    return {
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  },
  components: {
    ExamConfiguration,
    Latex,
    Questions
  }
}
</script>