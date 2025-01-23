<script setup>
import { ref, watch } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const getHeadName = ref('')
const getBranchName = ref('')
const getHeadCode = ref('')
const getBranchCode = ref('')
const buttonText = ref('複製代碼')
const urlText = ref('複製此頁面連結')
const emit = defineEmits(['reset-selections'])

const props = defineProps({
  getResultData: {
    type: Object,
  },
})
const fetchResultDetail = async () => {
  const [headName, branchName] = await route.params.orgName.split('-')
  getHeadName.value = headName
  getBranchName.value = branchName
  getHeadCode.value = route.params.headCodeName
  getBranchCode.value = route.params.orgCodeName
}
watch(
  () => route.params.orgName,
  (newVal) => {
    if (newVal) {
      fetchResultDetail()
    }
  },
)
const copyCode = () => {
  navigator.clipboard.writeText(getBranchCode.value).then(() => {
    buttonText.value = '已複製'
    setTimeout(() => (buttonText.value = '複製代碼'), 1000)
  })
}
const copyURL = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    urlText.value = '已複製'
    setTimeout(() => (urlText.value = '複製此頁面連結'), 1000)
  })
}
const clearSearch = () => {
  router.push('/')
  emit('reset-selections')
}
onMounted(async () => {
  await fetchResultDetail()
})
</script>

<template>
  <main>
    <div class="card mx-4">
      <div class="card-body">
        <h5 class="card-title fs-1">{{ getHeadName }}({{ getHeadCode }})</h5>
        <h6 class="card-subtitle fs-3 mb-2 text-body-secondary">{{ getBranchName }}</h6>
        <div v-if="getBranchCode" class="copy-code d-flex align-items-center">
          <p class="card-text fs-5 me-3">分行代碼：{{ getBranchCode }}</p>
          <button type="button" class="btn btn-light" @click="copyCode">{{ buttonText }}</button>
        </div>
        <div v-else class="mt-3"></div>
        <p class="card-text fs-5">地址：{{ props.getResultData.address }}</p>
        <p class="card-text fs-5">電話：{{ props.getResultData.telephone }}</p>
        <p class="gov-link fs-6">
          資料來源：<a href="https://data.gov.tw/dataset/6041">政府資料開放平臺</a>
        </p>
      </div>
    </div>
    <div class="bottom-button-area d-flex px-4 my-3 justify-content-between">
      <button type="button" class="btn btn-success" @click="copyURL">{{ urlText }}</button>
      <button type="button" class="btn btn-outline-secondary" @click="clearSearch">重新查詢</button>
    </div>
  </main>
</template>
<style scoped>
.card {
  background-color: #e4e6d9;
  .card-body {
    color: #273526;
    padding: 10px;
  }
}
.gov-link {
  color: #5e5f5e;
  margin: 5px 0 0 0;
  a {
    text-decoration: none;
    color: #5e5f5e;
  }
}
.card-text {
  margin-bottom: 0;
}
@media (min-width: 768px) {
  .gov-link {
    display: flex;
    justify-content: end;
  }
}
</style>
