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
        prop="fromName"
        label="发送人"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="toName"
        label="接收人"
        width="160"
        show-overflow-tooltip
      />
      <el-table-column
        label="内容"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-html="scope.row.contentType == 'TEXT' ? scope.row.content : '[图片]'" />
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            class="badge fw-bold"
            :class="scope.row.isRead == 'READ' ? 'badge-light-success' : 'badge-light-danger'"
          >
            {{ scope.row.isRead | readTypeFilter }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发送时间"
        width="180"
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
      title="角色详情"
      :visible.sync="infoDialog"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <chat-info
        :data-info="dataInfo"
        @cancel="infoDialog = false"
      />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageChatMessages, deleteChatMessage } from '@/api/message/chat'
import ChatInfo from './ChatInfo.vue'
export default {
  name: 'ChatTable',
  components: {
    ChatInfo
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      params: {
        fromName: '',
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
      fetchPageChatMessages(this.params).then(res => {
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
      this.dataInfo = row
      this.infoDialog = true
    },
    deleteOne(row) {
      this.$confirm('确定要删除该聊天?', '提示', {
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
      deleteChatMessage({
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
