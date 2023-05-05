<template>
  <div class="d-flex flex-column flex-lg-row">
    <div class="flex-lg-row-fluid">
      <el-card shadow="never">
        <div slot="header">
          <notification-header
            ref="header"
            @search="refreshTable"
            @deleteSelected="deleteSelected"
          />
        </div>
        <notification-table
          ref="table"
          @openEdit="openEdit"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import NotificationHeader from './components/NotificationHeader'
import NotificationTable from './components/NotificationTable'
export default {
  name: 'KeenNotification',
  components: {
    NotificationHeader,
    NotificationTable
  },
  data() {
    return {
    }
  },
  methods: {
    refreshTable(params) {
      this.$refs.table.refreshTable(params)
    },
    openEdit(params) {
      this.$refs.header.openEditDialog(params)
    },
    deleteSelected() {
      this.$refs.table.deleteSelected()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
