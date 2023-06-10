<template>
  <div class="card  mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer">
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">登录设置</h3>
      </div>
    </div>

    <div class="collapse show">
      <div class="card-body border-top p-9">
        <div class="d-flex flex-wrap align-items-center">
          <div
            id="kt_signin_email"
            :class="{ 'd-none': usernamePanel }"
          >
            <div class="fs-6 fw-bold mb-1">用 户 名</div>
            <div class="fw-semibold text-gray-600">{{ userInfo.username }}</div>
          </div>

          <div
            id="kt_signin_email_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !usernamePanel }"
          >
            <el-form
              ref="formValidate"
              :model="loginInfo"
              label-position="top"
              label-width="80px"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="新用户名">
                    <el-input
                      v-model="loginInfo.username"
                      class="w-95 h-40px"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="密码">
                    <el-input
                      v-model="loginInfo.password"
                      type="password"
                      class="w-95 h-40px"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="d-flex">
                <el-button
                  type="primary"
                  @click="editUsername"
                >保 存</el-button>
                <el-button
                  class="me-2"
                  @click="usernamePanel = false"
                >取 消</el-button>
              </div>
            </el-form>
          </div>

          <div
            id="kt_signin_email_button"
            class="ms-auto"
            :class="{ 'd-none': usernamePanel }"
          >
            <el-button @click="usernamePanel = true">修改用户名</el-button>
          </div>
        </div>

        <div class="separator separator-dashed my-6" />

        <div class="d-flex flex-wrap align-items-center mb-10">
          <div :class="{ 'd-none': passwordPanel }">
            <div class="fs-6 fw-bold mb-1">密 码</div>
            <div class="fw-semibold text-gray-600">************</div>
          </div>

          <div
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordPanel }"
          >
            <el-form
              ref="passwordForm"
              :model="userInfo"
              label-position="top"
              label-width="80px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="原密码">
                    <el-input
                      v-model="loginInfo.password"
                      type="password"
                      class="w-95 h-40px"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="新密码">
                    <el-input
                      v-model="loginInfo.newPassword"
                      type="password"
                      class="w-95 h-40px"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="确认新密码">
                    <el-input
                      v-model="loginInfo.rePassword"
                      type="password"
                      class="w-95 h-40px"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="d-flex">
                <el-button
                  type="primary"
                  @click="editPassword"
                >保 存</el-button>
                <el-button
                  class="me-2"
                  @click="passwordPanel = false"
                >取 消</el-button>
              </div>
            </el-form>
          </div>

          <div
            class="ms-auto"
            :class="{ 'd-none': passwordPanel }"
          >
            <el-button @click="passwordPanel = true">重置密码</el-button>
          </div>
        </div>

        <div class="notice d-flex bg-light-primary rounded border-primary border border-dashed  p-6">
          <span class="svg-icon svg-icon-2tx svg-icon-primary me-4"><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
              fill="currentColor"
            />
            <path
              d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z"
              fill="currentColor"
            />
          </svg>
          </span>

          <div class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
            <div class="mb-3 mb-md-0 fw-semibold">
              <h4 class="text-gray-900 fw-bold">账号安全验证</h4>
              <div class="fs-6 text-gray-700 pe-7">账号安全验证可通过手机绑定验证以及邮箱等进行验证，增强账户安全性。
              </div>
            </div>
            <el-button
              type="primary"
              @click="save"
            >开 启 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { updateUsername, updatePassword } from '@/api/system/user'
export default {
  name: 'LoginSettings',
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loginInfo: JSON.parse(JSON.stringify(this.userInfo)),
      usernamePanel: false,
      passwordPanel: false
    }
  },
  methods: {
    editUsername() {
      const { username, password } = this.loginInfo
      if (!username || !password) {
        this.$message.error('输入的新账号或密码不能为空')
        return
      }
      updateUsername({
        username: username,
        password: password
      }).then(res => {
        if (res.code === 200) {
          this.usernamePanel = false
          this.$message.success('修改成功')
          this.loginInfo.password = ''
          this.$emit('refreshInfo')
        }
      })
    },
    editPassword() {
      const { password, newPassword, rePassword } = this.loginInfo
      if (!password || !newPassword || !rePassword) {
        this.$message.error('密码不能为空')
        return
      }
      if (newPassword !== rePassword) {
        this.$message.warning('新密码与确认密码不同')
        return
      }
      updatePassword({
        password: password,
        newPassword: newPassword
      }).then(res => {
        if (res.code === 200) {
          this.passwordPanel = false
          this.$message.success('修改成功')
          this.loginInfo.password = ''
          this.loginInfo.newPassword = ''
          this.loginInfo.rePassword = ''
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
