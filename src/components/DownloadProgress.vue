<template>
  <v-progress-linear v-model="value" :active="show" :indeterminate="query" :query="true"></v-progress-linear>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      query: false,
      show: true,
      interval: 0
    }
  },

  mounted() {
    this.queryAndIndeterminate()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.queryAndIndeterminate()
  },
  methods: {
    queryAndIndeterminate() {
      const {
        rate,
        percent,
        transferred,
        total
      } = this.$store.getters.getDownloadObject
      this.show = true
      this.value = 0

      this.interval = setInterval(() => {
        if (this.value >= 100) {
          clearInterval(this.interval)
          this.show = false
        }
        this.value += 2
      }, 1000)
    }
  }
}
</script>