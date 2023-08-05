<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.fromName"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入发送人名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="接收人">
              <el-input v-model="params.toName" />
            </el-form-item>
          </el-col>
        </el-row>
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
      :show-add="false"
      @refresh="refreshTable"
      @delete="deleteSelected"
    />
  </div>
</template>
<script>
export default {
  name: 'ChatHeader',
  data() {
    return {
      dialog: false,
      params: {
        fromName: '',
        toName: '',
        content: ''
      },
      chatInfo: {}
    }
  },
  methods: {
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
      this.params.fromName = ''
      this.params.toName = ''
      this.params.content = ''
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped></style>
