<template>
  <el-dialog
    ref="dialog"
    title="提示"
    :width="width + 'px'"
    :top="top + 'px'"
    :close-on-click-modal="false"
    :visible.sync="modalVisible"
    :before-close="dialogClose"
    :append-to-body="appendBody"
    @hook:mounted="$refs.dialog.rendered = rendered"
  >
    <div slot="title">
      <img
        alt="Logo"
        src="@/assets/media/logos/default-small.svg"
      >
      <span class="header-title">
        {{ title }}
      </span>
    </div>
    <slot />
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        v-if="showClose"
        @click="cancel"
      >取 消</el-button>
      <el-button
        v-if="showSave"
        type="primary"
        @click="save"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'KeenDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: Number,
      default: 680
    },
    top: {
      type: Number,
      default: 50
    },
    showSave: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    appendBody: {
      type: Boolean,
      default: false
    },
    rendered: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalVisible: this.visible
    }
  },
  watch: {
    visible(newVal) {
      this.modalVisible = newVal
    }
  },
  methods: {
    dialogClose() {
      this.$emit('update:visible', false)
      this.$emit('beforeClose')
    },
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit('save')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
