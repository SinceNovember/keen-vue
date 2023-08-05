<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.title"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入标题名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="内容">
              <el-input
                v-model="params.content"
                type="textarea"
                :row="4"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </keen-search-form>
    </div>
    <header-button-group
      @refresh="refreshTable"
      @add="openAdd"
      @delete="deleteSelected"
    />

    <keen-dialog
      :visible.sync="dialog"
      title="添加通知"
      @cancel="dialog = false"
      @save="save"
    >
      <notification-add
        ref="add"
        class="notifcation-dialog"
        :data-info="notificationInfo"
        @search="refreshTable"
        @cancel="dialog = false"
      />
    </keen-dialog>
  </div>
</template>
<script>
import NotificationAdd from './NotificationAdd'
export default {
  name: 'NotificationHeader',
  components: {
    NotificationAdd
  },
  data() {
    return {
      dialog: false,
      params: {
        title: '',
        content: ''
      },
      notificationInfo: {}
    }
  },
  methods: {
    openAdd() {
      this.dialog = true
      this.notificationInfo = {}
    },
    openEditDialog(notificationInfo) {
      this.notificationInfo = notificationInfo
      this.dialog = true
    },
    save() {
      this.$refs.add.save()
    },
    search() {
      this.$emit('search', this.params)
    },
    refreshTable() {
      this.$emit('search')
    },
    deleteSelected() {
      this.$emit('deleteSelected')
    },
    resetForm() {
      this.params.title = ''
      this.params.content = ''
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped></style>
