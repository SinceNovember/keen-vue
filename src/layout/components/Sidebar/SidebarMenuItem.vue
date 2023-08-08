<template>
  <div
    data-kt-menu-trigger="click"
    class="menu-item menu-accordion"
    :class="{ 'show': route.expand, 'pt-5': route.isHeader }"
  >
    <!-- <div v-if="route.isHeader" class="menu-content">
            <span class="menu-heading fw-bold text-uppercase fs-7">
                {{ route.meta.title }}
            </span>
        </div> -->
    <span
      v-if="hasChild(route.children)"
      class="menu-link"
      @click="toggleMenu(route)"
    >
      <span
        v-if="route.meta.icon"
        class="menu-icon"
      >
        <i
          class="fs-3 "
          :class="route.meta.icon"
        />
      </span>
      <span
        v-else
        class="menu-bullet"
      >
        <span class="bullet bullet-dot" />
      </span>
      <span class="menu-title">{{ route.meta.title }} </span>
      <!-- <span class="menu-badge"><span class="badge badge-success">3</span></span> -->
      <span class="menu-arrow" />
    </span>
    <router-link
      v-else
      ref="tag"
      :key="route.path"
      tag="span"
      class="menu-link"
      :to="{ path: route.path, fullPath: route.fullPath }"
    >
      <span
        v-if="route.meta.icon"
        class="menu-icon"
      >
        <i
          class="fs-3 "
          :class="route.meta.icon"
        />
      </span>
      <span
        v-else
        class="menu-bullet"
      >
        <span class="bullet bullet-dot" />
      </span>
      <span class="menu-title">{{ route.meta.title }}</span>
    </router-link>
    <transition name="slide">
      <div
        v-if="hasChild(route.children)"
        class="menu-sub menu-sub-accordion"
      >
        <sidebar-menu-item
          v-for="(subMenu, index) in route.children"
          :key="index"
          :route="subMenu"
        />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'SidebarMenuItem',
  props: {
    route: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      selectedId: ''
    }
  },
  methods: {
    hasChild(children = []) {
      if (children.length > 0) {
        return true
      }
      return false
    },
    toggleMenu(route) {
      route.expand = !route.expand
    },
    checkName(route) {
      this.selectedId = route.id
    }
  }

}
</script>
