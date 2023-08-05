<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.nickname"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入登录人名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item
              label="登陆地"
            >
              <el-input
                v-model="params.location"
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
  name: 'LoginLogHeader',
  data() {
    return {
      dialog: false,
      params: {
        nickname: '',
        location: ''
      },
      loginLogInfo: {}
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
      this.params.nickname = ''
      this.params.location = ''
      this.search()
    },
    cancel() {
      this.dialog = false
      this.$refs.add.clearForm()
    }
  }
}
</script>
<style lang="scss" scoped></style>
