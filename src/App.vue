<template>
  <v-app>
    <div>
      <tool-bar/>
      <v-content class="ma-2">
        <router-view/>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import ToolBar from "@/components/ToolBar.vue"
export default {
  name: "App",
  components: { ToolBar }
}
</script>
