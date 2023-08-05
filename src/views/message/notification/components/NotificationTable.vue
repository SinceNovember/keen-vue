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
        prop="title"
        label="标题"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="content"
        label="内容"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createUserName"
        label="创建人"
        width="160"
        show-overflow-tooltip
      />
      <el-table-column
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
        prop="lastNotificationTime"
        label="上次广播时间"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        width="160"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <table-button-group
            :row="row"
            @detail="openDetail"
            @edit="openEdit"
            @delete="deleteOne"
          >
            <a
              slot="before"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-2"
              @click="notify(row)"
            >
              <span class="svg-icon svg-icon-2"><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  d="M12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z"
                  fill="currentColor"
                />
                <path
                  d="M19 15V18C19 18.6 18.6 19 18 19H6C5.4 19 5 18.6 5 18V15C6.1 15 7 14.1 7 13V10C7 7.6 8.7 5.6 11 5.1V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V5.1C15.3 5.6 17 7.6 17 10V13C17 14.1 17.9 15 19 15ZM11 10C11 9.4 11.4 9 12 9C12.6 9 13 8.6 13 8C13 7.4 12.6 7 12 7C10.3 7 9 8.3 9 10C9 10.6 9.4 11 10 11C10.6 11 11 10.6 11 10Z"
                  fill="currentColor"
                />
              </svg>
              </span>
            </a>
          </table-button-group>
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
  </div>
</template>
<script>
import { fetchPageNotificationMessages, getNotificationMessage, deleteNotificationMessage } from '@/api/message/notification'
import NotificationInfo from './NotificationInfo.vue'
export default {
  name: 'NotificationTable',
  components: {
    NotificationInfo
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      params: {
        title: '',
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
      fetchPageNotificationMessages(this.params).then(res => {
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
    notify(row) {
      this.$confirm('确定要广播该通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$socketApi.sender.notify({
          id: row.id,
          title: row.title,
          content: row.content,
          notificationMessageType: row.type
        })
        this.$message.success('广播成功')
        this.refreshTable()
      })
    },
    openDetail(row) {
      this.dataInfo = row
      this.infoDialog = true
    },
    openEdit(row) {
      getNotificationMessage({
        id: row.id
      }).then(res => {
        this.$emit('openEdit', res.data)
      })
    },
    deleteOne(row) {
      this.$confirm('确定要删除该通知?', '提示', {
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
      deleteNotificationMessage({
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
