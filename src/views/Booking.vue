<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Chip from '@/components/chip.vue'
import DataTable from '@/components/dataTable.vue'

import { reactive, ref } from 'vue'

interface DataType {
  uid: number,
  name: string,
  time: number,
  status: string,
  originalLocation: string,
  destination: string,
  text: string,
  expand?: boolean,
  children?: Array<Object>
}

const data = reactive<DataType[]>([
  {
    // sysf2: true,
    // sysf1: false,
    uid: 1123123123,
    name: 'CarlosTesttest',
    status: 'Pending',
    time: 123321321,
    originalLocation: 'Taipe, Taiwan',
    destination: 'Los Angeles, CA',
    text: '我試測試測試測試',
    expand: true,
    children: [
      {
        uid: '2341434AAA12312',
        saleId: 14334124
      },
      {
        uid: '239CC4AAA12312',
        saleId: 2222
      },
    ]
  },
  {
    // sysf2: true,
    // sysf1: false,
    uid: 1223123,
    name: 'GoodGood',
    status: 'Cancel',
    time: 123321321,
    originalLocation: 'Taipe, Taiwan',
    destination: 'Los Angeles, CA',
    text: '我試測試測試測試',
    // unit time 或者你想要的格式
    // expand: false,
  },
  {
    uid: 1223123,
    status: 'Success',
    name: 'BaDbad',
    time: 123321321,
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
        saleId: 2222
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
  // {
  //   prop: 'sysf2',
  //   label: '已讀',
  //   width: 70,
  // },
  // {
  //   prop: 'sysf1',
  //   label: '是否被標記',
  //   width: 120
  // },
  {
    prop: 'uid',
    label: '訂倉號碼',
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
    prop: 'originalLocation',
    label: '起始地',
    width: 120
  },
  {
    prop: 'destination',
    label: '目的地',
    width: 120
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
]

const page = ref(10)
const pageSize = ref(2)
const clickTest = (data: any) => {
  console.log(data)
}
const change = () => {
  console.log('change')
}
</script>

<template>
  <DataTable :data="data" :columns="columns" :childrenColumns="childrenCols" :page="page" :pageSize="pageSize"
    :sortChange="change">
    <template #sysf1="{ row }">
      <span>
        {{ row.sysf1 }}
      </span>
    </template>
    <template #text="{ row }">
      <span>
        {{ row.text }}
      </span>

      <img v-for="image in row.imageAll" :key="image" :src="`image`" class="w-1/3">
    </template>
    <template #status="{ row }">
      <Chip :statusData="row.status"></Chip>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
