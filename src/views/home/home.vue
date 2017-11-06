<template>
  <div class="view-home">
    <img src="../../assets/images/logo.png">
    <hello name="Vue-Typescript" class="hello"></hello>
    <h2>Example</h2>
    <div class="links">
      <ul class="links__wrapper">
        <router-link class="links__item" to="/product">
          Store Example
        </router-link>
        <router-link class="links__item" to="/e404">
          Error 404 Page
        </router-link>
      </ul>
    </div>
  </div>
</template>
<style src="./home.scss" lang="scss" scoped></style>
