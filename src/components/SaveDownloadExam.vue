<template>
  <v-layout row wrap>
    <v-flex xs6 class="pa-1">
      <v-card color="teal lighten-2" class="white--text">
        <v-card-title primary-title>
          <div>
            <div class="headline">Save</div>
            <span>Save this exam to a file</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs6 class="pa-1">
      <v-card color="purple darken-1" class="white--text">
        <v-card-title primary-title>
          <div>
            <div class="headline">Download</div>
            <span>Download the shuffled latex file.</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark @click="download">Download</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs6 class="pa-1">
      <v-card color="purple accent-2" class="white--text">
        <v-card-title primary-title>
          <div>
            <div class="headline">Make default</div>
            <span>Save this exam as a default exam</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark @click="savedefault">Make Default</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs6 class="pa-1">
      <v-card color="green darken-2" class="white--text">
        <v-card-title primary-title>
          <div>
            <div class="headline">Start over</div>
            <span>to start the exam preperation</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark @click="startover">Start Over</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 class="pa-1">
      <loading v-if="isBusy"/>
    </v-flex>
  </v-layout>
</template>
<script>
import Loading from "@/components/Loading.vue"
export default {
  props: ["tabindex"],
  components: {
    Loading
  },
  computed: {
    isBusy() {
      return this.$store.getters.isBusy
    }
  },
  methods: {
    save() {
      this.$store.dispatch("setBusy", true)
      this.$store.dispatch("saveCurrentExam")
    },
    download() {
      this.$store.dispatch("setBusy", true)
      this.$store.dispatch("downloadExam")
    },
    savedefault() {
      this.$store.dispatch("setBusy", true)
      this.$store.dispatch("saveAsDefaultExam")
    },
    startover() {
      this.$emit("nexttab", this.tabindex)
    }
  }
}
</script>

