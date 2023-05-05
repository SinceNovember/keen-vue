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
      <a
        href="#"
        class="btn btn-sm btn-icon btn-color-primary btn-light  btn-active-light-primary"
      >
        <span class="svg-icon svg-icon-3 m-0"><svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="6"
            width="16"
            height="3"
            rx="1.5"
            fill="currentColor"
          />
          <rect
            opacity="0.3"
            y="12"
            width="8"
            height="3"
            rx="1.5"
            fill="currentColor"
          />
          <rect
            opacity="0.3"
            width="12"
            height="3"
            rx="1.5"
            fill="currentColor"
          />
        </svg>
        </span>
      </a>
    </div>

    <header-button-group
      :show-add="false"
      @refresh="refreshTable"
      @add="openAdd"
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
        pageNum: 1
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
    cancel() {
      this.dialog = false
      this.$refs.add.clearForm()
    }
  }
}
</script>
<style lang="scss" scoped></style>
