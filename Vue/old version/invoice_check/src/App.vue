<template>
  <div>
    <h1>統一發票開獎號碼</h1>
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
  background-image: url("https://unsplash.com/photos/UX-mCYFC1cA/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjM4MDkxOTc2&force=true&w=1920");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  transition: .7s ease;
  body{
    margin: 0;
    h1{
      position: relative;
      z-index: 2;
      font-size: 45px;
      color: white;
      text-align: center;
      margin: 25px 0;
      text-shadow: 0 1px 1px rgba(0,0,0,.7);
    }
  }
}
html::after{
  content:'';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(60,60,60,.3);
  backdrop-filter: blur(8px);
}
</style>
