<template>
  <div class="app-header ">
    <div
      id="kt_app_header_container"
      class="app-container  container-fluid d-flex align-items-stretch justify-content-between "
    >
      <div
        v-if="settings.layout.type == 'header'"
        class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15"
      >
        <logo />
      </div>
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
      >
        <header-menu v-if="settings.header.content == 'menu'" />
        <page-title v-else />
        <header-navbar />
      </div>
    </div>
  </div>
</template>
<script>
import Logo from '../Logo'
import PageTitle from '../PageTitle'
import HeaderMenu from './HeaderMenu'
import HeaderNavbar from './HeaderNavbar'
import { mapGetters } from 'vuex'

export default {
  name: 'PageHeader',
  components: {
    Logo,
    PageTitle,
    HeaderMenu,
    HeaderNavbar
  },
  computed: {
    ...mapGetters(['settings'])
  }
}
</script>
<style>

</style>
