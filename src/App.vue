<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <header>
    <nav class="navbar bg-body-tertiary" style="background-color: #6d8777">
      <div class="container-fluid">
        <a class="navbar-brand" href="http://localhost:5174/">台灣銀行代碼查詢</a>
      </div>
    </nav>
  </header>
  <body>
    <RouterView />
  </body>
</template>
