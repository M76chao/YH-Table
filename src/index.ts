import YhTable from './YHTable.vue'
import type { App } from 'vue'

const install = (app: App) => {
    app.component('YhTable', YhTable)
}

export { YhTable, install }

export default {
    install,
    YhTable
}