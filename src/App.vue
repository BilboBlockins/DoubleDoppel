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
  background-image: url('/images/gemini.jpg');
  background-size: contain;
  background-position: center;
}
@media(max-width: 800px) {
  html, body {
    background-size: cover;
  }
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
