<template>
  <div class="app-navbar-item ms-1 ms-lg-3">
    <el-dropdown>
      <div class="cursor-pointer symbol symbol-35px symbol-md-40px">
        <img
          :src="userInfo.avatar"
          alt="user"
        >
      </div>
      <el-dropdown-menu slot="dropdown">
        <div class="menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px">
          <div class="menu-item px-3">
            <div class="menu-content d-flex align-items-center px-3">
              <div class="symbol symbol-50px me-5">
                <img
                  alt="Logo"
                  :src="userInfo.avatar"
                >
              </div>

              <div class="d-flex flex-column">
                <div class="fw-bold d-flex align-items-center fs-5">
                  {{ userInfo.nickname }}
                  <span
                    v-if="userInfo.roleNames"
                    class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
                  >{{
                    userInfo.roleNames[0]
                  }}
                  </span>
                </div>

                <a class="fw-semibold text-muted fs-7">
                  {{ userInfo.deptName }} </a>
              </div>
            </div>
          </div>

          <div class="separator my-2" />

          <div class="menu-item px-5">
            <a
              class="menu-link px-5"
              @click="toProfile('overview')"
            >
              个人信息
            </a>
          </div>

          <div class="menu-item px-5">
            <a
              class="menu-link px-5"
              @click="toProfile('settings')"
            >
              账号设置
            </a>
          </div>

          <div class="menu-item px-5">
            <a
              class="menu-link px-5"
              @click="toProfile('notifications')"
            >
              个人通知
            </a>
          </div>

          <div class="menu-item px-5">
            <a
              class="menu-link px-5"
              @click="toProfile('logs')"
            >
              个人日志
            </a>
          </div>

          <div class="separator my-2" />

          <div class="menu-item px-5 my-1">
            <a class="menu-link px-5">
              系统设置
            </a>
          </div>

          <div class="menu-item px-5">
            <a
              class="menu-link px-5"
              @click="logout"
            > 退出登录</a>
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserMenu',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    toProfile(tab) {
      this.$router.push({ name: 'overview', query: { tab: tab }})
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$socketApi.sender.logout()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss" scoped></style>
