<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <header>
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="https://taiwan-bank.vercel.app/">台灣銀行代碼查詢</a>
      </div>
    </nav>
  </header>
  <body>
    <RouterView />
  </body>
  <footer>
    <nav class="navbar ps-2">
      <div class="container-fluid">
        <a class="navbar-brand fs-6" href="https://github.com/h-e-l-e-n">powered by h-e-l-e-n</a>
      </div>
    </nav>
  </footer>
</template>
<style>
.navbar {
  background-color: #6d8777;
}
.navbar-brand {
  color: white;
}
.container-fluid {
  justify-content: center !important;
}
@media (min-width: 768px) {
  header .container-fluid:first-of-type {
    justify-content: left !important;
    margin-left: 10px;
  }
}
</style>
