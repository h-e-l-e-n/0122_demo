<script setup></script>

<template>
  <main>
    <div class="card mx-5">
      <div class="card-body">
        <h5 class="card-title fs-1">台灣銀行(000)</h5>
        <h6 class="card-subtitle fs-3 mb-2 text-body-secondary">中正分行</h6>
        <div class="copy-code d-flex align-items-center">
          <p class="card-text fs-5 me-3">分行代碼：012345</p>
          <button type="button" class="btn btn-light" @click="copyCode">複製</button>
        </div>
        <p class="card-text fs-5">地址：</p>
        <p class="card-text fs-5">電話：</p>
        <span class="gov-link fs-6 mt-2">
          資料來源：<a href="httspans://data.gov.tw/dataset/6041">政府資料開放平臺</a>
        </span>
      </div>
    </div>
    <div class="bottom-button-area d-flex px-5 my-3 justify-content-between">
      <button type="button" class="btn btn-success" @click="copyURL">複製目前網址</button>
      <button type="button" class="btn btn-outline-secondary" @click="clearSearch">重新查詢</button>
    </div>
  </main>
</template>
<style scoped>
.card {
  background-color: #e4e6d9;
  .card-body {
    color: #273526;
  }
}
.gov-link {
  color: #5e5f5e;
  a {
    text-decoration: none;
    color: #5e5f5e;
  }
}
.card-text {
  margin-bottom: 0;
  /* line-height: 2; */
}
@media (min-width: 768px) {
  .gov-link {
    display: flex;
    justify-content: end;
  }
}
</style>
