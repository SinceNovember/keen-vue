<template>
  <el-form
    ref="form"
    :model="notificationInfo"
    label-width="80px"
    class="form-container"
  >
    <el-row>
      <el-col>
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="notificationInfo.title" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="类型">
          <el-select
            v-model="notificationInfo.type"
            class="w-100"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item
        label="内容"
        prop="content"
      >
        <el-input
          v-model="notificationInfo.content"
          type="textarea"
          :row="10"
        />
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script>
import { addOrUpdateNotificationMessage } from '@/api/message/notification'
import { getStatusOption } from '@/api/option'

export default {
  name: 'NotificationAdd',
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
      notificationInfo: this.dataInfo,
      typeOptions: [
        {
          value: 'DEFAULT',
          label: '默认'
        },
        {
          value: 'SUCCESS',
          label: '成功'
        },
        {
          value: 'INFO',
          label: '信息'
        },
        {
          value: 'WARNING',
          label: '警告'
        },
        {
          value: 'ERROR',
          label: '错误'
        }
      ]
    }
  },
  watch: {
    dataInfo() {
      this.notificationInfo = this.dataInfo
    }
  },
  created() {
    this.loadStatusOptionModel()
  },
  methods: {
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
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addOrUpdateNotificationMessage(this.notificationInfo)
            .then(res => {
              this.$emit('cancel')
              this.$message.success('添加成功')
              this.search()
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form-container {
    padding: 15px 0px;
}
</style>
