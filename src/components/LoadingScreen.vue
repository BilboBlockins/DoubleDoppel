<template>
  <div>
    <div id="loading-screen" class="loadingScreen">
      <div class="logo">
        <logo/>
      </div>
      <div class="titleText">
        <span class="title1">DOUBLE</span><span class="title2">DOPPEL</span>
      </div>
      <div id="load-message">
        Loading models...
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style scoped>
  #load-message {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-top: 10px;
    font-size: 14px;
    color: #bbb;
  }

</style>