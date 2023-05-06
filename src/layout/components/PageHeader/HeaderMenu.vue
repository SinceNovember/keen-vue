<template>
  <div class="app-header-menu app-header-mobile-drawer align-items-stretch">
    <div
      class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
    >
      <header-menu-item
        v-for="(route, index) in menus"
        :key="index"
        :route="route"
        @updateRouteHover="updateRouteHover"
      />
    </div>
  </div>
</template>
<script>
import HeaderMenuItem from './HeaderMenuItem.vue'
export default {
  name: 'HeaderMenu',
  components: {
    HeaderMenuItem
  },
  data() {
    return {
      menus: global.antRouter
    }
  }
}
</script>
<style>

</style>
