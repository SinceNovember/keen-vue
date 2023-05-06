<template>
  <el-card
    class="full-card mb-9"
    shadow="never"
  >
    <div
      class="bgi-size-cover h-200px"
      :style="{ backgroundImage: 'url(' + profileImage + ')' }"
    >
      <el-upload
        class="upload"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="changeUpload"
      >
        <i class="bi bi-gear-fill" />
      </el-upload>

    </div>

    <div class="mt-n30 pb-10 mx-9">
      <div class="m-0">
        <div class="d-flex flex-stack align-items-end pb-4 mt-n19">
          <div class="symbol symbol-125px symbol-lg-150px symbol-fixed position-relative mt-n3">
            <img
              :src="userInfo.avatar"
              alt="image"
              class="border border-white border-4"
              style="border-radius: 20px"
            >
            <div
              class="position-absolute translate-middle bottom-0 start-100 ms-n1 mb-9 bg-success rounded-circle h-15px w-15px"
            />
          </div>

        </div>

        <div class="d-flex flex-stack flex-wrap align-items-end">
          <div class="d-flex flex-column ps-4">
            <div class="d-flex align-items-center mb-2">
              <a
                href="#"
                class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
              >{{
                userInfo.nickname
              }}</a>
              <a href="#">
                <span class="svg-icon svg-icon-1 svg-icon-primary"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z"
                    fill="white"
                  />
                </svg></span>
              </a>
            </div>

            <span class="fw-bold text-gray-600 fs-6 mb-2 d-block">
              {{ userInfo.description }}
            </span>

            <div class="d-flex align-items-center flex-wrap fw-semibold fs-7 pe-2">
              <a
                href="#"
                class="d-flex align-items-center text-gray-400 text-hover-primary"
              >
                {{ userInfo.deptName }}
              </a>
              <span
                v-if="userInfo.roleNames"
                class="bullet bullet-dot h-5px w-5px bg-gray-400 mx-3"
              />
              <span
                v-for="(item, index) in userInfo.roleNames"
                :key="index"
                class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div
            v-if="!isCurrent"
            class="d-flex"
          >
            <a
              id="kt_drawer_chat_toggle"
              href="#"
              class="btn btn-sm btn-light me-3"
            >Send Message</a>

            <button
              id="kt_user_follow_button"
              class="btn btn-sm btn-primary"
            >
              <span class="svg-icon svg-icon-3 d-none"><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  d="M10 18C9.7 18 9.5 17.9 9.3 17.7L2.3 10.7C1.9 10.3 1.9 9.7 2.3 9.3C2.7 8.9 3.29999 8.9 3.69999 9.3L10.7 16.3C11.1 16.7 11.1 17.3 10.7 17.7C10.5 17.9 10.3 18 10 18Z"
                  fill="currentColor"
                />
                <path
                  d="M10 18C9.7 18 9.5 17.9 9.3 17.7C8.9 17.3 8.9 16.7 9.3 16.3L20.3 5.3C20.7 4.9 21.3 4.9 21.7 5.3C22.1 5.7 22.1 6.30002 21.7 6.70002L10.7 17.7C10.5 17.9 10.3 18 10 18Z"
                  fill="currentColor"
                />
              </svg>
              </span>
              <span class="indicator-label">
                Follow</span>

              <span class="indicator-progress">
                Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <cropper
      ref="cropper"
      :cropper-img="cropperImg"
      @upload-img="uploadImg"
    />
  </el-card>
</template>
<script>
import { updateProfileImage, uploadImg } from '@/api/system/user'
import Cropper from '@/components/Cropper'

export default {
  name: 'AccountProfile',
  components: {
    Cropper
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    isCurrent: Boolean
  },

  data() {
    return {
      fileName: '',
      cropperImg: '' // 需要裁剪的图片
    }
  },
  computed: {
    profileImage() {
      return this.userInfo.profileImage ? this.userInfo.profileImage : require('@/assets/media/misc/profile-head-bg.jpg')
    }
  },
  methods: {
    changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      // 提前存一下文件名字 一会转文件的时候能用
      this.fileName = file.name
      const url = URL.createObjectURL(file.raw)
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.cropperImg = url
        this.$refs.cropper.openDialog()
      })
    },
    uploadImg(data) {
      const file = new window.File([data], this.fileName, { type: 'image/jpeg' })
      var formData = new FormData()
      formData.append('file', file)
      uploadImg(formData).then(res => {
        updateProfileImage({
          profileImage: res.data
        }).then(res => {
          // this.userInfo.profileImage = res.data
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bgi-size-cover {
    position: relative;
    background-position: 100% 50%;

    i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 16px;
        color: #eaeaea;
    }
}
</style>
