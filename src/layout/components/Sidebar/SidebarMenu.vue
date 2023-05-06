<template>
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <div class="app-sidebar-wrapper hover-scroll-overlay-y my-5">
      <div class=" menu menu-column menu-rounded menu-sub-indention fw-semibold px-3">
        <sidebar-menu-item
          v-for="(route, index) in menus"
          :key="index"
          :route="route.id ? route :
            route.children[0]"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SidebarMenuItem from './SidebarMenuItem.vue'
export default {
  name: 'SidebarMenu',
  components: {
    SidebarMenuItem
  },
  data() {
    return {
      menus: global.antRouter
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
</style>
