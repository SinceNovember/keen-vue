<template>
  <div class="d-flex flex-column flex-lg-row">
    <div class="flex-lg-row-fluid">
      <el-card shadow="never">
        <div slot="header">
          <chat-header
            ref="header"
            @search="refreshTable"
            @deleteSelected="deleteSelected"
          />
        </div>
        <chat-table
          ref="table"
          @openEdit="openEdit"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import ChatHeader from './components/ChatHeader'
import ChatTable from './components/ChatTable'
export default {
  name: 'KeenChat',
  components: {
    ChatHeader,
    ChatTable
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
