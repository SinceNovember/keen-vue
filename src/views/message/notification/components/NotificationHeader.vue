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
        pageNum: 1
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
    }

  }
}
</script>
<style lang="scss" scoped></style>
