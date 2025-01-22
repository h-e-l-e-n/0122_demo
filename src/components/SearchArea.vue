<script setup>
import { onMounted, ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'

const allBanksData = ref([])
const allBanksOptions = ref([])
const allBranchOptions = ref([])
const selectedBankOption = ref('')
const selectedBranchOption = ref('')
const bankPlaceholder = ref('')
const branchPlaceholder = ref('')
const numberPart = ref('')
const ChinesePart = ref('')
const fetchAllBanksData = async () => {
  const response = await fetch('/data/banks_detail.json')
  const resInJson = await response.json()
  allBanksData.value = resInJson
  const getAllHead = allBanksData.value.reduce((acc, cv) => {
    if (!acc.some((bank) => bank.headCodeName === cv.headCodeName)) {
      acc.push({ headCodeName: cv.headCodeName, orgName: cv.orgName })
    }
    return acc
  }, [])
  allBanksOptions.value = getAllHead.map((bank) => `${bank.headCodeName} ${bank.orgName}`)
}
const fetchAllBranchData = (bank) => {
  const splitName = bank.match(/^(\S+)\s+([\u4e00-\u9fa5]+.+)$/)
  numberPart.value = splitName[1]
  ChinesePart.value = splitName[2]
  const findAllBranches = allBanksData.value.filter(
    (bank) => bank.headCodeName === numberPart.value,
  )
  allBranchOptions.value = findAllBranches
    .map((bank) => {
      const removeHead = bank.orgName.replace(ChinesePart.value, '')
      return removeHead
    })
    .filter((branch) => branch !== '')
}
watch(
  () => selectedBankOption.value,
  (newVal) => {
    if (newVal) {
      selectedBranchOption.value = ''
      fetchAllBranchData(newVal)
    }
  },
)
onMounted(() => {
  fetchAllBanksData()
  bankPlaceholder.value = '請輸入關鍵字或銀行代碼...'
  branchPlaceholder.value = '請選擇分行名稱'
})
</script>
<template>
  <div class="search-area">
    <div class="dropdown-container z-2 mx-3 my-3">
      <p class="mb-2">銀行名稱</p>
      <multiselect
        v-model="selectedBankOption"
        :options="allBanksOptions"
        :placeholder="bankPlaceholder"
      ></multiselect>
    </div>
    <div class="dropdown-container z-2 mx-3 my-3">
      <p class="mb-2">分行名稱：</p>
      <multiselect
        v-model="selectedBranchOption"
        :options="allBranchOptions"
        :placeholder="branchPlaceholder"
      ></multiselect>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@media (min-width: 768px) {
  div .search-area {
    display: flex !important;
  }
}
</style>
