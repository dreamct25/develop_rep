<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html {
  box-shadow: inset 0 0 4000px 2000px rgba(0, 0, 0, 0.7);
  background-image: url("https://unsplash.com/photos/LUpDjlJv4_c/download?force=true&w=1920");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
body {
  background-color: transparent !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
