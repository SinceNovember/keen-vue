<template>
  <el-form
    ref="formValidate"
    :model="userInfo"
    label-width="80px"
    class="form-container"
  >
    <div class="image-input image-input-outline image-input-placeholder image-input-position">
      <img
        class="image-input-wrapper w-150px h-150px"
        :src="userInfo.avatar"
      >
      <el-upload
        class="upload"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="changeUpload"
      >
        <label
          class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          data-kt-image-input-action="change"
        >
          <i class="bi bi-pencil-fill fs-7" />
        </label>
      </el-upload>
      <span
        class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
        data-kt-image-input-action="remove"
        @click="cancelAvatar"
      >
        <i class="bi bi-x fs-2" />
      </span>
    </div>
    <el-row class="w-75">
      <el-col :span="20">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" />
        </el-form-item>
      </el-col>

    </el-row>
    <el-row class="w-75">
      <el-col :span="20">
        <template v-if="userInfo.id">
          <el-form-item label="密码">
            <el-input
              value="************"
              disabled
              type="password"
            />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="密码">
            <el-input
              v-model="userInfo.password"
              type="password"
            />
          </el-form-item>
        </template>
      </el-col>
    </el-row>
    <el-row class="w-75">
      <el-col :span="20">
        <el-form-item label="昵称">
          <el-input v-model="userInfo.nickname" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="手机号">
          <el-input v-model="userInfo.mobile" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="性别">
          <el-select
            v-model="userInfo.sex"
            class="w-100"
            placeholder="请选择性别"
          >
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="状态">
          <el-select
            v-model="userInfo.status"
            class="w-100"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="部门">
          <tree-select
            :value="userInfo.deptId"
            :options="treeModelData"
            class="w-100"
            @getValue="getValue($event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="角色">
          <el-select
            v-model="userInfo.roleIds"
            class="w-100"
            multiple
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="简介">
        <el-input
          v-model="userInfo.description"
          type="textarea"
          :row="4"
        />
      </el-form-item>
    </el-row>
    <cropper
      ref="cropper"
      :cropper-img="cropperImg"
      @upload-img="uploadImg"
    />
  </el-form>
</template>
<script>
import { addOrUpdateUser } from '@/api/system/user'
import { uploadImage } from '@/api/attachment/attachment'
import { getSexOption, getStatusOption } from '@/api/option'
import { fetchDeptTreeModel } from '@/api/system/dept'
import { fetchRoleOptionModel } from '@/api/system/role'
import TreeSelect from '@/components/TreeSelect'
import Cropper from '@/components/Cropper'

export default {
  name: 'UserAdd',
  components: {
    TreeSelect,
    Cropper
  },
  props: {
    dataInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      userInfo: this.dataInfo,
      loading: false,
      fileName: '',
      cropperImg: '', // 需要裁剪的图片
      treeModelData: [],
      roleOptions: [],
      sexOptions: [
        {
          value: 'MALE',
          label: '男'
        },
        {
          value: 'FEMALE',
          label: '女'
        },
        {
          value: 'UNKNOWN',
          label: '未知'
        }
      ],
      statusOptions: [
        {
          value: 'VALID',
          label: '启用'
        },
        {
          value: 'LOCK',
          label: '禁用'
        }
      ]

    }
  },
  watch: {
    dataInfo() {
      this.userInfo = this.dataInfo
    }
  },
  created() {
    this.loadTreeModel()
    this.loadRoleOptionModel()
    this.loadSexOptionModel()
    this.loadStatusOptionModel()
  },
  methods: {
    loadTreeModel() {
      fetchDeptTreeModel().then(res => {
        this.treeModelData = res.data
      })
    },
    loadRoleOptionModel() {
      fetchRoleOptionModel().then(res => {
        this.roleOptions = res.data
      })
    },
    loadSexOptionModel() {
      getSexOption().then(res => {
        if (res.data) {
          this.sexOptions = res.data
        }
      })
    },
    loadStatusOptionModel() {
      getStatusOption().then(res => {
        if (res.data) {
          this.statusOptions = res.data
        }
      })
    },
    search() {
      this.$emit('search')
    },
    save() {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          addOrUpdateUser(this.userInfo)
            .then(res => {
              this.$emit('cancel')
              this.$message.success('添加成功')
              this.search()
            })
        }
      })
    },
    cancelAvatar() {
      this.userInfo.avatar = require('@/assets/media/avatars/300-1.jpg')
    },
    getValue(value) {
      this.userInfo.deptId = value
    },
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
      uploadImage(formData).then(res => {
        this.userInfo.avatar = res.data
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.form-container {
    padding: 15px 0px;

    .image-input-position {
        position: absolute;
        right: 70px;
    }

    .image-input {
        [data-kt-image-input-action=remove] {
            top: 86%;
        }
    }
}

.UploadImg {
    .el-upload {
        display: block;
        width: 100px;
        margin: 30px auto 0;
    }

    .upload-icon {
        display: block;
        margin: 0 auto;
        height: 44px;
        width: 52px;
        // background-image: url(~@/assets/img/upload-image.png);
        background-position: 100% 100%;
        margin-bottom: 20px;
    }

    .video-image {
        display: flex;

        figure {
            width: 100px;

            img {
                width: 100%;
                display: block;
            }
        }
    }
}

.cropper-content {
    .cropper {
        text-align: center;
        width: auto;
        height: 400px;
    }
}
</style>
