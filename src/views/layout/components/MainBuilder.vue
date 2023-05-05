<template>
  <div class="tab-content pt-3">
    <div
      class="tab-pane active "
      role="tabpanel"
    >
      <div class="row">
        <div class="col-lg-6 pe-lg-15">
          <div class="form-group">
            <div class="mb-6">
              <h4 class="fw-bold text-dark">Theme Mode</h4>
              <div class="fw-semibold text-muted fs-7 d-block lh-1">
                Enjoy Dark &amp; Light modes.
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <label
                  class="form-check-image "
                  :class="{ 'active': settings.theme == 'light' }"
                  @click="changeTheme('light')"
                >
                  <div class="form-check-wrapper">
                    <img
                      src="@/assets/media/misc/layout/demo-light.png"
                      class="mw-100"
                      alt=""
                    >
                  </div>
                  <el-radio
                    v-model="settings.theme"
                    label="light"
                  >
                    <span class="fw-bold text-gray-700">Light</span>
                  </el-radio>
                </label>
              </div>
              <div class="col-6">
                <label
                  class="form-check-image"
                  :class="{ 'active': settings.theme == 'dark' }"
                  @click="changeTheme('dark')"
                >
                  <div class="form-check-wrapper">
                    <img
                      src="@/assets/media/misc/layout/demo-dark.png"
                      class="mw-100"
                      alt=""
                    >
                  </div>
                  <el-radio
                    v-model="settings.theme"
                    label="dark"
                  ><span
                    class=" fw-bold text-gray-700"
                  >Dark</span></el-radio>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="separator separator-dashed my-6" />
      <div class="form-group">
        <div class="d-flex flex-column mb-4">
          <h4 class="fw-bold text-dark">Width Mode</h4>
          <div class="fs-7 fw-semibold text-muted">Page width options</div>
        </div>
        <div class="d-flex">
          <el-radio-group
            v-model="settings.widthMode.name"
            @change="changeWidthMode"
          >
            <el-radio label="default"><span class="text-gray-700 fw-bold">Default</span></el-radio>
            <el-radio label="fluid"><span class="text-gray-700 fw-bold">Fluid</span></el-radio>
            <el-radio label="fixed"><span class="text-gray-700 fw-bold">Fixed</span></el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="separator separator-dashed my-6" />

      <div class="row">
        <div class="form-group">
          <div class="mb-6">
            <h4 class="fw-bold text-dark">Layouts</h4>
            <span class="fw-semibold text-muted fs-7 lh-1">
              4 main layout options.
            </span>
          </div>
          <div class="row gy-5">
            <div class="col-lg-3">
              <label
                class="form-check-image"
                :class="{ 'active': settings.layout.color == 'dark' && settings.layout.type == 'sidebar' }"
                @click="changeLayout('dark-sidebar')"
              >
                <div class="form-check-wrapper">
                  <img
                    src="@/assets/media/misc/layout/dark-sidebar.png"
                    class="mw-100"
                    alt=""
                  >
                </div>

                <div class="form-check">
                  <el-radio
                    v-model="layoutSettings"
                    label="dark-sidebar"
                  >
                    <span class="fw-bold text-gray-700">Dark Sidebar </span>
                  </el-radio>
                </div>
              </label>
            </div>
            <div class="col-lg-3">
              <label
                class="form-check-image"
                :class="{ 'active': settings.layout.color == 'light' && settings.layout.type == 'sidebar' }"
                @click="changeLayout('light-sidebar')"
              >
                <div class="form-check-wrapper">
                  <img
                    src="@/assets/media/misc/layout/light-sidebar.png"
                    class="mw-100"
                    alt=""
                  >
                </div>

                <div
                  class="form-check form-check-custom form-check-success form-check-sm form-check-solid"
                >
                  <el-radio
                    v-model="layoutSettings"
                    label="light-sidebar"
                  >
                    <span class="fw-bold text-gray-700">Light Sidebar </span>
                  </el-radio>
                </div>
              </label>
            </div>
            <div class="col-lg-3">
              <label
                class="form-check-image"
                :class="{ 'active': settings.layout.color == 'dark' && settings.layout.type == 'header' }"
                @click="changeLayout('dark-header')"
              >
                <div class="form-check-wrapper">
                  <img
                    src="@/assets/media/misc/layout/dark-header.png"
                    class="mw-100"
                    alt=""
                  >
                </div>

                <div
                  class="form-check form-check-custom form-check-success form-check-sm form-check-solid"
                >
                  <el-radio
                    v-model="layoutSettings"
                    label="dark-header"
                  >
                    <span class="fw-bold text-gray-700">Dark Header </span>
                  </el-radio>
                </div>
              </label>
            </div>
            <div class="col-lg-3">
              <label
                class="form-check-image"
                :class="{ 'active': settings.layout.color == 'light' && settings.layout.type == 'header' }"
                @click="changeLayout('light-header')"
              >
                <div class="form-check-wrapper">
                  <img
                    src="@/assets/media/misc/layout/light-header.png"
                    class="mw-100"
                    alt=""
                  >
                </div>

                <div
                  class="form-check form-check-custom form-check-success form-check-sm form-check-solid"
                >
                  <el-radio
                    v-model="layoutSettings"
                    label="light-header"
                  >
                    <span class="fw-bold text-gray-700">Light Header </span>
                  </el-radio>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutMain',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['settings']),
    layoutSettings() {
      return this.settings.layout.color + '-' + this.settings.layout.type
    }
  },
  methods: {
    changeTheme(val) {
      this.$store.dispatch('app/changeTheme', val)
    },
    changeLayout(val) {
      this.$store.dispatch('app/changeLayout', val)
    },
    changeWidthMode(val) {
      this.$store.dispatch('app/changeWidthMode', val)
    }
  }
}
</script>
