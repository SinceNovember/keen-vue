<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.nickname"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入用户名称"
        @change="search"
      />
      <a @click="downloadTest">下载</a>

      <a
        href="#"
        class="btn btn-sm btn-icon btn-color-primary btn-light btn-active-light-primary"
      >
        <span class="svg-icon svg-icon-3 m-0">
          <svg
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
      @refresh="refreshTable"
      @add="openAdd"
      @delete="deleteSelected"
    />
    <keen-dialog
      :visible.sync="dialog"
      title="添加用户"
      :width="760"
      @cancel="dialog = false"
      @save="save"
    >
      <user-add
        ref="add"
        :data-info="userInfo"
        @search="refreshTable"
        @cancel="cancel"
      />
    </keen-dialog>

  </div>
</template>
<script>
import UserAdd from './UserAdd'
import { downloadAttachment } from '@/api/attachment/attachment'
export default {
  name: 'UserHeader',
  components: {
    UserAdd
  },
  data() {
    return {
      dialog: false,
      params: {
        nickname: '',
        pageNum: 1
      },
      userInfo: {}
    }
  },
  methods: {
    openAdd() {
      this.dialog = true
      this.userInfo = {
        avatar: require('@/assets/media/avatars/300-1.jpg')
      }
    },
    openEditDialog(userInfo) {
      this.userInfo = userInfo
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
    cancel() {
      this.dialog = false
    },
    downloadTest() {
      downloadAttachment(18).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
