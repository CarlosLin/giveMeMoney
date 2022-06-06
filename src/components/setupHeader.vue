<template>
  {{ checkedCols }}
  <hr />
  {{ columns.checkedColumns }}
  <hr />
  <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    >All</el-checkbox
  >
  <el-checkbox-group v-model="checkedCols" @change="handleCheckedColumnsChange">
    <el-checkbox
      v-for="column in columns.totalColumns"
      :key="column.prop"
      :label="column.prop"
      :disabled="column.prop === 'uid'"
    >
      {{ column.prop }}
    </el-checkbox>
  </el-checkbox-group>
  <hr />
  <div class="text-3xl">拖曳</div>
  {{ sortCols }}
  <hr />
  <div class="flex justify-center my-3 dragArea">
    <div
      v-for="column in sortCols"
      :key="column.prop"
      class="mx-1 box cursor-move"
      :draggable="column.prop !== 'uid' ? true : false"
    >
      <Chip :statusData="column.prop"></Chip>
    </div>
  </div>
  <hr />
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  onMounted,
  computed,
  nextTick,
  PropType,
} from "vue";
import { ElCheckbox, ElCheckboxGroup } from "element-plus";
import { ColumnType, HeaderColumn } from "../interface/index";
import * as _ from "lodash-es";
import Chip from "@/components/chip.vue";
import { log } from "console";

export default defineComponent({
  props: {
    columns: {
      type: Object as PropType<HeaderColumn>,
      rquired: true,
      default: {},
    },
  },
  components: {
    ElCheckbox,
    ElCheckboxGroup,
    Chip,
  },
  setup(props) {
    // TODO: 透過一參數控制過渲染順序
    const sortCols = ref<ColumnType[]>([]);
    const checkAll = ref(false);
    const isIndeterminate = ref(false);
    const checkedCols = ref<string[]>([]);
    props.columns.checkedColumns = computed(() => {
      console.log("----im good----");
      return props.columns.totalColumns.filter((option: ColumnType) => {
        console.log(option);
        return checkedCols.value.some(
          (checked: string) => checked === option.prop
        );
      });
    });

    const handleCheckAllChange = (val: boolean): void => {
      console.log("trigger all change");
      console.log(val);
      checkedCols.value = val
        ? props.columns.totalColumns.map((item: ColumnType) => item.prop)
        : ["uid"];
      isIndeterminate.value = false;
    };
    const handleCheckedColumnsChange = (val: string[]) => {
      console.log(val)
      const checkedCount = val.length;
      checkAll.value = checkedCount === props.columns.totalColumns.length;
      isIndeterminate.value =
        checkedCount > 0 && checkedCount < props.columns.totalColumns.length;
      // TODO: 透過linked list 處理 顯示欄位
    };
    const setDefaultHeaderColumns = () => {
      checkedCols.value = props.columns.totalColumns.map(
        (ele: ColumnType) => ele.prop
      );
      checkAll.value = true;
    };
    setDefaultHeaderColumns();
    // drag and drop
    let dragSource: any;
    const setSortColumns = () => {
      sortCols.value = props.columns.totalColumns.filter(
        (option: ColumnType) => {
          return checkedCols.value.some(
            (checked: string) => checked === option.prop
          );
        }
      );
    };
    const setDragInit = () => {
      console.log("set drag init");
      let items = document.querySelectorAll(".dragArea .box");
      console.log(items);
      items.forEach((item) => {
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragend", handleDragEnd);
        item.addEventListener("dragenter", handleDragEnter);
        item.addEventListener("dragleave", handleDragLeave);
        item.addEventListener("dragover", handleDragOver);
        item.addEventListener("drop", handleDrop);
      });
    };
    function handleDragStart(e: any) {
      console.log(e.target);
      e.target.style.opacity = "0.4";
      e.target.classList.add("dragging");
      dragSource = e.target;

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.innerHTML);
    }
    function handleDragEnd(e: any) {
      console.log(e);
      e.target.style.opacity = "1";

      let items = document.querySelectorAll(".dragArea .box");
      items.forEach((item) => {
        item.classList.remove("over");
      });
      e.target.classList.remove("dragging");
    }
    function handleDragOver(e: any) {
      e.preventDefault();
      return false;
    }
    function handleDragEnter(e: any) {
      console.log(e);
      e.target.classList.add("over");
    }
    function handleDragLeave(e: any) {
      console.log(e.target);
      e.target.classList.remove("over");
    }
    function handleDrop(e: any) {
      console.log(e);
      e.stopPropagation();

      // only 文字上的交換!!!
      if (dragSource !== e?.target) {
        dragSource.innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer.getData("text/html");
      }
      return false;
    }
    watch(
      () => props.columns.checkedColumns,
      async (val) => {
        console.log(val);
        await nextTick();
        setDragInit();
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => checkedCols,
      () => {
        console.log('Chedcked Columns change')
        setSortColumns()
      },
      {
        deep: true,
        immediate: true
      }
    )
    onMounted(() => setDragInit());
    return {
      checkedCols,
      sortCols,
      checkAll,
      isIndeterminate,
      handleCheckAllChange,
      handleCheckedColumnsChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.box.over {
  border: 2px dotted #666;
}
.box * {
  pointer-events: none;
}
</style>
