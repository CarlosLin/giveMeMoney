<template>
  <setup-header :columns="defaultColumns"></setup-header>
  <suspense>
    <el-table
      :data="data"
      :border="border"
      style="width: 100%"
      emptyText="無資料"
      @sort-change="sortChange"
      :row-class-name="setClass"
    >
      <template #default>
        <el-table-column type="expand" width="70px" fixed>
          <template #default="row">
            <el-table
              :data="row.row?.children"
              style="width: 100%"
              emptyText="無資料"
            >
              <el-table-column
                v-for="fakeCol in childrenColumns"
                :key="fakeCol.prop"
                :prop="fakeCol.prop"
                :width="fakeCol.width"
                :label="fakeCol.label"
              >
                <template #default="scope">
                  <slot
                    :name="fakeCol.prop"
                    :row="scope.row"
                    :index="scope.$index"
                    :class="{ test: fakeCol.prop == 'id' }"
                  >
                    {{ scope.row[fakeCol.prop] || "-" }}
                  </slot>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column
          :sortable="column.sortable ? 'custom' : false"
          v-for="column in defaultColumns.checkedColumns"
          :key="column.prop"
          :prop="column.prop"
          :width="column.width ? column.width : ''"
          :label="column.label"
          :fixed="column.fixed"
        >
          <template #default="scope">
            <slot :name="column.prop" :row="scope.row" :index="scope.$index">
              {{ scope.row[column.prop] || "-" }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- <slot name="pagination" :page="page"> -->
    <!-- </slot> -->
  </suspense>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive } from "vue";
import { ElTable, ElTableColumn, ElPagination } from "element-plus";
import SetupHeader from "@/components/setupHeader.vue";
import { ColumnType, HeaderColumn } from "../interface/index";
import * as _ from "lodash-es";

export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
    SetupHeader,
  },
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array as PropType<Array<ColumnType>>,
      required: true,
    },
    childrenColumns: {
      type: Array as PropType<Array<ColumnType>>,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 2,
    },
    page: {
      type: Number,
      default: 3,
    },
    sortChange: {
      type: Function as PropType<() => void>,
      default: () => {
        console.log("default");
      },
    },
  },
  setup(props) {
    const currentPage = ref(2);
    const defaultColumns = reactive<HeaderColumn>({
      checkedColumns: [],
      totalColumns: [],
    });

    // init column type to default
    const initColumns = () => {
      console.log("--------init coolumn--------");
      console.log(props.columns);
      defaultColumns.totalColumns = _.cloneDeep(props.columns);
      defaultColumns.checkedColumns = _.cloneDeep(props.columns);
      console.log(defaultColumns.checkedColumns);
    };

    const setClass = (row: any) => {
      return row.row.expand ? "" : "not-expand";
    };
    const handleCurrentChange = (newPage: Number) => {
      console.log("current change");
      console.log(newPage);
    };

    initColumns();

    return {
      defaultColumns,
      currentPage,
      setClass,
      handleCurrentChange,
    };
  },
});
</script>
<style scope>
.not-expand .el-table__expand-column .cell {
  display: none;
}
</style>
