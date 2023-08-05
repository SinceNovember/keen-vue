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
        label="昵称"
        width="160"
      >
        <template slot-scope="scope">
          <div class="anchor">
            <el-avatar
              :size="40"
              class="avatar me-4"
              fit="contain"
              :src="scope.row.avatar"
            />
            {{ scope.row.nickname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        label="性别"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.sex | SexFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门"
        min-width="80"
        show-overflow-tooltip
      />
      <el-table-column
        prop="mobile"
        label="手机号"
        min-width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        label="创建日期"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        label="状态"
        width="80"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            class="badge fw-bold"
            :class="scope.row.status == 'VALID' ? 'badge-light-success' : 'badge-light-danger'"
          >
            {{ scope.row.status | StatusTypeFilter }}
          </div>
        </template>
      </el-table-column>
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
  </div>
</template>
<script>
import { fetchPageUsers, getUser, deleteUser } from '@/api/system/user'

export default {
  name: 'UserTable',
  data() {
    return {
      infoDialog: false,
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
      fetchPageUsers(this.params).then(res => {
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
      this.$router.push({ path: 'overview', query: { id: row.id }})
    },
    openEdit(row) {
      getUser({
        id: row.id
      }).then(res => {
        this.$emit('openEdit', res.data)
      })
    },
    deleteOne(row) {
      this.$confirm('确定要删除该用户?', '提示', {
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
      deleteUser({
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
<style lang="scss" scoped>
.avatar {
    min-height: 40px;
    min-width: 40px;
}
</style>
