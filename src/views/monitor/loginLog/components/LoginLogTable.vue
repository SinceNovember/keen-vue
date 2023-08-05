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
        prop="nickname"
        label="登录名"
        min-width="160"
        show-overflow-tooltip
      />
      <el-table-column
        prop="location"
        label="登录地"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="ip"
        label="IP"
        min-width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="system"
        label="系统"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="browser"
        label="浏览器"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="loginTime"
        label="登录时间"
        width="160"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        width="90"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <table-button-group
            :row="row"
            :show-edit="false"
            @detail="openDetail"
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
      title="登录日志详情"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <login-log-info :data-info="dataInfo" />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageLoginLogs, getLoginLog, deleteLoginLog } from '@/api/monitor/loginLog'
import LoginLogInfo from './LoginLogInfo.vue'
export default {
  name: 'LoginLogTable',
  components: {
    LoginLogInfo
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      params: {
        nickname: '',
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
      fetchPageLoginLogs(this.params).then(res => {
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
      getLoginLog({
        id: row.id
      }).then(res => {
        this.dataInfo = res.data
        this.infoDialog = true
      })
    },
    deleteOne(row) {
      this.$confirm('确定要删除该日志?', '提示', {
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
      deleteLoginLog({
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
