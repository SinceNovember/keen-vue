<template>
  <div class="info-container">
    <div class="info-row">
      <div class="info-col line">
        <span class="info-title">标题：</span>
        <span class="info-content">{{ dataInfo.title }}</span>
      </div>
    </div>

    <div class="info-row">
      <div class="info-col">
        <span class="info-title">通知时间：</span>
        <span class="info-content">{{ dataInfo.createTime }}</span>
      </div>
      <div class="info-col">
        <span class="info-title">类型：</span>
        <span class="info-content">
          <div
            class="badge fw-bold"
            :class="dataInfo.type | noticationTypeBadgetFilter"
          >
            {{ dataInfo.type | noticationTypeFilter }}
          </div>
        </span>
      </div>
    </div>
    <div class="info-row">
      <div class="info-col line">
        <span class="info-title">内容：</span>
        <span class="info-content">{{ dataInfo.content }}</span>
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
