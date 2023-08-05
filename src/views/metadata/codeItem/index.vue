<template>
  <div class="d-flex flex-column flex-lg-row">
    <div class="flex-lg-row-fluid">
      <el-card shadow="never">
        <div slot="header">
          <code-item-header
            ref="header"
            :code-id="codeId"
            @search="refreshTable"
            @deleteSelected="deleteSelected"
          />
        </div>
        <code-item-table
          ref="table"
          :code-id="codeId"
          @openEdit="openEdit"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import CodeItemHeader from './components/CodeItemHeader'
import CodeItemTable from './components/CodeItemTable'
export default {
  name: 'CodeItem',
  components: {
    CodeItemHeader,
    CodeItemTable
  },
  props: {
    codeId: {
      type: [String, Number],
      default: null
    },
    itemList: {
      type: Object,
      default: () => {

      }
    }
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
