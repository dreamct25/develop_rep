<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "allPagesCode",
  data() {
    return {
      test: "My name is jack",
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
a {
  font-weight: bold;
  color: #ffffff !important;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
  transition: 0.5s ease;
  &.router-link-exact-active {
    color: #ff00c8 !important;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  }
}
a:hover {
  text-decoration: none !important;
}
</style>