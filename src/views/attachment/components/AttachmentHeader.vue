<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.name"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入附件名称"
        @change="search"
      />
    </div>
    <div class="d-flex">
      <!-- <header-button-group
            @refresh="refreshTable"
            @add="openAdd"
            @delete="deleteSelected"
        /> -->
      <el-button
        type="primary"
        plain
        size="small"
        @click="addFolder"
      >
        <div class="anchor">
          <i class="bi bi-folder-fill me-2 fs-2" />创建文件夹
        </div>
      </el-button>

      <el-button
        v-if="!isSelected"
        type="primary"
        size="small"
        @click="openUpload"
      >
        <div class="anchor">
          <i class="bi bi-cloud-arrow-up-fill me-2 fs-2" />上传文件
        </div>
      </el-button>
      <el-button
        v-else
        type="danger"
        size="small"
        @click="deleteSelected"
      >
        <div class="anchor">
          <i class="bi bi-cloud-arrow-up-fill me-2 fs-2" />删除选中
        </div>
      </el-button>

    </div>

    <keen-dialog
      :visible.sync="dialog"
      title="附件上传"
      :width="720"
      :show-save="false"
      :show-close="false"
    >
      <file-uploader
        :folder-id="folderId"
        @success="refresh"
      />

    </keen-dialog>
  </div>
</template>
<script>
import FileUploader from '@/components/FileUploader'
export default {
  name: 'AttachmentHeader',
  components: {
    FileUploader
  },
  props: {
    folderId: {
      type: Number,
      default: 0
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      params: {
        roleName: '',
        pageNum: 1
      },
      roleInfo: {
      }
    }
  },
  methods: {
    openUpload() {
      this.dialog = true
    },
    openAdd() {
      this.dialog = true
      this.roleInfo = {
        orderNum: 0
      }
    },
    openEditDialog(roleInfo) {
      this.roleInfo = roleInfo
      this.dialog = true
    },
    addFolder() {
      this.$emit('addFolder')
    },
    search() {
      this.$emit('search', this.params)
    },
    refresh() {
      this.$emit('search')
      this.$emit('refreshSummary')
    },
    deleteSelected() {
      this.$emit('deleteSelected')
    }
  }
}
</script>
  <style lang="scss" scoped>

::v-deep .el-button{
    &--small {
        padding: 9px 16px;
        font-size: 14px !important;
        border-radius: 6px;
    }
}

</style>

