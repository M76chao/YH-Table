# YH-Table

一个基于 Element Plus 的 Vue 3 表格组件。

## 安装

```bash
npm install yh-table
```

## 使用

### 全局注册

```typescript
import { createApp } from 'vue'
import YHTable from 'yh-table'
import 'yh-table/style.css'
const app = createApp(App)
app.use(YHTable)
app.mount('#app')
```

### 局部导入

```vue
<script setup>
import { YHTable } from 'yh-table'
import 'yh-table/style.css'
</script>
```

### 基本用法

```vue
<template>
  <yh-table :data="tableData" :columns="columns" show-page auto-page />
</template>
<script setup>
import { ref } from 'vue'
const tableData = ref([
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 }
])
const columns = ref([
  { label: 'ID', prop: 'id' },
  { label: 'Name', prop: 'name' },
  { label: 'Age', prop: 'age' }
])
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | Array/Function | [] | 表格数据 |
| columns | Array | [] | 表格列配置 |
| showPage | Boolean | false | 是否显示分页 |
| autoPage | Boolean | true | 是否自动显示分页 |
| firstRendder | Boolean | false | 是否首次渲染加载数据 |
| showAllBtn | Boolean | false | 是否显示"显示全部"按钮 |
| table | Object | {} | Element Plus 的 table 组件的所有参数 |
| on | Object | {} | Element Plus 的 table 组件的所有监听 |

## 方法

| 方法名 | 说明 |
| --- | --- |
| load(reload) | 重新加载数据（reload：true = 重新第一页） |
| getTable() | 获取内部表格实例 |

## data 参数等于Function时会执行以下函数
data为函数时候，本组件会传入page={pageNo: number, pageSize: number}.
并期待该函数返回res = {total: number, list: any[]}

```javascript
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
```