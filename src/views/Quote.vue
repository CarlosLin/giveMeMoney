<script setup lang="ts">
import DataTable from '@/components/dataTable.vue'
import Chip from '@/components/chip.vue'
import { ref } from 'vue'

const data = ref([
  {
    uid: 12341234,
    name: 'CarlosTesttest',
    status: 'GoodGood',
    time: 1234324,
    condition: 'DAP',
    originalLocation: 'Taipe, Taiwan',
    destination: 'Los Angeles, CA',
    text: '我試測試測試測試',
    // unit time 或者你想要的格式
    expand: true,
    children: [
      {
        uid: '2341434AAA12312',
        saleId: 14334124,
        money: 10000
      },
      {
        uid: '239CC4AAA12312',
        saleId: 2222
      },
    ]
  },
  {
    uid: 1223123,
    name: 'GoodGood',
    status: 'Cancel',
    time: 123321321,
    condition: 'AAA',
    originalLocation: 'Taipe, Taiwan',
    destination: 'Los Angeles, CA',
    text: '我試測試測試測試',
    // unit time 或者你想要的格式
    // expand: false,
  },
  {
    uid: 1223123,
    name: 'BaDbad',
    status: 'Success',
    time: 123321321,
    condition: 'CDCD',
    originalLocation: 'TaiChung, Taiwan',
    destination: 'Los Angeles, CA',
    text: '我試測試測試測safd試',
    // unit time 或者你想要的格式
    expand: true,
    children: [
      {
        uid: '2341434AAA12312',
        saleId: 14334124
      },
      {
        uid: '239CC4AAA12312',
        saleId: 2222,
        money: 12342134
      },
      {
        uid: '2341434AAA12312',
        saleId: 1230
      },
      {
        uid: '234BD2312',
        saleId: 44444
      },
    ]
  },
])

const columns = [
  {
    prop: 'uid',
    label: '訂倉號碼',
    width: 140
  },
  {
    prop: 'name',
    label: '名稱',
    width: 140
  },
  {
    prop: 'status',
    label: '狀態',
    width: 100
  },
  {
    prop: 'time',
    label: '可出貨日期',
    width: 120,
    sortable: true
  },
  {
    prop: 'condition',
    label: '貿易條件',
    width: 240,
  },
  {
    prop: 'originalLocation',
    label: '起始地',
    width: 150
  },
  {
    prop: 'destination',
    label: '目的地',
    width: 150
  },
  {
    prop: 'text',
    label: '內容'
  },
  {
    prop: 'action',
    label: '操作',
    width: 120,
    fixed: 'right'
  },
]
const childrenCols = [
  {
    prop: 'id',
    label: '#',
    width: 70
  },
  {
    prop: 'uid',
    label: '報價號碼',
    width: 180
  },
  {
    prop: 'saleId',
    label: '業務',
  },
  {
    prop: 'money',
    label: '業績',
    width: 200
  }
]

const page = ref(1)
const pageSize = ref(10)
const clickTest = (data: any) => {
  console.log(data)
}
const change = () => {
  console.log('change')
}

</script>

<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <DataTable :data="data" :columns="columns" :childrenColumns="childrenCols" :page="page" :pageSize="pageSize"
    :sortChange="change">
    <template #sysf1="{ row }">
      <span>
        {{ row.sysf1 }}
      </span>
    </template>
    <template #status="{ row }">
      <Chip :statusData="row.status"></Chip>
    </template>

    <template #text="{ row }">
      <span>
        {{ row.text }}
      </span>
      <img v-for="image in row.imageAll" :key="image" :src="`image`" class="w-1/3">
    </template>
    <template #time="{ row }">
      <span>{{ row.time }}</span>
    </template>
    <template #action="{ row }">
      <button class="btn w-24 mr-1 mb-2" @click="clickTest(row)">
        操作
      </button>
    </template>
    <template #sysf2="{ row }">
      <input type="checkbox" v-model="row.sysf2" @change="change">
    </template>
    <template #id="{ row, index }">
      <span class="test">
        {{ index + 1 }}
      </span>
    </template>
  </DataTable>
</template>
