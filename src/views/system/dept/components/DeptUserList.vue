<template>
  <div class="list-main">
    <div
      v-for="(item, index) in users"
      :key="index"
      class="anchor mb-4"
    >
      <el-avatar
        :size="48"
        :src="item.avatar"
      />

      <span class="ms-4">{{ item.nickname }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DeptUserList',
  props: {
    users: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.list-main {
    height: 500px;
    margin-right: -15px;
    color: var(--bs-text-gray-700);
    overflow:scroll;
}
</style>
