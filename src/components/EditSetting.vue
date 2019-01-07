<template>
  <form>
    <v-container align-content-start>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="university"
            :error-messages="universityErrors"
            label="University"
            required
            @input="$v.university.$touch()"
            @blur="$v.university.$touch()"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="department"
            :error-messages="departmentErrors"
            label="Department"
            required
            @input="$v.department.$touch()"
            @blur="$v.department.$touch()"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="save" color="success" :loading="isBusy">Save</v-btn>
          <v-btn @click="clear" color="orange">Clear</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"

export default {
  mixins: [validationMixin],

  validations: {
    university: { required },
    department: { required }
  },

  data: () => ({
    university: "",
    department: ""
  }),

  computed: {
    universityErrors() {
      const errors = []
      if (!this.$v.university.$dirty) return errors
      !this.$v.university.required && errors.push("University is required.")
      return errors
    },
    departmentErrors() {
      const errors = []
      if (!this.$v.department.$dirty) return errors
      !this.$v.department.required && errors.push("Department is required")
      return errors
    },
    isBusy() {
      return this.$store.getters.isBusy
    }
  },
  methods: {
    save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const setting = {
          University: this.university,
          Department: this.department
        }
        this.$store.dispatch("setBusy", true)
        this.$store.dispatch("saveSetting", setting)
      }
    },
    clear() {
      this.$v.$reset()
      this.university = ""
      this.department = ""
    }
  },
  created() {
    const { University, Department } = this.$store.getters.getSetting
    this.university = University
    this.department = Department
  }
}
</script>