<template>
  <div class="d-flex flex-column flex-lg-row">
    <div class="flex-lg-row-fluid">
      <el-card shadow="never">
        <div slot="header">
          <user-header
            ref="header"
            @search="refreshTable"
            @deleteSelected="deleteSelected"
          />
        </div>
        <user-table
          ref="table"
          @openEdit="openEdit"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import UserHeader from './components/UserHeader'
import UserTable from './components/UserTable'
export default {
  name: 'SystemUser',
  components: {
    UserHeader,
    UserTable
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
