<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="page-container">
    <header>
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="https://taiwan-bank.vercel.app/" style="color: white"
            >台灣銀行代碼查詢</a
          >
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <nav class="navbar ps-2">
        <div class="container-fluid">
          <a class="navbar-brand fs-6" href="https://github.com/h-e-l-e-n" style="color: white"
            >powered by h-e-l-e-n</a
          >
        </div>
      </nav>
    </footer>
  </div>
</template>
<style>
.page-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
}
main {
  flex-grow: 1;
}
.navbar {
  background-color: #6d8777;
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
