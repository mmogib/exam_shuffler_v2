<template>
  <form>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-text-field :value="numOfQuestions" disabled label="Number of Questions"></v-text-field>
      </v-flex>
      <add-question :question="question" :numOfAnswers="numOfAnswers" @addQuestion="addQuestion"/>
      <v-flex xs12 md6>
        <v-text-field
          v-model="numOfAnswers"
          :error-messages="numOfAnswersErrors"
          label="Number of Answers"
          required
          type="number"
          @input="$v.numOfAnswers.$touch()"
          @blur="$v.numOfAnswers.$touch()"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <h4>Grouping Exam questions</h4>
        <p>This is used to randomize your questions in groups.</p>
      </v-flex>
      <v-flex xs12>
        <questions-list
          :questions="questions"
          :numOfAnswers="numOfAnswers"
          @del="delQuestion"
          @edit="editQuestion"
        />
      </v-flex>
      <v-flex xs12>
        <add-group v-if="numOfQuestions>0" @newgroup="addnewgroup"/>
      </v-flex>
      <v-flex xs12>
        <group-list :examGroups="examGroups" :groupsError="groupsError" @removegroup="removegroup"/>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md6 class="px-1">
        <v-btn dark color="rgb(2,126,64)" @click="submit">Continue</v-btn>
        <v-btn flat @click="clear">Clear</v-btn>
        <v-btn flat @click="cancel">Cancel</v-btn>
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { integer, minValue } from "vuelidate/lib/validators"

import AddGroup from "@/components/AddGroup.vue"
import AddQuestion from "@/components/AddQuestion.vue"
import QuestionsList from "@/components/QuestionsList.vue"
import GroupList from "@/components/GroupList.vue"
/*
const code = {
  settings,
  config,
  questions: [],
  master: false,
  versionName: "",
  numOfPages: 0
}
*/
export default {
  mixins: [validationMixin],

  validations: {
    numOfAnswers: { integer, minValue: minValue(1) }
  },
  components: {
    AddGroup,
    QuestionsList,
    AddQuestion,
    GroupList
  },
  props: ["tabindex"],
  data: () => ({
    numOfAnswers: 0,
    questions: [],
    question: {
      index: 0,
      questionBody: "",
      options: [],
      pinned: false
    },
    examGroups: [],
    groupsError: false,
    saving: false
  }),
  watch: {
    currentExam(newVal) {
      this.setExam()
    }
  },
  computed: {
    setting() {
      return this.$store.getters.getSetting
    },
    numOfQuestions() {
      return this.questions.length
    },
    currentExam() {
      return this.$store.getters.getCurrentExam
    },
    exam() {
      const current = this.$store.getters.getCurrentExam
      return current.exam
    },
    numOfAnswersErrors() {
      const errors = []
      if (!this.$v.numOfAnswers.$dirty) return errors
      if (!this.$v.numOfAnswers.integer || !this.$v.numOfAnswers.minValue) {
        errors.push("Number of Answers must be an integer greater than 1")
      }
      return errors
    }
  },
  methods: {
    delQuestion(question) {
      const qs = this.questions
      this.questions = []
      this.questions = qs.filter(val => val.index !== question.index)
    },
    editQuestion(question) {
      this.questions[question.index] = question
    },
    addQuestion(q) {
      const index = this.questions.length
      this.questions.push({ ...q, index })
    },
    nameExamGroups(groups) {
      return groups.map((val, ind) => ({
        name: `Group ${ind + 1}`,
        noq: val.noq || val
      }))
    },
    removegroup(index) {
      this.groupsError = false
      let groups = this.examGroups.filter((val, ind) => ind !== index)
      this.examGroups = this.nameExamGroups(groups)
    },
    addnewgroup(value) {
      this.groupsError = false
      const val = parseInt(value)
      let numOfGroups = this.examGroups.length + 1
      this.examGroups.push({ name: `Group ${numOfGroups}`, noq: val })
    },
    submit() {
      this.groupsError = false
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const qs = parseInt(this.numOfQuestions)
        if (this.examGroups.length === 0) {
          this.addnewgroup(qs)
        }

        const qsgrouped = this.examGroups.reduce(
          (a, b) => parseInt(a) + parseInt(b.noq),
          0
        )
        if (qs !== qsgrouped || qs === 0) {
          this.groupsError = true
          this.saving = true
          setTimeout(() => (this.saving = false), 4000)
        } else {
          const exam = this.getExam()
          const config = {
            ...exam.config,
            numOfQuestions: this.numOfQuestions,
            numOfAnswers: this.numOfAnswers,
            examGroups: this.examGroups
          }
          let codes = []
          codes.push({
            settings: this.setting,
            config,
            questions: this.questions,
            master: true,
            versionName: "MASTER",
            numOfPages: Math.ceil(this.questions.length / 2)
          })
          const examToSave = {
            exam: { ...exam, codes, config }
          }
          const currentExam = { ...this.getCurrentExam(), ...examToSave }
          this.$store.dispatch("setCurrentExam", currentExam)
          this.$emit("nexttab", this.tabindex)
        }
      }
    },
    cancel() {
      this.$emit("cancel")
    },
    clear() {
      this.$v.$reset()
    },
    getCurrentExam() {
      const currentExam = this.$store.getters.getCurrentExam
      return currentExam
    },
    getExam() {
      const currentExam = this.getCurrentExam()
      const { exam } = currentExam
      return exam
    },
    setExam() {
      const exam = this.getExam()
      const { numOfQuestions, numOfAnswers, examGroups } = exam.config
      const { codes } = exam
      if (codes.length > 0) {
        this.questions = codes[0]["questions"]
      }
      this.numOfAnswers = numOfAnswers
      this.examGroups = examGroups
    }
  },
  created() {
    this.setExam()
  }
}
</script>