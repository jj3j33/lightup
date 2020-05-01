<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;500;700;900&display=swap');

html, body, #app {
  padding: 0;
  margin: 0;
  
  
}
html {
  height: 100%;
}
body{
  min-height: 100%;
  background-color: #f1eeb1;
  font-family: 'Noto Sans TC', sans-serif;
  // font-family: 'Noto Serif TC', serif;
}
</style>
