<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElSwitch } from 'element-plus'
import { vLoading } from 'element-plus'

interface ColumnProps {
  label: string
  prop?: string
  formatter?: (row: any, column: any, cellValue: any, index: number) => any
  renderHeader?: (data: { column: any; $index: number }) => any
  render?: string
  width?: string
  minWidth?: string
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
  fixed?: boolean | string
  type?: 'selection' | 'index' | 'expand'
  /**
   * todo 后续可以添加这几个
   * dict: string
   * permissions: string[]
   * component? // 存疑
   * visible： boolean
   * */
}

interface Props {
  data:
    | Array<any>
    | ((params: { pageNo: number; pageSize: number }) => Promise<{ list: any[]; total: number }>)
  columns: ColumnProps[]
  on?: Record<string, any>
  table?: Record<string, any>
  page?: Record<string, any>
  showPage?: boolean
  autoPage?: boolean
  firstRendder?: boolean
  showAllBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  on: () => ({}),
  table: () => ({}),
  page: () => ({}),
  showPage: false,
  autoPage: true,
  firstRendder: false,
  showAllBtn: false,
})

const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const tableRef = ref<InstanceType<typeof ElTable>>()
const tableData = ref<any[]>([])
const current = ref<number>(1)
const size = ref<number>(0) // 此处在onMounted会被重置
const oldSize = ref<number>(0)
const total = ref<number>(0)
const showAllPage = ref<boolean>(false)
const loading = ref<boolean>(false)
const isRended = ref<boolean>(false)

const myTable = computed(() => ({
  ...props.table,
  data: tableData.value,
}))

const myColumns = computed(() =>
  props.columns.map((col) => ({
    ...col,
    headerAlign: col.headerAlign || 'center',
    align: col.align || 'center',
  })),
)

// 自己的分页信息
const myPage = computed(() => ({
  pageSizes: [10, 20, 30, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
  ...props.page,
  pageSize: size.value,
  total: total.value,
  currentPage: current.value,
}))

// 是否显示分页
const visibilityPage = computed(() => {
  if (!props.showPage) return false
  if (props.autoPage) {
    return size.value < total.value && total.value > 0
  }
  return true
})
const height = computed(() => {
  if (visibilityPage.value || props.showAllBtn) {
    return 'calc(100% - 40px)'
  }
  return '100%'
})

// 加载数据
const load = (reload = false) => {
  isRended.value = true
  if (reload) current.value = 1
  if (typeof props.data === 'function') {
    getDataByAjax()
  } else {
    getDataByArray()
  }
}

// 使用ajax的方式获取数据
const getDataByAjax = async () => {
  loading.value = true
  try {
    const res = await props.data({ pageNo: current.value, pageSize: size.value })
    if (res) {
      total.value = res.total
      tableData.value = res.list
      if (current.value !== 1 && tableData.value.length === 0) {
        current.value--
        getDataByAjax()
      }
    } else {
      tableData.value = []
      total.value = 0
    }
  } finally {
    loading.value = false
  }
}

// 使用用户数据分页
const getDataByArray = () => {
  const start = (current.value - 1) * size.value
  tableData.value = props.data.slice(start, current.value * size.value)
}

const showAllChange = () => {
  if (showAllPage.value) {
    size.value = total.value ? total.value : 1000000000
  } else {
    size.value = oldSize.value
  }
  current.value = 1
  load()
}

const sizeChange = (s: number) => {
  oldSize.value = size.value
  size.value = s
  load(true)
}

const currentChange = (c: number) => {
  current.value = c
  load()
}

onMounted(() => {
  current.value = props.page.currentPage || 1
  size.value = props.page.pageSize || props.page.pageSizes?.[0] || 20
  oldSize.value = size.value
  if (typeof props.data === 'function') {
    if (props.firstRendder) getDataByAjax()
  } else {
    getDataByArray()
  }
})

watch(
  () => props.data,
  (newVal) => {
    if (Array.isArray(newVal)) {
      total.value = newVal.length
      if (props.showPage) {
        getDataByArray()
      } else {
        tableData.value = newVal
      }
    }
  },
  { immediate: true },
)

defineExpose({
  load,
  getTable: () => tableRef.value,
})
</script>

<template>
  <div class="yh-table">
    <el-table v-loading="loading" ref="tableRef" v-bind="myTable" v-on="props.on">
      <el-table-column v-for="(column, index) in myColumns" :key="index" v-bind="column">
        <template v-if="column.render" v-slot:default="scope">
          <slot :name="column.render" v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>
    <div class="yhtable-page" v-if="showAllBtn || visibilityPage">
      <div v-if="showAllBtn" class="show-all-page">
        <span class="label">显示全部</span>
        <el-switch v-model="showAllPage" @change="showAllChange" />
      </div>
      <el-pagination
        v-if="visibilityPage"
        class="elPagination is-background"
        v-bind="myPage"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.el-table {
  height: v-bind(height);
}
.yhtable-page {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 8px;
}
.yhtable-page .show-all-page {
  margin-right: 15px;
}
.yhtable-page .el-switch {
  margin-left: 5px;
  height: 20px;
}
</style>
