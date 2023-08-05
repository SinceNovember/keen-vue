<template>
  <div class="attachment-container">
    <div class="mb-10">
      <attachment-summary ref="summary" />
    </div>
    <el-card shadow="nerve">
      <div class="py-5 px-2">
        <attachment-header
          ref="header"
          :folder-id="folderId"
          :is-selected="isSelected"
          @addFolder="addFolder"
          @search="refreshTable"
          @refreshSummary="refreshSummary"
          @deleteSelected="deleteSelected"
        />
        <attachment-navigation-bar
          ref="navigationBar"
          @changeFolder="changeFolder"
        />
        <attachment-table
          ref="table"
          :is-selected.sync="isSelected"
          @navigateNext="navigateNext"
          @refreshSummary="refreshSummary"
        />
      </div>
    </el-card>

  </div>
</template>
<script>
import AttachmentSummary from './components/AttachmentSummary'
import AttachmentHeader from './components/AttachmentHeader'
import AttachmentTable from './components/AttachmentTable'
import AttachmentNavigationBar from './components/AttachmentNavigationBar'

export default {
  name: 'KeenAttachment',
  components: {
    AttachmentSummary,
    AttachmentNavigationBar,
    AttachmentHeader,
    AttachmentTable
  },
  data() {
    return {
      folderId: 0,
      isSelected: false
    }
  },
  methods: {
    addFolder() {
      this.$refs.table.addFolder()
    },
    navigateNext(row) {
      this.$refs.navigationBar.addNavigationItem(row)
      this.folderId = row.id
    },
    changeFolder(row) {
      this.$refs.table.changeFolder(row)
      this.folderId = row.id
    },
    refreshTable(params) {
      this.$refs.table.refreshTable(params)
    },
    refreshSummary() {
      this.$refs.summary.loadAttachmentInfoSummary()
    },
    deleteSelected() {
      this.$refs.table.deleteSelected()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
