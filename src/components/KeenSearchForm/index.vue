<template>
  <el-popover
    placement="bottom-start"
    trigger="click"
  >
    <div class="search-header">
      <img
        alt="Logo"
        src="@/assets/media/logos/default-small.svg"
      >
      <span class="header-title ms-1">
        {{ title }}
      </span>
    </div>

    <el-form
      ref="form"
      label-width="80px"
      :style="{ width: width + 'px' }"
      class="search-form"
      label-position="top"
      @submit.native.prevent
    >
      <slot />
      <div class="search-bottom">
        <el-button @click="reset">重 置</el-button>
        <el-button
          type="primary"
          @click="search"
        >搜 索</el-button>
      </div>

    </el-form>
    <a
      slot="reference"
      href="#"
      class="btn btn-sm btn-icon btn-color-primary btn-light  btn-active-light-primary"
    >
      <span class="svg-icon svg-icon-3 m-0"><svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="6"
          width="16"
          height="3"
          rx="1.5"
          fill="currentColor"
        />
        <rect
          opacity="0.3"
          y="12"
          width="8"
          height="3"
          rx="1.5"
          fill="currentColor"
        />
        <rect
          opacity="0.3"
          width="12"
          height="3"
          rx="1.5"
          fill="currentColor"
        />
      </svg>
      </span>
    </a>
  </el-popover>
</template>
<script>
export default {
  name: 'KeenSearch',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '搜索条件'
    },
    width: {
      type: Number,
      default: 300
    },
    showSave: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {
    reset() {
      this.$emit('reset')
    },
    search() {
      this.$emit('search')
    }
  }
}
</script>
<style lang="scss" scoped>
.search-header {
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--bs-border-dashed-color);

  .header-title {
    color: var(--bs-text-gray-700);
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
  }
}

.search-form {
  padding: 4px;

  ::v-deep .el-form-item {
    margin-bottom: 5px;
  }

  .search-bottom {
    margin-top: 10px;
    float: right;
  }
}
</style>
