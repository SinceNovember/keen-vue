<template>
  <div class="info-container">
    <div class="info-row">
      <div class="info-col">
        <span class="info-title">发送人：</span>
        <span class="info-content">{{ dataInfo.fromName }}</span>
      </div>
      <div class="info-col">
        <span class="info-title">接收人：</span>
        <span class="info-content">{{ dataInfo.toName }}</span>
      </div>
    </div>
    <div class="info-row">
      <div class="info-col">
        <span class="info-title">类型：</span>
        <div
          class="badge fw-bold"
          :class="dataInfo.isRead == 'READ' ? 'badge-light-success' : 'badge-light-danger'"
        >
          {{ dataInfo.isRead | readTypeFilter }}
        </div>
      </div>
      <div class="info-col">
        <span class="info-title">发送时间：</span>
        <span class="info-content">{{ dataInfo.createTime }}</span>
      </div>
    </div>
    <div class="info-row">
      <div class="info-col line">
        <span class="info-title">内容：</span>
        <span
          v-if="dataInfo.contentType == 'TEXT'"
          class="info-content"
          v-html="dataInfo.content"
        />
        <img
          v-else
          class="info-image"
          :src="dataInfo.content"
        >
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.info-image {
    max-width: 240px;
    max-height: 240px;
    border-radius: 6px;
    margin: 0px 8px;
}
</style>
