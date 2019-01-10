<template>
  <form>
    <v-text-field
      v-model="Term"
      :error-messages="TermErrors"
      label="Term"
      required
      @input="$v.Term.$touch()"
      @blur="$v.Term.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="courseCode"
      :error-messages="courseCodeErrors"
      label="Course Code"
      required
      @input="$v.courseCode.$touch()"
      @blur="$v.courseCode.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="examTitle"
      :error-messages="examTitleErrors"
      label="Exam Title"
      required
      @input="$v.examTitle.$touch()"
      @blur="$v.examTitle.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="examDate"
      :error-messages="examDateErrors"
      label="Exam Date"
      required
      @input="$v.examDate.$touch()"
      @blur="$v.examDate.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="TimeAllowed"
      :error-messages="TimeAllowedErrors"
      label="Time Allowed"
      required
      @input="$v.TimeAllowed.$touch()"
      @blur="$v.TimeAllowed.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="numOfVersions"
      :error-messages="numOfVersionsErrors"
      label="Number of Versions"
      required
      type="number"
      @input="$v.numOfVersions.$touch()"
      @blur="$v.numOfVersions.$touch()"
    ></v-text-field>
    <v-layout row wrap>
      <v-flex xs12 class="px-1">
        <v-btn dark color="rgb(2,126,64)" @click="submit">Continue</v-btn>
        <v-btn flat @click="clear">Clear</v-btn>
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
import moment from "moment"
import { validationMixin } from "vuelidate"
import {
  required,
  maxLength,
  integer,
  minValue
} from "vuelidate/lib/validators"

export default {
  mixins: [validationMixin],

  validations: {
    Term: { required },
    courseCode: { required },
    examTitle: { required },
    examDate: { required },
    TimeAllowed: { required },
    numOfVersions: { integer, minValue: minValue(1) }
  },
  props: ["tabindex"],
  data: () => ({
    currentExam: null,
    exam: null,
    Term: "",
    courseCode: "",
    examTitle: "",
    examDate: moment(new Date()).format("dddd D/M/YYYY"),
    TimeAllowed: "",
    numOfVersions: 0
  }),
  computed: {
    TermErrors() {
      const errors = []
      if (!this.$v.Term.$dirty) return errors
      !this.$v.Term.required && errors.push("Term is required.")
      return errors
    },
    courseCodeErrors() {
      const errors = []
      if (!this.$v.courseCode.$dirty) return errors
      !this.$v.courseCode.required && errors.push("Course is required.")
      return errors
    },
    examTitleErrors() {
      const errors = []
      if (!this.$v.examTitle.$dirty) return errors
      !this.$v.examTitle.required && errors.push("Exam Title is required.")
      return errors
    },
    examDateErrors() {
      const errors = []
      if (!this.$v.examDate.$dirty) return errors
      !this.$v.examDate.required && errors.push("Exam Date is required.")
      return errors
    },
    TimeAllowedErrors() {
      const errors = []
      if (!this.$v.TimeAllowed.$dirty) return errors
      !this.$v.TimeAllowed.required && errors.push("Time Allowed is required.")
      return errors
    },
    numOfVersionsErrors() {
      const errors = []
      if (!this.$v.numOfVersions.$dirty) return errors
      if (!this.$v.numOfVersions.integer || !this.$v.numOfVersions.minValue) {
        errors.push("Number of Versions must be an integer greater than 1")
      }
      return errors
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.setCurrentExam()
        const { exam } = this.currentExam
        this.exam = exam
        const config = {
          Term: this.Term,
          courseCode: this.courseCode,
          examTitle: this.examTitle,
          examDate: this.examDate,
          TimeAllowed: this.TimeAllowed,
          numOfVersions: this.numOfVersions
        }
        this.exam = { ...this.exam, config: { ...this.exam.config, ...config } }
        this.currentExam = { ...this.currentExam, exam: this.exam }
        this.$store.dispatch("setCurrentExam", this.currentExam)
        this.$emit("nexttab", this.tabindex)
      }
    },
    cancel() {
      this.$emit("cancel")
    },
    clear() {
      this.$v.$reset()
    },
    setCurrentExam() {
      this.currentExam = this.$store.getters.getCurrentExam
    },
    setExam() {
      this.setCurrentExam()
      const { exam } = this.currentExam
      this.exam = exam
      const {
        Term,
        courseCode,
        examTitle,
        examDate,
        TimeAllowed,
        numOfVersions
      } = exam.config
      this.Term = Term
      this.TimeAllowed = TimeAllowed
      this.courseCode = courseCode
      this.examTitle = examTitle
      this.numOfVersions = numOfVersions
    }
  },
  created() {
    this.setExam()
  }
}
</script>