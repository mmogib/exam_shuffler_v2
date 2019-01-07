<template>
  <v-stepper v-model="tab">
    <v-stepper-header>
      <v-stepper-step :complete="tab > 1" step="1">{{items[0].name}}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="tab > 2" step="2">{{items[1].name}}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">{{items[2].name}}</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card>
          <component :tabindex="0" @cancel="tab=1" @nexttab="gototab(1)" v-bind:is="items[0].comp"></component>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card>
          <component :tabindex="1" @cancel="tab=1" @nexttab="gototab(2)" v-bind:is="items[1].comp"></component>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card>
          <component :tabindex="0" @cancel="tab=1" @nexttab="gototab(3)" v-bind:is="items[2].comp"></component>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import ExamConfiguration from "@/components/ExamConfiguration.vue"
import SaveDownloadExam from "@/components/SaveDownloadExam.vue"
import Questions from "@/components/Questions.vue"

export default {
  data() {
    return {
      tab: 0,
      items: [
        {
          name: "Configuration",
          icon: "perm_data_setting",
          comp: ExamConfiguration
        },
        { name: "Questions", icon: "question_answer", comp: Questions },
        { name: "Finalize", icon: "school", comp: SaveDownloadExam }
      ]
    }
  },
  methods: {
    gototab(val) {
      this.tab = (val % this.items.length) + 1
    }
  },
  created() {
    const currentExam = this.$store.getters.getCurrentExam
    const { exam = null } = currentExam || {
      exam: null
    }
    if (exam === null) {
      this.$router.push({ name: "home" })
    }
  }
}
</script>