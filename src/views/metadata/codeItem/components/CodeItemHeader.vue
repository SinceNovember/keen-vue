<template>
  <div class="progress-vertical">
    <div class="progress-vertical gap-2">
      <el-input
        v-model="params.itemText"
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
            <el-form-item
              label="代码项值"
            >
              <el-input
                v-model="params.itemValue"
              />
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
      :visible="dialog"
      title="添加代码项"
      :append-body="true"
      @cancel="dialog = false"
      @save="save"
    >
      <code-item-add
        ref="add"
        :data-info="codeItemInfo"
        @search="refreshTable"
        @cancel="cancel"
      />
    </keen-dialog>
  </div>
</template>
<script>
import CodeItemAdd from './CodeItemAdd'
export default {
  name: 'CodeItemHeader',
  components: {
    CodeItemAdd
  },
  props: {
    codeId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      params: {
        itemText: '',
        itemValue: '',
        description: ''
      },
      codeItemInfo: {
        orderNum: 0
      }
    }
  },
  methods: {
    openAdd() {
      this.codeItemInfo = {
        codeId: this.codeId,
        orderNum: 0
      }
      this.dialog = true
    },
    openEditDialog(codeItemInfo) {
      this.codeItemInfo = codeItemInfo
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
      this.params.itemText = ''
      this.params.itemValue = ''
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
