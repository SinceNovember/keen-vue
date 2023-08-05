<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.configName"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入参数名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="参数值">
              <el-input v-model="params.configValue" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述">
              <el-input
                v-model="params.description"
                type="textarea"
                :row="4"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </keen-search-form>
    </div>

    <header-button-group
      @refresh="refreshTable"
      @add="openAdd"
      @delete="deleteSelected"
    />
    <keen-dialog
      :visible.sync="dialog"
      :title="`${systemConfigInfo.id ? '修改' : '添加'}系统参数`"
      @cancel="dialog = false"
      @save="save"
    >
      <system-config-add
        ref="add"
        :data-info="systemConfigInfo"
        @search="refreshTable"
        @cancel="cancel"
      />
    </keen-dialog>
  </div>
</template>

<script>
import SystemConfigAdd from './SystemConfigAdd'
export default {
  name: 'SystemConfigHeader',
  components: {
    SystemConfigAdd
  },
  data() {
    return {
      dialog: false,
      params: {
        configName: '',
        configValue: '',
        description: ''
      },
      systemConfigInfo: {
        orderNum: 0
      }
    }
  },
  methods: {
    openAdd() {
      this.dialog = true
      this.systemConfigInfo = {
        orderNum: 0
      }
    },
    openEditDialog(systemConfigInfo) {
      this.systemConfigInfo = systemConfigInfo
      this.dialog = true
    },
    save() {
      this.$refs.add.save()
    },
    search() {
      this.$emit('search', this.params)
    },
    refreshTable() {
      this.$emit('search')
    },
    deleteSelected() {
      this.$emit('deleteSelected')
    },
    resetForm() {
      this.params.configName = ''
      this.params.configValue = ''
      this.params.description = ''
      this.search()
    },
    cancel() {
      this.dialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.search-form {
  width: 300px;

  ::v-deep .el-form-item {
    margin-bottom: 5px;
  }
}
</style>
