<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
  background-image: url('https://bilboblockins.github.io/double/doppel/images/gemini.jpg');
  background-size: contain;
  background-position: center;
  font-size: 17px;
}
@media(max-width: 800px) {
  html, body {
    background-size: cover;
  }
}
#app {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
