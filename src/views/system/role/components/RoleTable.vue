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
        prop="roleName"
        label="角色名称"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="roleTag"
        label="角色标志"
        width="160"
        show-overflow-tooltip
      />
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip
      />
      <el-table-column
        label="状态"
        width="100"
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
      title="角色详情"
      :visible.sync="infoDialog"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <role-info
        :data-info="dataInfo"
        @cancel="infoDialog = false"
      />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageRoles, getRole, deleteRole } from '@/api/system/role'
import RoleInfo from './RoleInfo.vue'
export default {
  name: 'RoleTable',
  components: {
    RoleInfo
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      params: {
        roleName: '',
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
      fetchPageRoles(this.params).then(res => {
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    sortTable(params) {
      this.params.orderBy = params.prop
      this.params.orderType = params.order
      this.refreshTable()
    },
    openDetail(row) {
      getRole({
        id: row.id
      }).then(res => {
        this.dataInfo = res.data
        this.infoDialog = true
      })
    },
    openEdit(row) {
      getRole({
        id: row.id
      }).then(res => {
        this.$emit('openEdit', res.data)
      })
    },
    deleteOne(row) {
      this.$confirm('确定要删除该角色?', '提示', {
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
      deleteRole({
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
