<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.title"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入菜单名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item
              label="组件路径"
            >
              <el-input
                v-model="params.component"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item
              label="路由地址"
            >
              <el-input
                v-model="params.path"
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
      title="添加菜单"
      @cancel="dialog = false"
      @save="save"
    >
      <menu-add
        ref="add"
        :data-info="menuInfo"
        @search="refreshTable"
        @cancel="cancel"
      />
    </keen-dialog>

  </div>
</template>
<script>
import MenuAdd from './MenuAdd'
export default {
  name: 'MenuHeader',
  components: {
    MenuAdd
  },
  data() {
    return {
      dialog: false,
      params: {
        title: '',
        component: '',
        path: ''
      },
      menuInfo: {}
    }
  },
  methods: {
    openAdd() {
      this.menuInfo = {
        type: 'DIRECTORY',
        orderNum: 0,
        requestMethod: 'GET',
        alwaysShow: true,
        hidden: false,
        breadCrumb: true
      }
      this.dialog = true
    },
    openEditDialog(menuInfo) {
      this.menuInfo = menuInfo
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
      this.params.title = ''
      this.params.component = ''
      this.params.path = ''
      this.search()
    },
    cancel() {
      this.dialog = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
