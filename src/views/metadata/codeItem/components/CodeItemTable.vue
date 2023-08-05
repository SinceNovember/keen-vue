<template>
  <div class="table-main">
    <el-table
      ref="table"
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      element-loading-text="Loading..."
      @sort-change="sortTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="itemText"
        label="代码项名"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="itemValue"
        label="代码项值"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip
      />
      <el-table-column
        prop="orderNum"
        label="排序"
        width="100"
        align="center"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        label="创建日期"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        width="120"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <table-button-group
            :row="row"
            @detail="openDetail"
            @edit="openEdit"
            @delete="deleteOne"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="row py-7 float-end">
      <el-pagination
        layout="total,sizes, prev, pager, next"
        :total="total"
        :current-page="params.pageNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <keen-dialog
      :visible.sync="infoDialog"
      title="代码项详情"
      :show-save="false"
      :append-body="false"
      @cancel="infoDialog = false"
    >
      <code-item-info :data-info="dataInfo" />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageCodeItems, getCodeItem, deleteCodeItem } from '@/api/metadata/codeItem'
import CodeItemInfo from './CodeItemInfo.vue'
export default {
  name: 'CodeItemTable',
  components: {
    CodeItemInfo
  },
  props: {
    codeId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      params: {
        codeId: this.codeId,
        itemText: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: ''
      },
      dataInfo: {},
      infoDialog: false,
      multipleSelection: []
    }
  },
  mounted() {
    this.refreshTable()
  },
  methods: {
    refreshTable(params) {
      this.loading = true
      if (params) {
        this.params = { ...this.params, ...params, pageNum: 1 }
      }
      this.spinShow = true
      fetchPageCodeItems(this.params).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.spinShow = false
        this.loading = false
      }).catch(e => {
        this.spinShow = false
        this.loading = false
      })
    },
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum
      this.refreshTable()
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize
      this.refreshTable()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    sortTable(params) {
      this.params.orderBy = params.prop
      this.params.orderType = params.order
      this.refreshTable()
    },
    openDetail(row) {
      getCodeItem({
        id: row.id
      }).then(res => {
        this.dataInfo = res.data
        this.infoDialog = true
      })
    },
    openEdit(row) {
      getCodeItem({
        id: row.id
      }).then(res => {
        this.$emit('openEdit', res.data)
      })
    },
    deleteOne(row) {
      this.$confirm('确定要删除该代码项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete([row.id])
      })
    },
    deleteSelected() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定要删除选中的记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(this.multipleSelection.map(item => item.id))
        })
      } else {
        this.$message('至少选中一条记录')
      }
    },
    handleDelete(ids) {
      deleteCodeItem({
        ids: ids
      }).then(res => {
        this.refreshTable()
        this.$message.success('删除成功')
      })
    },
    cancel() {
      this.infoModal = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
