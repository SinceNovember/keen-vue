<template>
  <div class="account-container">
    <profile
      :user-info="userInfo"
      :is-current="isCurrent"
    />
    <navbar
      :active-tab="activeTab"
      :is-current="isCurrent"
      @changeTab="changeTab"
    />
    <overview
      v-if="activeTab == 'overview'"
      :user-info="userInfo"
      :is-current="isCurrent"
    />
    <settings
      v-if="activeTab == 'settings'"
      :user-info="userInfo"
      @refreshInfo="loadUserInfo"
    />
    <notification v-if="activeTab == 'notifications'" />
    <logs v-if="activeTab == 'logs'" />
  </div>
</template>
<script>
import { getUser, getLoginUserInfo } from '@/api/system/user'
import { Profile, Navbar, Overview, Settings, Notification, Logs } from './components'
export default {
  name: 'KeenAccount',
  components: {
    Profile,
    Navbar,
    Overview,
    Settings,
    Notification,
    Logs
  },
  data() {
    return {
      isCurrent: this.$route.query.id == null,
      activeTab: this.$route.query.tab == null ? 'overview' : this.$route.query.tab,
      userInfo: {}
    }
  },
  watch: {
    $route(to, from) {
      this.loadUserInfo()
      this.isCurrent = true
      this.activeTab = this.$route.query.tab
    }
  },
  mounted() {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo() {
      var mth
      if (!this.$route.query.id) {
        mth = getLoginUserInfo()
      } else {
        mth = getUser({
          id: this.$route.query.id
        })
      }
      mth.then(res => {
        this.userInfo = res.data
      })
    },
    changeTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>
<style lang="scss" scoped></style>
