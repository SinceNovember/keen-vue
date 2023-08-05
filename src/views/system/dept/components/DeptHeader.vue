<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.deptName"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入部门名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
        <el-row>
          <el-col>
            <el-form-item
              label="部门简称"
            >
              <el-input
                v-model="params.deptShortName"
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
      title="添加部门"
      @cancel="dialog = false"
      @save="save"
    >
      <dept-add
        ref="add"
        :data-info="deptInfo"
        @search="refreshTable"
        @cancel="cancel"
      />
    </keen-dialog>

  </div>
</template>
<script>
import DeptAdd from './DeptAdd'
export default {
  name: 'DeptHeader',
  components: {
    DeptAdd
  },
  data() {
    return {
      dialog: false,
      params: {
        deptName: '',
        deptShortName: ''
      },
      deptInfo: {
        orderNum: 0
      }
    }
  },
  methods: {
    openAdd() {
      this.dialog = true
      this.deptInfo = {
        orderNum: 0
      }
    },
    openEditDialog(deptInfo) {
      this.deptInfo = deptInfo
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
      this.params.deptName = ''
      this.params.deptShortName = ''
      this.search()
    },
    cancel() {
      this.dialog = false
      this.$refs.add.clearForm()
    }
  }
}
</script>
<style lang="scss" scoped></style>
