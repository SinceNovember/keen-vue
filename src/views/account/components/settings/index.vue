<template>
  <div class="settings-container">
    <profile-settings
      :user-info="userInfo"
      class="mb-10"
      @refreshInfo="refreshInfo"
    />
    <login-settings
      :user-info="userInfo"
      @refreshInfo="refreshInfo"
    />
  </div>
</template>
<script>
import ProfileSettings from './components/ProfileSettings'
import LoginSettings from './components/LoginSettings'
export default {
  name: 'AccountSettings',
  components: {
    ProfileSettings,
    LoginSettings
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    refreshInfo() {
      this.$emit('refreshInfo')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
