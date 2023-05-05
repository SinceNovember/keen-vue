<template>
  <div class="d-flex flex-column flex-lg-row">
    <div class="flex-lg-row-fluid">
      <el-card shadow="never">
        <div slot="header">
          <role-header
            ref="header"
            @search="refreshTable"
            @deleteSelected="deleteSelected"
          />
        </div>
        <role-table
          ref="table"
          @openEdit="openEdit"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import RoleHeader from './components/RoleHeader'
import RoleTable from './components/RoleTable'
export default {
  name: 'SystemRole',
  components: {
    RoleHeader,
    RoleTable
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
