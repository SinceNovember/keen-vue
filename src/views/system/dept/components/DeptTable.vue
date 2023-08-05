<template>
  <div class="table-main">
    <el-table
      ref="table"
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      element-loading-text="Loading..."
      @sort-change="sortTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="deptName"
        label="部门名称"
        show-overflow-tooltip
      />
      <el-table-column
        prop="deptShortName"
        label="部门简称"
        show-overflow-tooltip
      />
      <el-table-column
        label="部门人员"
        width="260"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <avatar-list
            :list="row.users"
            @showAll="showAllUser"
          />
        </template>

      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        width="120"
        sortable
        align="center"
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
      title="部门详情"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <dept-info :data-info="dataInfo" />
    </keen-dialog>

    <keen-dialog
      :visible.sync="userDialog"
      title="部门用户列表"
      :width="300"
      :show-save="false"
      :show-close="false"
    >
      <dept-user-list :users="users" />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageDepts, getDept, deleteDept } from '@/api/system/dept'
import DeptInfo from './DeptInfo.vue'
import DeptUserList from './DeptUserList.vue'
import AvatarList from '@/components/AvatarList'
export default {
  name: 'DeptTable',
  components: {
    DeptInfo,
    AvatarList,
    DeptUserList
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      params: {
        deptName: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: ''
      },
      dataInfo: {},
      users: [],
      infoDialog: false,
      userDialog: false,
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
      fetchPageDepts(this.params).then(res => {
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
      getDept({
        id: row.id
      }).then(res => {
        this.dataInfo = res.data
        this.infoDialog = true
      })
    },
    openEdit(row) {
      getDept({
        id: row.id
      }).then(res => {
        this.$emit('openEdit', res.data)
      })
    },
    deleteOne(row) {
      this.$confirm('确定要删除该部门?', '提示', {
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
      deleteDept({
        ids: ids
      }).then(res => {
        this.refreshTable()
        this.$message.success('删除成功')
      })
    },
    cancel() {
      this.infoModal = false
    },
    showAllUser(users) {
      console.log('zzzz')
      this.users = users
      this.userDialog = true
    }
  }
}
</script>
<style lang="scss" scoped></style>
