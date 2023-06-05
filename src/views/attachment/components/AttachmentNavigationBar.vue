<template>
  <div class="d-flex flex-stack mt-10 mb-2">
    <!--begin::Folder path-->
    <div class="badge badge-lg badge-light-primary">
      <div class="d-flex align-items-center flex-wrap">
        <span class="svg-icon svg-icon-2 svg-icon-primary me-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0963 4.92704C20.0963 5.92704 20.8963 7.12705 21.2963 8.32705L17.6963 11.927L8.39633 2.62705C11.8963 1.32705 16.1963 2.02704 19.0963 4.92704ZM2.69633 15.627C3.19633 16.827 3.89634 18.027 4.89634 19.027C7.79634 21.927 11.9963 22.627 15.5963 21.227L6.29634 11.927L2.69633 15.627Z"
              fill="currentColor"
            />
            <path
              opacity="0.3"
              d="M8.39634 2.72705L11.9963 6.32706L2.69634 15.6271C1.29634 12.0271 1.99634 7.82705 4.89634 4.92705C5.89634 3.92705 7.09634 3.22705 8.39634 2.72705ZM11.9963 17.7271L15.5963 21.3271C16.7963 20.8271 17.9963 20.1271 18.9963 19.1271C21.8963 16.2271 22.5963 12.027 21.1963 8.42705L11.9963 17.7271Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <a href="#">Keen</a>
        <i class="bi bi-chevron-right fs-5 text-primary mx-1" />                    <a href="#">themes</a>
        <i class="bi bi-chevron-right fs-5 text-primary mx-1" />                    <a href="#">html</a>
        <i class="bi bi-chevron-right fs-5 text-primary mx-1" />                    demo1
      </div>
    </div>
    <!--end::Folder path-->

    <!--begin::Folder Stats-->
    <div class="badge badge-lg badge-primary">
      <span id="kt_file_manager_items_counter">82 items</span>
    </div>
    <!--end::Folder Stats-->
  </div>
</template>
<script>
export default {
  name: 'AttachmentNavigationBar',
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
