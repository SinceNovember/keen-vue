<template>
  <div class="file-uploader pt-6 pb-15 px-lg-17">
    <!--begin::Input group-->

    <el-upload
      class="upload-container"
      drag
      action=""
      :http-request="handleUpload"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-success="onSuccess"
      :show-file-list="false"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div
        slot="tip"
        class="el-upload__tip"
      >文件大小不能超过20MB</div>
    </el-upload>

    <div
      v-for="(item, index) in fileList"
      :key="index"
      class="file-list"
    >
      <div
        class="file-item"
        @mouseover="item.hover = true"
        @mouseleave="item.hover = false"
      >
        <div class="file-summary">
          <div class="d-flex">
            <div class="file-type-image">
              <img
                :src="item.url"
                height="24"
                width="24"
              >
            </div>
            <div class="d-flex flex-column">
              <span class="text-gray-700 fs-7">{{ item.name }} </span>
              <span class="text-gray-400 fs-8">15 MB</span>
            </div>
          </div>
          <div
            v-if="!item.hover"
            class="file-status"
          >
            <img
              v-if="item.finish && item.status"
              class="file-status-img"
              src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjg1Njk4MTkwNTE2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3ODEiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PHBhdGggZD0iTTUxMiA1MTJtLTUxMiAwYTUxMiA1MTIgMCAxIDAgMTAyNCAwIDUxMiA1MTIgMCAxIDAtMTAyNCAwWiIgZmlsbD0iIzY3RUJCMiIgb3BhY2l0eT0iLjE1IiBwLWlkPSIxNzgyIj48L3BhdGg+PHBhdGggZD0iTTUxMiA4MTQuNTQ1NDU1YTMwMi41NDU0NTUgMzAyLjU0NTQ1NSAwIDAgMS0yMTMuOTM0NTQ1LTUxNi40OCAzMDIuNTQ1NDU1IDMwMi41NDU0NTUgMCAxIDEgNDI3Ljg2OTA5IDQyNy44NjkwOUEzMDAuNTU1NjM2IDMwMC41NTU2MzYgMCAwIDEgNTEyIDgxNC41NDU0NTV6IG0tMTI0LjE0ODM2NC0zMjguMDUyMzY0YTM2LjA3MjcyNyAzNi4wNzI3MjcgMCAwIDAtMjUuNiA2MS40ODY1NDVsOTIuOTk3ODE5IDkzLjczMDkwOWEyOS45MTcwOTEgMjkuOTE3MDkxIDAgMCAwIDQyLjQ2MTA5IDBsMTY1Ljg1MzA5MS0xNjYuNzQ5MDlhMjkuOTI4NzI3IDI5LjkyODcyNyAwIDAgMC00MC4yMjY5MDktNDQuMjE4MTgybC0xMjcuNDE4MTgyIDEwNC44MDg3MjdhMjkuOTA1NDU1IDI5LjkwNTQ1NSAwIDAgMS0zOC41OTc4MTgtMC40ODg3MjdsLTQ1LjkwNTQ1NC0zOS43NjE0NTVhMzYuMDAyOTA5IDM2LjAwMjkwOSAwIDAgMC0yMy41NjM2MzctOC44MDg3Mjd6IiBmaWxsPSIjMjBENzZEIiBwLWlkPSIxNzgzIj48L3BhdGg+PC9zdmc+"
            >
            <img
              v-if="item.finish && !item.status"
              class="file-status-img"
              src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjg1Njk4MjUxNjA1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxOTYiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PHBhdGggZD0iTTUxMiA1MTJtLTUxMiAwYTUxMiA1MTIgMCAxIDAgMTAyNCAwIDUxMiA1MTIgMCAxIDAtMTAyNCAwWiIgZmlsbD0iI0ZGOTc4NCIgb3BhY2l0eT0iLjE1IiBwLWlkPSIyMTk3Ij48L3BhdGg+PHBhdGggZD0iTTUxMiA4MTQuNTQ1NDU1YTMwMi41NDU0NTUgMzAyLjU0NTQ1NSAwIDAgMS0yMTMuOTM0NTQ1LTUxNi40OCAzMDIuNTQ1NDU1IDMwMi41NDU0NTUgMCAxIDEgNDI3Ljg2OTA5IDQyNy44NjkwOUEzMDAuNTU1NjM2IDMwMC41NTU2MzYgMCAwIDEgNTEyIDgxNC41NDU0NTV6IG0wLTE4Ni4zNzk2MzdhNDkuODUwMTgyIDQ5Ljg1MDE4MiAwIDEgMCA0OS44Mzg1NDUgNDkuODM4NTQ2IDQ5Ljg5NjcyNyA0OS44OTY3MjcgMCAwIDAtNDkuODM4NTQ1LTQ5LjgzODU0NnogbS0xOS4zNjI5MDktMjgxLjUzMDE4MmE0Ni4yODk0NTUgNDYuMjg5NDU1IDAgMCAwLTQ1Ljk3NTI3MyA1MS41NDkwOTFsMTkuMzc0NTQ2IDE2OS4xNTc4MThhNDYuMjc3ODE4IDQ2LjI3NzgxOCAwIDAgMCA5MS45MjcyNzIgMGwxOS4zNjI5MDktMTY5LjE2OTQ1NGE0Ni4yNzc4MTggNDYuMjc3ODE4IDAgMCAwLTQ1Ljk3NTI3Mi01MS41NDkwOTF6IiBmaWxsPSIjRkM3RDVEIiBwLWlkPSIyMTk4Ij48L3BhdGg+PC9zdmc+"
            >
          </div>
          <div
            v-else
            class="file-status"
          >
            <img
              class="file-status-img close"
              src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjg1NzAwMTAyMjM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwMjIzIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxwYXRoIGQ9Ik0yMTYuMTI3IDg1Ny4xODVjMCA1NC40OSA0NC4xMzUgOTguNjI0IDk4LjYyNSA5OC42MjRoMzk0LjQ5NmM1NC40OSAwIDk4LjYyNS00NC4xMzQgOTguNjI1LTk4LjYyNFYyNjUuNDM5SDIxNi4xMjd2NTkxLjc0NnogbTY0MS4wNTgtNzM5LjY4Mkg2ODQuNTkyTDYzNS4yOCA2OC4xOTFIMzg4LjcybC00OS4zMTMgNDkuMzEySDE2Ni44MTV2OTguNjI0aDY5MC4zN3YtOTguNjI0eiIgZmlsbD0iI2JmYmZiZiIgcC1pZD0iMTAyMjQiPjwvcGF0aD48L3N2Zz4="
              @click="remove(index)"
            >
          </div>
        </div>
        <el-progress
          :percentage="item.progress"
          :color="item.progressColor"
        />
      </div>
    </div>

    <!-- <el-upload
      class="upload-demo"
      action=""
      :http-request="handleUpload"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-success="onSuccess"
      :on-remove="handleRemove"
      drags
      :show-file-list="false"
    > -->
    <!-- <el-button
      size="small"
      type="primary"
    >点击上传</el-button>
    <div
      slot="tip"
      class="el-upload__tip"
    >只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
    <!--end::Input group-->
  </div>
</template>
<script>
import { uploadAttachment } from '@/api/attachment/attachment'
import * as AttachmentConst from '@/const/attachmentConst'
export default {
  name: 'FileUploader',
  data() {
    return {
      uploadPercent: 0,
      fileList: []
    }
  },
  methods: {
    handleUpload(data, fileList) {
      this.uploadFile(data.file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeUpload(file) {
      const extension = file.name.split('.').pop()
      var fileThumbnail = AttachmentConst.attachmentTypeImage[extension]
      if (!fileThumbnail) {
        fileThumbnail = AttachmentConst.attachmentTypeImage['unknown']
      }
      this.fileList.push({
        name: file.name,
        url: fileThumbnail,
        progress: 0,
        progressColor: '#409eff',
        hover: false,
        finish: false,
        status: false
      })
    },
    uploadFile(data, fileList) {
      const file = new window.File([data], data.name, { type: data.type })
      const currentFile = this.fileList.slice(-1)[0]
      var formData = new FormData()
      formData.append('file', file)
      uploadAttachment(formData, progressEvent => {
        currentFile.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      }).then(res => {
        currentFile.status = true
        currentFile.finish = true
        currentFile.progressColor = '#5cb87a'
      }).catch(err => {
        currentFile.status = false
        currentFile.finish = true
        currentFile.progressColor = '#f56c6c'
        console.log(err)
      })
    },
    remove(idx) {
      this.fileList.splice(idx, 1)
    }

  }
}
</script>
<style lang="scss" scoped>
.file-uploader {

    .upload-container {
        width: 100%;
    }

    .file-item {
        border: 1px solid var(--bs-gray-300);
        border-radius: 4px;
        padding: 14px 12px;
        margin-top: 12px;

        .file-summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;

            .file-type-image {
                border: 1px solid var(--bs-border-color);
                border-radius: 4px;
                padding: 6px;
                margin-right: 6px;
            }

            .file-status-img {
                position: relative;
                top: -10px;
                right: -5px;
                height: 24px;
                width: 24px;
            }

            .close {
                height: 18px;
                width: 18px;
                cursor: pointer;
            }
        }

    }

    ::v-deep {
        .el-upload {
            width: 100%;

            .el-upload-dragger {
                width: 100%;
            }
        }
    }
}
</style>
