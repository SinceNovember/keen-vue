<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.roleName"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入角色名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item
              label="角色标志"
            >
              <el-input
                v-model="params.roleTag"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item
              label="描述"
            >
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
      title="添加角色"
      @cancel="dialog = false"
      @save="save"
    >
      <role-add
        ref="add"
        :data-info="roleInfo"
        @search="refreshTable"
        @cancel="dialog = false"
      />
    </keen-dialog>
  </div>
</template>
<script>
import RoleAdd from './RoleAdd'
export default {
  name: 'RoleHeader',
  components: {
    RoleAdd
  },
  data() {
    return {
      dialog: false,
      params: {
        roleName: '',
        roleTag: '',
        description: ''
      },
      roleInfo: {}
    }
  },
  methods: {
    openAdd() {
      this.dialog = true
      this.roleInfo = {
        orderNum: 0
      }
    },
    openEditDialog(roleInfo) {
      this.roleInfo = roleInfo
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
      this.params.roleName = ''
      this.params.roleTag = ''
      this.params.description = ''
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped></style>
