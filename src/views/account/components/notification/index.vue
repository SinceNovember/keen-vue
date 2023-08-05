<template>
  <el-card shadow="nerve">
    <div
      slot="header"
      class="cursor-pointer  d-flex flex-stack"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">通知</h3>
      </div>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      element-loading-text="Loading..."
    >
      <el-table-column
        prop="title"
        label="标题"
        width="260"
        show-overflow-tooltip
      />
      <el-table-column
        prop="content"
        label="内容"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        label="通知时间"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="type"
        label="类型"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            class="badge fw-bold"
            :class="scope.row.type | noticationTypeBadgetFilter"
          >
            {{ scope.row.type | noticationTypeFilter }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <keen-dialog
      title="通知详情"
      :visible.sync="infoDialog"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <notification-info
        :data-info="dataInfo"
        @cancel="infoDialog = false"
      />
    </keen-dialog>
  </el-card>
</template>
<script>
import { fetchPageUserNotificationMessages, deleteUserNotificationMessage } from '@/api/message/notification'
import NotificationInfo from './components/NotificationInfo'
export default {
  name: 'AccountNotification',
  components: {
    NotificationInfo
  },
  data() {
    return {
      list: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: ''
      },
      dataInfo: [],
      infoDialog: false,
      loading: false
    }
  },
  mounted() {
    this.refreshTable()
  },
  methods: {
    refreshTable(params) {
      this.loading = true
      if (params) {
        this.params.nickname = params.nickname
        this.params.pageNum = params.pageNum
      }
      fetchPageUserNotificationMessages(this.params).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(e => {
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
    sortTable(params) {
      this.params.orderBy = params.prop
      this.params.orderType = params.order
      this.refreshTable()
    },
    openDetail(row) {
      this.dataInfo = row
      this.infoDialog = true
    },
    deleteOne(row) {
      this.$confirm('确定要删除该记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete([row.id])
      })
    },
    handleDelete(ids) {
      deleteUserNotificationMessage({
        ids: ids
      }).then(res => {
        this.refreshTable()
        this.$message.success('删除成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
