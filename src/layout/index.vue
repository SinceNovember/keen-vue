<template>
  <div class="app-page  flex-column flex-column-fluid">
    <page-header />
    <div class="app-wrapper flex-column flex-row-fluid">
      <sidebar />
      <app-main />
      <page-footer />
    </div>
    <settings />
  </div>
</template>
<script>
import { getLoginUserInfo } from '@/api/system/user'
import { PageHeader, Sidebar, AppMain, Settings, PageFooter } from './components'
export default {
  name: 'KeenLayout',
  components: {
    PageHeader,
    Sidebar,
    AppMain,
    Settings,
    PageFooter
  },
  mounted() {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo() {
      getLoginUserInfo().then(res => {
        this.$store.dispatch('user/saveUserInfo', res.data)
      })
    }
  }
}
</script>
