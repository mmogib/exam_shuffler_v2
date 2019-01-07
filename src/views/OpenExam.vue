<template>
  <div></div>
</template>

<script>
export default {
  data: () => ({
    opening: true
  }),
  watch: {
    isBusy: function(newVal) {
      if (!newVal) {
        this.$router.push({ name: "current" })
      }
    }
  },
  computed: {
    isBusy() {
      return this.$store.getters.isBusy
    }
  },
  mounted() {
    this.$store.dispatch("setCurrentExam", null)
    this.$store.dispatch("openExam")
  }
}
</script>

<style>
</style>
