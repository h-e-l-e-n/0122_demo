<script setup>
import { onMounted, ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import { useRouter } from 'vue-router'

const allBanksData = ref([])
const allBanksOptions = ref([])
const allBranchOptions = ref([])
const selectedBankOption = ref('')
const selectedBranchOption = ref('')
const bankPlaceholder = ref('')
const branchPlaceholder = ref('')
const numberPart = ref('')
const ChinesePart = ref('')
const resultData = ref('')
const router = useRouter()

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

  if (findAllBranches.length < 2) {
    selectedBranchOption.value = '無分行資料'
    return
  } else {
    allBranchOptions.value = findAllBranches
      .map((bank) => {
        const removeHead = bank.orgName.replace(ChinesePart.value, '')
        return removeHead
      })
      .filter((branch) => branch !== '')
  }
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
watch(
  () => selectedBranchOption.value,
  (newVal) => {
    if (newVal !== '無分行資料') {
      const findResult = allBanksData.value.find(
        (bank) => bank.orgName == `${ChinesePart.value}${newVal}`,
      )
      router.push({
        name: 'result',
        params: {
          headCodeName: numberPart.value,
          orgCodeName: findResult?.orgCodeName,
          orgName: `${ChinesePart.value}-${newVal}`,
        },
      })
      resultData.value = findResult
    } else {
      const findResult = allBanksData.value.find((bank) => bank.orgName == ChinesePart.value)
      router.push({
        name: 'result',
        params: { headCodeName: numberPart.value, orgCodeName: '', orgName: ChinesePart.value },
      })
      resultData.value = findResult
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
    <div class="dropdown-container z-2 mx-5 my-3">
      <p class="mb-2">銀行名稱</p>
      <multiselect
        v-model="selectedBankOption"
        :options="allBanksOptions"
        :placeholder="bankPlaceholder"
      ></multiselect>
    </div>
    <div class="dropdown-container z-2 my-3">
      <p class="mb-2">分行名稱</p>
      <multiselect
        v-if="selectedBranchOption == '無分行資料'"
        v-model="selectedBranchOption"
        :options="allBranchOptions"
        :placeholder="branchPlaceholder"
        disabled
      ></multiselect>
      <multiselect
        v-else
        v-model="selectedBranchOption"
        :options="allBranchOptions"
        :placeholder="branchPlaceholder"
      ></multiselect>
    </div>
  </div>
  <RouterView :getResultData="resultData" />
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@media (min-width: 768px) {
  div .search-area {
    display: flex !important;
  }
}
</style>
