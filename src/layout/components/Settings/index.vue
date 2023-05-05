<template>
  <div class="kt_app_setting_wrapper ">
    <el-drawer
      :visible.sync="settingsDrawer"
      :with-header="false"
    >
      <layout-settings @closeDrawer="closeDrawer" />
    </el-drawer>
    <button
      class="btn btn-dark app-layout-builder-toggle lh-1 py-4 "
      @click="openDrawer"
    >
      <i class="fonticon-equalizer fs-4 me-1" /> Customize
    </button>
  </div>
</template>
<script>
import LayoutSettings from './LayoutSettings'
export default {
  name: 'KeenSettings',
  components: {
    LayoutSettings
  },
  data() {
    return {
      settingsDrawer: false
    }
  },
  methods: {
    openDrawer() {
      this.settingsDrawer = true
    },
    closeDrawer() {
      this.settingsDrawer = false
    }
  }
}
</script>
