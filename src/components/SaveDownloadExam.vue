<template>
  <v-layout row wrap>
    <v-flex xs6 class="pa-1">
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2} clickable`"
          color="teal lighten-2"
          class="white--text"
          @click="save"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline">Save</div>
              <span>Save this exam to a file</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs6 class="pa-1">
      <v-hover>
        <v-card
          color="purple darken-1"
          class="white--text"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2} clickable`"
          @click="download"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline">Download</div>
              <span>Download the shuffled latex file.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Download</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs6 class="pa-1">
      <v-hover>
        <v-card
          color="purple accent-2"
          class="white--text"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2} clickable`"
          @click="savedefault"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline">Make default</div>
              <span>Save this exam as a default exam</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Make Default</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs6 class="pa-1">
      <v-hover>
        <v-card
          color="green darken-2"
          class="white--text"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2} clickable`"
          @click="startover"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline">Start over</div>
              <span>to start the exam preperation</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Start Over</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12 class="pa-1">
      <v-hover>
        <v-card
          color="deep-purple darken-2"
          class="white--text"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2} clickable`"
          @click="processexam"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline">Process Exam</div>
              <span>to process the exam and preview</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Start Processing</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
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
  watch: {
    latexFile(newValue) {
      if (newValue) {
        this.$store.dispatch("setBusy", true)
        this.$store.dispatch("processLatexFile")
      }
    }
  },
  computed: {
    isBusy() {
      return this.$store.getters.isBusy
    },
    latexFile() {
      return this.$store.getters.getLatexFilename
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
    },
    processexam() {
      this.download()
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>

