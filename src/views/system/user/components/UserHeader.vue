<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.nickname"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入用户昵称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item
              label="用户名"
            >
              <el-input
                v-model="params.username"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="部门">
              <tree-select
                :value="params.deptId"
                :options="treeModelData"
                class="w-100"
                @getValue="getValue($event)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="状态">
              <el-select
                v-model="params.status"
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
      </keen-search-form>
    </div>

    <header-button-group
      @refresh="refreshTable"
      @add="openAdd"
      @delete="deleteSelected"
    />
    <keen-dialog
      :visible.sync="dialog"
      title="添加用户"
      :width="760"
      @cancel="dialog = false"
      @save="save"
    >
      <user-add
        ref="add"
        :data-info="userInfo"
        @search="refreshTable"
        @cancel="cancel"
      />
    </keen-dialog>

  </div>
</template>
<script>
import { fetchDeptTreeModel } from '@/api/system/dept'
import { getStatusOption } from '@/api/option'
import UserAdd from './UserAdd'
import TreeSelect from '@/components/TreeSelect'

export default {
  name: 'UserHeader',
  components: {
    UserAdd,
    TreeSelect
  },
  data() {
    return {
      dialog: false,
      params: {
        nickname: '',
        username: '',
        deptId: '',
        status: ''
      },
      userInfo: {},
      treeModelData: [],
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
  mounted() {
    this.loadTreeModel()
    this.loadStatusOptionModel()
  },
  methods: {
    loadTreeModel() {
      fetchDeptTreeModel().then(res => {
        this.treeModelData = res.data
      })
    },
    loadStatusOptionModel() {
      getStatusOption().then(res => {
        if (res.data) {
          this.statusOptions = res.data
        }
      })
    },
    getValue(value) {
      this.params.deptId = value
    },
    openAdd() {
      this.dialog = true
      this.userInfo = {
        avatar: require('@/assets/media/avatars/300-1.jpg')
      }
    },
    openEditDialog(userInfo) {
      this.userInfo = userInfo
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
      this.params.username = ''
      this.params.nickname = ''
      this.params.deptId = ''
      this.params.status = ''
      this.search()
    },
    cancel() {
      this.dialog = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
