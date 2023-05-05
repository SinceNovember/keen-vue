<template>
  <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
    <li
      v-for="(item, index) in levelList"
      :key="index"
      class="breadcrumb-item text-muted"
    >
      <router-link
        ref="tag"
        :key="index"
        tag="a"
        class="text-muted text-hover-primary"
        :to="{ path: item.meta.path }"
      >
        {{ item.meta.title }}
      </router-link>
      <span
        v-if="index < levelList.length - 1"
        class="bullet bg-gray-400 w-6px h-2px ms-2"
      />
    </li>
  </ul>
</template>
<script>
export default {
  name: 'KeenBreadcrumb',
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.levelList = matched.filter(item => {
        item.meta.path = item.path
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      })
    }
  }
}
</script>
<style></style>
