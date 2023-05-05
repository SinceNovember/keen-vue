<template>
  <div class="rounded bg-gray-200 d-flex flex-stack flex-wrap mb-9 p-2">
    <ul class="nav flex-wrap border-transparent">
      <li class="nav-item my-1">
        <a
          class="btn btn-sm btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1 "
          :class="{ 'active': activeTab == 'overview' }"
          @click="changeTab('overview')"
        >
          Overview </a>
      </li>
      <li
        v-if="isCurrent"
        class="nav-item my-1"
      >
        <a
          class="btn btn-sm btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1 "
          :class="{ 'active': activeTab == 'settings' }"
          @click="changeTab('settings')"
        >

          Settings </a>
      </li>
      <li class="nav-item my-1">
        <a
          class="btn btn-sm btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1
                                            "
          :class="{ 'active': activeTab == 'notifications' }"
          @click="changeTab('notifications')"
        >

          Notifications </a>
      </li>

      <li class="nav-item my-1">
        <a
          class="btn btn-sm btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1  "
          :class="{ 'active': activeTab == 'logs' }"
          @click="changeTab('logs')"
        >

          Logs </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AccountNavbar',
  props: {
    activeTab: {
      type: String,
      default: null
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    changeTab(tab) {
      this.$emit('changeTab', tab)
    }
  }
}
</script>
<style lang="scss" scoped></style>
