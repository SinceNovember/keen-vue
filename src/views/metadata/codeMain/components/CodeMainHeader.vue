<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.codeName"
        style="width: 200px;"
        small
        prefix-icon="el-icon-search"
        placeholder="请输入代码名称"
        @change="search"
      />
      <keen-search-form
        @search="search"
        @reset="resetForm"
      >
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
      title="添加代码"
      @cancel="dialog = false"
      @save="save"
    >
      <code-main-add
        ref="add"
        :data-info="codeMainInfo"
        @search="refreshTable"
        @cancel="cancel"
      />
    </keen-dialog>
  </div>
</template>
<script>
import CodeMainAdd from './CodeMainAdd'
export default {
  name: 'CodeMainHeader',
  components: {
    CodeMainAdd
  },
  data() {
    return {
      dialog: false,
      params: {
        codeName: '',
        description: ''
      },
      codeMainInfo: {
        orderNum: 0
      }
    }
  },
  methods: {
    openAdd() {
      this.dialog = true
      this.codeMainInfo = {
        orderNum: 0
      }
    },
    openEditDialog(codeMainInfo) {
      this.codeMainInfo = codeMainInfo
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
      this.params.codeName = ''
      this.params.description = ''
      this.search()
    },
    cancel() {
      this.dialog = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
