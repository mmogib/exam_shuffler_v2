<template>
  <v-navigation-drawer fixed clipped app :permanent="true" width="200">
    <v-list dense>
      <v-list-tile @click="newexam">
        <v-list-tile-action>
          <v-icon>save</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>New</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="open">
        <v-list-tile-action>
          <v-icon>folder</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Open</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="setting">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-subheader class="mt-3 grey--text text--darken-1">Projects</v-subheader>
      <v-list>
        <v-list-tile v-for="project in projects" :key="project._id" @click="loadProject(project)">
          <v-list-tile-action>
            <v-list-tile-content>
              <v-tooltip bottom>
                <v-list-tile-title v-text="project.name" slot="activator"></v-list-tile-title>
                <span>{{project.path}}</span>
              </v-tooltip>
            </v-list-tile-content>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile @click="extend">
          <v-list-tile-action>
            <v-list-tile-content>
              <v-tooltip bottom>
                <v-list-tile-title v-text="'...'" slot="activator"></v-list-tile-title>
                <span>extend</span>
              </v-tooltip>
            </v-list-tile-content>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data: () => ({
    projectsToDisplay: 5
  }),
  computed: {
    projects() {
      const savedProjects = this.$store.getters.getProjects || []
      const projects = savedProjects.sort((a, b) => {
        return a.createdAt >= b.createdAt ? -1 : 1
      })

      return projects.slice(0, this.projectsToDisplay).map((val, index) => {
        const parts = val.name.split(/\\/)
        const nameParts = parts[parts.length - 1].split(".")
        const name = nameParts.slice(0, nameParts.length - 1).join(".")
        return { ...val, name }
      })
    },
    current() {
      return this.$store.getters.getCurrentExam !== null
    },
    displayedMenu() {
      let checks = []
      if (!this.current) {
        checks.push("current")
      }
      return this.items.filter(val => !checks.includes(val.name))
    }
  },
  methods: {
    newexam() {
      this.$router.push({
        name: "loading",
        params: { to: "exam", duration: 2000 }
      })
    },
    open() {
      this.$store.dispatch("setBusy", true)
      this.$store.dispatch("setCurrentExam", null)
      this.$store.dispatch("openExam")
    },
    setting() {
      this.$router.push({ name: "setting" })
    },
    loadProject(project) {
      this.$store.dispatch("loadProject", project.path)
    },
    extend() {
      this.projectsToDisplay = this.projectsToDisplay * 2
    }
  }
}
</script>
