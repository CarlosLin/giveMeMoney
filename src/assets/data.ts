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

export const data = reactive<DataType[]>([
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


