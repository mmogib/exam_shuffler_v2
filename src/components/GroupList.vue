<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex sm6 v-for="(g, ind) in examGroups" :key="ind">
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ g.name }} ({{ g.noq }} questions)</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>
                <v-btn @click="removelast(ind)" flat icon color="red">
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
      <v-flex xs12 class="px-1">
        <v-alert
          :value="groupsError"
          color="error"
          icon="warning"
          outline
        >Number of questions grouped must match number of questions</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["examGroups", "groupsError"],
  methods: {
    removelast(index) {
      this.$emit("removegroup", index)
    }
  }
}
</script>

<style>
</style>
