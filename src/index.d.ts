import type { DefineComponent } from 'vue'
import type { ColumnProps, Props as YhTableProps } from './YHTable.vue'

export interface YhTableInstance {
    load: (reload?: boolean) => void
    getTable: () => any
}

declare const YhTable: DefineComponent<YhTableProps, {}, any>

export { YhTable, ColumnProps, YhTableProps }

export default YhTable