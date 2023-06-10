<template>
  <el-card
    shadow="nerve"
    class="header-bg"
  >
    <!--begin::Card header-->
    <div class="d-flex align-items-center pt-10">
      <!--begin::Icon-->
      <div class="d-flex symbol symbol-circle me-5">
        <div class="symbol-label bg-transparent text-primary border border-secondary border-dashed me-5">
          <img
            height="24"
            width="24"
            src="@/assets/media/stock/hd.png"
          >
        </div>
        <!--end::Icon-->

        <!--begin::Title-->
        <div class="d-flex flex-column">
          <h2 class="mb-1">附件管理</h2>
          <div class="text-muted fw-bold">
            <a href="#">Keenthemes</a> <span class="mx-3">|</span> <a href="#">Attachment Manager</a> <span class="mx-3">|</span> {{ formatStorageSize }} <span class="mx-3">|</span> {{ itemCount }} items
          </div>
        </div>
        <!--end::Title-->
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body pb-0">
      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap">
          <!--begin::Nav item-->
          <li class="nav-item">
            <a
              class="nav-link text-active-primary me-6 active"
              href="#"
            >
              附件
            </a>
          </li>
          <!--end::Nav item-->

          <!--begin::Nav item-->
          <li class="nav-item">
            <a
              class="nav-link text-active-primary me-6"
              href="#"
            >
              设置
            </a>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
    <!--end::Card body-->
  </el-card>
</template>
<script>
import { getAttachmentInfoSummary } from '@/api/attachment/attachment'
export default {
  name: 'AttachmentHeader',
  data() {
    return {
      itemCount: 0,
      formatStorageSize: ''
    }
  },
  mounted() {
    this.loadAttachmentInfoSummary()
  },
  methods: {
    loadAttachmentInfoSummary() {
      getAttachmentInfoSummary()
        .then(res => {
          const { itemCount, formatStorageSize } = res.data
          this.itemCount = itemCount
          this.formatStorageSize = formatStorageSize
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-bg {
    background-size: auto calc(100% + 10rem);
    background-position: 100%;
    background-repeat: no-repeat;
    background-image: url('~@/assets/media/illustrations/empty-chat.png')
}
</style>
