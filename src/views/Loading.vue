<template>
  <loading/>
</template>

<script>
import Loading from "@/components/Loading.vue"
export default {
  props: ["to", "duration"],
  components: {
    Loading
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: this.to })
    }, this.duration || 1000)
  }
}
</script>
