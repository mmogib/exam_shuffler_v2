<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline">Editing LaTeX document</v-card-title>
          <v-card-text class="px-0">
            Here you can add your own LaTeX packages and finetone the
            different configurations.
            <v-alert
              :value="true"
              color="error"
              icon="error"
              class="text-xs-justify ma-2"
              outline
            >Please do not change any text beteen curly brackets '{{}}'. These are reserved for template configuration.</v-alert>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-expansion-panel v-model="panel" expand>
          <v-expansion-panel-content>
            <div slot="header">Preamble</div>
            <latex-snippet
              :label="'Preamble'"
              :index="0"
              :text="preamble"
              @close="close"
              @save="save"
            />
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Cover Page</div>
            <latex-snippet
              :label="'Cover Page'"
              :index="1"
              :text="coverpage"
              @close="close"
              @save="save"
            />
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Header</div>
            <latex-snippet :label="'Header'" :index="2" :text="header" @close="close" @save="save"/>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Space After Question Body</div>
            <latex-snippet
              :label="'Space After Question Body'"
              :index="3"
              :text="spaceAfterQuestionBody"
              @close="close"
              @save="save"
            />
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <div slot="header">Space Between Questions</div>
            <latex-snippet
              :label="'Space Between Questions'"
              :index="4"
              :text="spaceBetweenQuestions"
              @close="close"
              @save="save"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 class="px-1">
        <v-btn dark color="rgb(2,126,64)" @click="submit">Continue</v-btn>
        <v-btn flat @click="cancel">Clear</v-btn>
        <v-btn flat @click="cancel">Cancel</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LatexSnippet from "@/components/LatexSnippet.vue"
export default {
  props: ["tabindex"],
  data: () => ({
    panel: [],
    preamble: "...",
    coverpage: "...",
    header: "...",
    spaceAfterQuestionBody: ""
  }),
  components: {
    LatexSnippet
  },
  computed: {
    currentExam() {
      return this.$store.getters.getCurrentExam
    },
    snippets() {
      const current = this.$store.getters.getCurrentExam
      const { examPartials } = current
      return examPartials
    }
  },
  methods: {
    submit() {
      this.$emit("nexttab", this.tabindex)
    },
    cancel() {
      this.$emit("cancel")
    },
    closePanel(index) {
      this.panel = this.panel.map((v, i) => (i === index ? false : v))
    },
    close(index) {
      this.closePanel(index)
    },
    save(index, text) {
      this.closePanel(index)
      const current = { ...this.currentExam }
      const examPartials = this.snippets
      switch (index) {
        case 0:
          this.$store.dispatch("setCurrentExam", {
            ...current,
            examPartials: { ...examPartials, preamble: text }
          })
          break
        case 1:
          this.$store.dispatch("setCurrentExam", {
            ...current,
            examPartials: { ...examPartials, coverpage: text }
          })
          break
        case 2:
          this.$store.dispatch("setCurrentExam", {
            ...current,
            examPartials: { ...examPartials, header: text }
          })
          break
        case 3:
          this.$store.dispatch("setCurrentExam", {
            ...current,
            examPartials: { ...examPartials, spaceAfterQuestionBody: text }
          })
          break
        case 4:
          this.$store.dispatch("setCurrentExam", {
            ...current,
            examPartials: { ...examPartials, spaceBetweenQuestions: text }
          })
          break

        default:
          break
      }
    }
  },
  created() {
    const {
      preamble,
      coverpage,
      header,
      spaceAfterQuestionBody,
      spaceBetweenQuestions
    } = this.snippets
    this.preamble = preamble
    this.coverpage = coverpage
    this.header = header
    this.spaceAfterQuestionBody = spaceAfterQuestionBody
    this.spaceBetweenQuestions = spaceBetweenQuestions
  }
}
</script>
