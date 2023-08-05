<template>
  <el-card shadow="nerve">
    <div
      slot="header"
      class="cursor-pointer  d-flex flex-stack"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">个人简介</h3>
      </div>
      <a
        v-if="isCurrent"
        class="btn btn-sm btn-primary align-self-center"
        @click="toSettings"
      >Edit
        Profile</a>
    </div>

    <div class="p-9">
      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">昵称</label>

        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-600">{{ userInfo.nickname }}</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">用户名</label>

        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-600">{{ userInfo.username }}</span>
        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">
          手机号
        </label>

        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 text-gray-600 me-2">{{ userInfo.mobile }}</span>

        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">邮箱</label>

        <div class="col-lg-8">
          <a
            href="#"
            class="fw-bold fs-6 text-gray-600 text-hover-primary"
          >{{ userInfo.email }}</a>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">
          性别
        </label>

        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-600">{{ userInfo.sex | SexFilter }}</span>
        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">
          状态
        </label>

        <div class="col-lg-8">
          <span
            class="badge "
            :class="userInfo.status == 'VALID' ? 'badge-light-success' : 'badge-light-danger'"
          >{{
            userInfo.status | StatusTypeFilter
          }}</span>

        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">部门</label>

        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-gray-600">{{ userInfo.deptName }}</span>
        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semibold text-gray-600">角色</label>

        <div class="col-lg-8">
          <span
            v-for="(item, index) in userInfo.roleNames"
            :key="index"
            class="badge badge-light-success me-2"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'AccountOverview',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    toSettings() {
      this.$router.push({ path: 'overview' })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
