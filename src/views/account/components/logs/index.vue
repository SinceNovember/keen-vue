<template>
  <div class="log-main">
    <login-log ref="loginLogRef" />
    <operate-log
      ref="operateLogRef"
      class="mt-10"
    />
  </div>
</template>
<script>
import LoginLog from './components/LoginLog'
import OperateLog from './components/OperateLog'
export default {
  name: 'AccountLogs',
  components: {
    LoginLog,
    OperateLog
  },
  data() {
    return {
    }
  },
  watch: {
    $route(to, from) {
      this.loadLogs()
    }
  },
  methods: {
    loadLogs() {
      this.$refs.loginLogRef.refreshTable()
      this.$refs.operateLogRef.refreshTable()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
