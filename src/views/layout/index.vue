<template>
  <el-card shadow="never">
    <div class="layout-tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="Main"
          name="main"
        >
          <main-builder />
        </el-tab-pane>
        <el-tab-pane
          label="Sidebar"
          name="sidebar"
        >
          <sidebar-builder />
        </el-tab-pane>
        <el-tab-pane
          label="Header"
          name="header"
        >
          <header-builder />
        </el-tab-pane>
        <el-tab-pane
          label="Toolbar"
          name="toolbar"
        >
          <toolbar-builder />
        </el-tab-pane>
      </el-tabs>

    </div>
  </el-card>

</template>
<script>
import MainBuilder from './components/MainBuilder.vue'
import SidebarBuilder from './components/SidebarBuilder.vue'
import HeaderBuilder from './components/HeaderBuilder.vue'
import ToolbarBuilder from './components/ToolbarBuilder.vue'
export default {
  name: 'LayoutBuilder',
  components: {
    MainBuilder,
    SidebarBuilder,
    ToolbarBuilder,
    HeaderBuilder
  },
  data() {
    return {
      activeName: 'main'
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.el-tabs__item {
    flex: 0 !important;
    color: var(--bs-gray-500) !important;
}

.el-tabs__content {
    margin: 1.25rem 2.25rem !important;
}
</style>
