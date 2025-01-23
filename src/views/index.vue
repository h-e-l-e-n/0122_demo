<script setup>
import { onMounted, ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import { useRoute, useRouter } from 'vue-router'

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
const route = useRoute()

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
    router.push({
      name: 'result',
      params: { headCodeName: numberPart.value, orgCodeName: '', orgName: ChinesePart.value },
    })
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
const resetSelections = () => {
  selectedBankOption.value = ''
  selectedBranchOption.value = ''
  bankPlaceholder.value = '請輸入關鍵字或銀行代碼...'
  branchPlaceholder.value = '請選擇分行名稱'
}
watch(
  () => selectedBankOption.value,
  (newVal) => {
    if (newVal) {
      selectedBranchOption.value = '請選擇分行名稱'
      branchPlaceholder.value = fetchAllBranchData(newVal)
    }
  },
)
const findBank = (orgName) => allBanksData.value.find((bank) => bank.orgName === orgName)

watch(
  () => selectedBranchOption.value,
  (newVal) => {
    if (newVal === '') return

    if (newVal !== '無分行資料' && newVal !== '請選擇分行名稱') {
      const findResult = findBank(`${ChinesePart.value}${newVal}`)
      if (!findResult) {
        alert('抱歉，目前沒有該公司資料！')
        return
      } else {
        router.push({
          name: 'result',
          params: {
            headCodeName: numberPart.value,
            orgCodeName: findResult.orgCodeName,
            orgName: `${ChinesePart.value}-${newVal}`,
          },
        })
      }
      resultData.value = findResult
    } else if (newVal === '無分行資料') {
      const findResult = findBank(ChinesePart.value)
      router.push({
        name: 'result',
        params: { headCodeName: numberPart.value, orgCodeName: '', orgName: ChinesePart.value },
      })
      resultData.value = findResult
    }
  },
)

onMounted(async () => {
  await fetchAllBanksData()
  if (!route.params.headCodeName) {
    bankPlaceholder.value = '請輸入關鍵字或銀行代碼...'
    branchPlaceholder.value = '請選擇分行名稱'
  } else if (route.params.orgCodeName !== '') {
    const [headName, branchName] = route.params.orgName.split('-')
    selectedBankOption.value = `${route.params.headCodeName} ${headName}`
    setTimeout(() => (selectedBranchOption.value = branchName), 500)
    router.push({
      name: 'result',
      params: {
        headCodeName: route.params.headCodeName,
        orgCodeName: route.params.orgCodeName,
        orgName: route.params.orgName,
      },
    })
  } else {
    selectedBankOption.value = `${route.params.headCodeName} ${route.params.orgName}`
    router.push({
      name: 'result',
      params: {
        headCodeName: route.params.headCodeName,
        orgCodeName: route.params.orgCodeName,
        orgName: route.params.orgName,
      },
    })
  }
})
</script>
<template>
  <div class="search-area">
    <div class="dropdown-container z-2 mx-4 my-3">
      <p class="mb-2">銀行名稱</p>
      <multiselect
        v-model="selectedBankOption"
        :options="allBanksOptions"
        :placeholder="bankPlaceholder"
        select-label=""
        deselect-label=""
        selected-label=""
      >
        <template v-slot:noResult>無相關資料</template>
      </multiselect>
      <span class="span-text">可使用選單或輸入關鍵字</span>
    </div>
    <div class="dropdown-container z-2 my-3 mx-4">
      <p class="mb-2">分行名稱</p>
      <multiselect
        v-if="selectedBranchOption == '無分行資料' || branchPlaceholder == '請選擇分行名稱'"
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
        select-label=""
        deselect-label=""
        selected-label=""
      >
        <template v-slot:noResult>無相關資料</template>
      </multiselect>
    </div>
  </div>
  <div v-if="selectedBranchOption == '請選擇分行名稱'"></div>
  <RouterView @reset-selections="resetSelections" v-else :getResultData="resultData" />
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.dropdown-container:nth-child(1) {
  min-width: 30%;
}

@media (min-width: 768px) {
  div .search-area {
    display: flex !important;
  }
}
.span-text {
  font-size: 15px;
  color: #949393;
  line-height: 1.5;
}
</style>
