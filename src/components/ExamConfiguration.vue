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
    <v-menu v-model="menu1" :close-on-content-click="false" full-width max-width="290">
      <v-text-field
        slot="activator"
        :value="formattedExamDate"
        :error-messages="examDateErrors"
        clearable
        label="Exam Date"
        @input="$v.examDate.$touch()"
        @blur="$v.examDate.$touch()"
      ></v-text-field>
      <v-date-picker v-model="examDate" @change="menu1 = false"></v-date-picker>
    </v-menu>
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
      <v-flex xs12 md6>
        <v-text-field
          v-model="numOfQuestions"
          :error-messages="numOfQuestionsErrors"
          label="Number of Questions"
          required
          type="number"
          @input="$v.numOfQuestions.$touch()"
          @blur="$v.numOfQuestions.$touch()"
        ></v-text-field>
      </v-flex>
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
    </v-layout>
    <add-group v-if="numOfQuestions>0" @newgroup="addnewgroup"/>
    <v-layout row wrap>
      <v-flex xs12>
        <v-alert
          :value="examGroupsHasError"
          color="error"
          icon="warning"
          outline
          dismissible
        >All questions have been groupd. you cann't add more groups</v-alert>
      </v-flex>
    </v-layout>
    <v-container fluid grid-list-sm>
      <v-layout row wrap align-content-start>
        <v-flex sm6 v-for="(g, ind) in examGroups" :key="ind">
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title class="green white--text">{{ g.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ g.noq }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>
                  <v-btn
                    @click="removelast"
                    v-if="ind===(examGroups.length-1)"
                    flat
                    icon
                    color="red"
                  >
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex>
          <v-list>
            <v-list-tile-content v-if="examGroups.length===0">
              <p>All in one group</p>
            </v-list-tile-content>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 class="px-1">
        <v-btn dark color="rgb(2,126,64)" block @click="submit">submit</v-btn>
      </v-flex>
      <v-flex xs12 md6 class="px-1">
        <v-btn dark color="rgb(2,126,64)" block @click="clear">clear</v-btn>
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

import AddGroup from "@/components/AddGroup.vue"
import { setTimeout } from "timers"

export default {
  mixins: [validationMixin],

  validations: {
    Term: { required },
    courseCode: { required },
    examTitle: { required },
    examDate: { required },
    TimeAllowed: { required },
    numOfVersions: { integer, minValue: minValue(1) },
    numOfQuestions: { integer, minValue: minValue(1) },
    numOfAnswers: { integer, minValue: minValue(1) }
  },
  components: {
    AddGroup
  },
  data: () => ({
    Term: "",
    courseCode: "",
    examTitle: "",
    examDate: new Date().toISOString().substr(0, 10),
    menu1: false,
    TimeAllowed: "",
    numOfVersions: 1,
    numOfQuestions: 4,
    numOfAnswers: 0,
    examGroups: [],
    examGroupsHasError: false
  }),
  watch: {
    numOfQuestions: function() {
      this.examGroups = []
    }
  },
  computed: {
    formattedExamDate() {
      return this.examDate ? moment(this.examDate).format("dddd, D/M/YYYY") : ""
    },
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
    },
    numOfQuestionsErrors() {
      const errors = []
      if (!this.$v.numOfQuestions.$dirty) return errors
      if (!this.$v.numOfQuestions.integer || !this.$v.numOfQuestions.minValue) {
        errors.push("Number of Questions must be an integer greater than 1")
      }
      return errors
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
    removelast() {
      this.examGroupsHasError = false
      const lastone = this.examGroups.pop()
      if (this.examGroups.length >= 1) {
        const newnoq =
          this.examGroups[this.examGroups.length - 1]["noq"] + lastone["noq"]
        this.examGroups[this.examGroups.length - 1] = {
          ...this.examGroups[this.examGroups.length - 1],
          noq: newnoq
        }
      }
    },
    addnewgroup(value) {
      const groups = [...this.examGroups]
      this.examGroupsHasError = false
      const numOfQuestions = this.numOfQuestions
      const questionsGrouped =
        this.examGroups.length === 0
          ? 0
          : this.examGroups.reduce((a, b) => a + parseInt(b.noq, 10), 0)

      const remainingQuestions = numOfQuestions - questionsGrouped
      if (questionsGrouped >= numOfQuestions) {
        this.examGroupsHasError = true
      } else {
        const noq = Math.min(remainingQuestions, value)
        groups.push({ noq })
        this.examGroups = groups.map((val, index) => ({
          ...val,
          name: `Group ${index + 1}`
        }))
      }
    },
    submit() {
      this.$v.$touch()
    },
    clear() {
      this.$v.$reset()
      this.select = null
      this.checkbox = false
    },
    setExam() {
      const { exam = null } = this.$store.getters.getCurrentExam || {
        exam: null
      }
      if (exam === null) {
        this.$router.push({ name: "home" })
      } else {
        const {
          Term,
          courseCode,
          examTitle,
          examDate,
          TimeAllowed,
          numOfVersions,
          numOfQuestions,
          numOfAnswers,
          examGroups
        } = exam.config
        this.Term =
          new Date()
            .getFullYear()
            .toString()
            .substr(2, 2) + "1"
        this.TimeAllowed = TimeAllowed
        this.courseCode = courseCode
        this.examDate = examDate
        this.examGroups = []
        this.examTitle = examTitle
        this.numOfAnswers = numOfAnswers
        this.numOfQuestions = numOfQuestions
        this.numOfVersions = numOfVersions
      }
    }
  },
  created() {
    this.setExam()
  }
}
</script>