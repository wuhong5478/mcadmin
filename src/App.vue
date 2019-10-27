<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width:100%
}
p,
h1,
h2,
h3,
h4,
h5{
  margin-block-start: 0em;
  margin-block-end: 0em;
}
#app {
  height: 100%;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
  background: rgb(242, 242, 242);
}
</style>
