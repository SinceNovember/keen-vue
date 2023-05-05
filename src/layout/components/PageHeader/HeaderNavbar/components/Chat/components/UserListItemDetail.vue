<template>
  <div class="user-list-item-detail h-100">
    <div class="mb-5">
      <div class="detail-header d-flex flex-row">
        <div class="symbol symbol-60px me-4"><img
          alt="Pic"
          :src="selectedUser.avatar"
        ></div>
        <div class="d-flex flex-column">
          <a
            href="#"
            class="fs-6 text-gray-600 my-1"
          >昵称：
            {{ selectedUser.nickname }}</a>
          <a
            href="#"
            class="fs-6 text-gray-600 my-1"
          >性别：{{
            selectedUser.sex | SexFilter
          }}</a>
          <a
            href="#"
            class="fs-6 text-gray-600 my-1"
          >部门：大数据</a>
        </div>
      </div>
      <div class="separator separator-content my-4 w-300px" />
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <a
            href="#"
            class="fs-6 text-gray-600 my-1"
          >手机
            <span class="ms-12">{{
              selectedUser.mobile
            }}</span></a>
          <a
            href="#"
            class="fs-6 text-gray-600 my-1"
          >邮箱
            <span class="ms-12">{{
              selectedUser.email

            }}</span></a>
        </div>
      </div>
      <div class="separator separator-content my-6" />
      <div class="d-flex justify-content-center">
        <el-button
          type="primary"
          class="fw-bold w-125px"
          plain
          @click="sendMessage"
        >发消息</el-button>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: 'UserListItemDetail',
  props: {
    selectedUser: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {}
  },
  methods: {
    sendMessage() {
      this.$emit('sendMessage', this.selectedUser)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-list-item-detail {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
