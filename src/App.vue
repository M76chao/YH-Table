<script setup lang="ts">
import { ref } from 'vue'
import YhTable from './YHTable.vue'

// 测试数据
const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com' },
  { id: 5, name: '钱七', age: 22, email: 'qianqi@example.com' }
])

const columns = ref([
  { label: 'ID', prop: 'id', width: '80' },
  { label: '姓名', prop: 'name', width: '120' },
  { label: '年龄', prop: 'age', width: '80' },
  { label: '邮箱', prop: 'email' }
])

const handleLoad = () => {
  console.log('加载数据')
}

const handleSizeChange = (val: number) => {
  console.log('每页条数变化:', val)
}

const handleCurrentChange = (val: number) => {
  console.log('当前页变化:', val)
}
</script>

<template>
  <div style="padding: 20px">
    <h1>YhTable 组件测试</h1>

    <div style="margin-bottom: 20px">
      <h2>基础表格</h2>
      <YhTable
          :data="tableData"
          :columns="columns"
          :show-page="true"
          :auto-page="false"
          :firstRendder="true"
          :showAllBtn="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <div style="margin-bottom: 20px">
      <h2>带分页的表格</h2>
      <YhTable
          :data="tableData"
          :columns="columns"
          :show-page="true"
          :page="{ pageSize: 3 }"
      />
    </div>
  </div>
</template>

<style scoped>
</style>