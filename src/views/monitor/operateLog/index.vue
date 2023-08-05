<template>
  <div class="d-flex flex-column flex-lg-row">
    <div class="flex-lg-row-fluid">
      <el-card shadow="never">
        <div slot="header">
          <operate-log-header
            ref="header"
            @search="refreshTable"
            @deleteSelected="deleteSelected"
          />
        </div>
        <operate-log-table
          ref="table"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import OperateLogHeader from './components/OperateLogHeader'
import OperateLogTable from './components/OperateLogTable'
export default {
  name: 'OperateLog',
  components: {
    OperateLogHeader,
    OperateLogTable
  },
  data() {
    return {
    }
  },
  methods: {
    refreshTable(params) {
      this.$refs.table.refreshTable(params)
    },
    deleteSelected() {
      this.$refs.table.deleteSelected()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
