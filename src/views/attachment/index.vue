<template>
  <div class="attachment-container">
    <div class="mb-10">
      <attachment-summary />
    </div>
    <el-card shadow="nerve">
      <div class="py-5 px-2">
        <attachment-header @addFolder="addFolder" />
        <attachment-navigation-bar />
        <attachment-table ref="table" />
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
    return {}
  },
  methods: {
    addFolder() {
      this.$refs.table.addFolder()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
