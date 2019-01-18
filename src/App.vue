<template>
  <v-app class="font-weight-regular">
    <div>
      <tool-bar/>
      <v-content class="ma-2">
        <router-view/>
      </v-content>
    </div>
    <v-footer dark app>
      <span class="px-3">Dr. Mohammed Alshahrani, Department of Mathematics & Statistics, KFUPM</span>
      <v-spacer></v-spacer>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ToolBar from "@/components/ToolBar.vue"
export default {
  name: "App",
  components: { ToolBar }
}
</script>
