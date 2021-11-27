<template>
  <div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'App',
})
</script>

<style lang="scss">
html{
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgb(30,30,30);
}
</style>
