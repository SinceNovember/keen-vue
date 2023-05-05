<template>
  <div
    class="d-flex flex-column flex-root"
  >
    <div class="d-flex flex-column flex-lg-row flex-column-fluid">
      <div class="d-flex flex-lg-row-fluid w-lg-55 bgi-size-cover bgi-position-center login-bg">
        <div class="d-flex flex-column flex-stack p-6 p-lg-10 w-100">
          <a
            href="#"
            class="mb-0 mb-lg-20"
          >
            <img
              alt="Logo"
              src="@/assets/media/login/default-white.svg"
              class="h-40px h-lg-50px"
            >
          </a>

          <div class="d-none d-lg-block text-white fs-base text-center">
            <h1 class="d-none d-lg-block text-white fs-2qx fw-bold text-center mb-7">
              I love the color!
            </h1>

            <p class="lead"> It's a elegent templete. I love it very much! .</p>
            <p class="lead fs-5"> - Keen Admin User</p>

          </div>
        </div>
      </div>

      <div class="d-flex flex-column flex-lg-row-fluid w-lg-45 p-10 bg-white">
        <div class="d-flex flex-center flex-column flex-lg-row-fluid">
          <div class="d-flex justify-content-between flex-column-fluid flex-column w-100 mw-450px">
            <div class="d-flex flex-stack py-2">
              <div class="me-2" />

              <div class="m-0">
                <span
                  class="text-gray-400 fw-bold fs-5 me-2"
                >
                  Not a Member yet?
                </span>

                <a
                  href="#"
                  class="link-primary fw-bold fs-5"
                >
                  Sign Up
                </a>
              </div>

            </div>

            <div class="py-20">

              <form
                class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                action="#"
              >
                <div class="card-body">
                  <div class="text-start mb-10">
                    <h1
                      class="text-dark mb-3 fs-3x"
                    >
                      Sign In
                    </h1>

                    <div
                      class="text-gray-400 fw-semibold fs-6"
                    >
                      Get unlimited access &amp; earn money
                    </div>
                  </div>

                  <div class="fv-row mb-8 fv-plugins-icon-container">
                    <el-input
                      v-model="loginForm.username"
                      style="width: 100%; height: 40px"
                      placeholder="账号"
                    />
                  </div>

                  <div class="fv-row mb-7 fv-plugins-icon-container">
                    <el-input
                      v-model="loginForm.password"
                      type="password"
                      style="width: 100%; height: 40px"
                      placeholder="密码"
                    />
                  </div>

                  <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-10">
                    <el-checkbox v-model="checked">Remember me</el-checkbox>
                    <div />

                    <a
                      href="#"
                      class="link-primary"
                    >
                      Forgot Password ?
                    </a>
                  </div>

                  <div class="d-flex flex-stack">
                    <el-button
                      style="width: 90px"
                      type="primary"
                      :loading="loadingBtn"
                      @click="handleLogin"
                    >登 录</el-button>

                    <div class="d-flex align-items-center">
                      <div
                        class="text-gray-400 fw-semibold fs-6 me-3 me-md-6"
                      >Or</div>

                      <a
                        href="#"
                        class="symbol symbol-circle symbol-45px w-45px bg-light me-3"
                      >
                        <img
                          alt="Logo"
                          src="@/assets/media/login/qq.png"
                          class="p-4"
                        >
                      </a>

                      <a
                        href="#"
                        class="symbol symbol-circle symbol-45px w-45px bg-light me-3"
                      >
                        <img
                          alt="Logo"
                          src="@/assets/media/login/wechat.png"
                          class="p-4"
                        >
                      </a>

                      <a
                        href="#"
                        class="symbol symbol-circle symbol-45px w-45px bg-light"
                      >
                        <img
                          alt="Logo"
                          src="@/assets/media/login/github.png"
                          class="theme-light-show p-4"
                        >
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="m-0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KeenLogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      loadingBtn: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$Message.warning('账号或密码不能为空')
        return
      }
      this.loadingBtn = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.redirect = '/user'
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        })
      }).finally(() => {
        this.loadingBtn = false
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
  <style>
  .login-bg {
      background-image: url('https://cdn.pixabay.com/photo/2023/04/08/23/32/nature-7910337_960_720.jpg');
  }
  </style>

