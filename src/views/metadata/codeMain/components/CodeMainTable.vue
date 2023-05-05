<template>
  <div class="table-main">
    <el-table
      ref="table"
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      element-loading-text="Loading..."
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="codeName"
        label="代码名称"
        width="320"
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
            :show-detail="false"
            @detail="openDetail"
            @edit="openEdit"
            @delete="deleteOne"
          >
            <el-dropdown
              slot="after"
              trigger="click"
              @command="handleCommand"
            >
              <a class="btn btn-icon btn-active-light-primary w-30px h-30px me-2">
                <span class="svg-icon svg-icon-2 "><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="10"
                    y="10"
                    width="4"
                    height="4"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="17"
                    y="10"
                    width="4"
                    height="4"
                    rx="2"
                    fill="currentColor"
                  />
                  <rect
                    x="3"
                    y="10"
                    width="4"
                    height="4"
                    rx="2"
                    fill="currentColor"
                  />
                </svg>
                </span>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="'detail_' + row.id"> <i class="fs-5 bi bi-eye-fill" />
                  详情</el-dropdown-item>
                <el-dropdown-item :command="'configItem_' + row.id"><i class="fs-5 bi bi-grid" />
                  配置代码项</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </table-button-group>
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
      :visible.sync="infoDialog"
      title="代码详情"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <code-main-info :data-info="dataInfo" />
    </keen-dialog>

    <keen-dialog
      :visible.sync="configItemDialog"
      title="配置代码项"
      :width="1200"
      :show-save="false"
      :show-close="false"
      @cancel="infoDialog = false"
    >
      <code-item
        v-if="configItemDialog"
        ref="configItem"
        :code-id="codeId"
        @cancel="cancelConfig"
      />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageCodeMains, getCodeMain, deleteCodeMain } from '@/api/metadata/codeMain'
import CodeMainInfo from './CodeMainInfo'
import CodeItem from '../../codeItem'
export default {
  name: 'CodeMainTable',
  components: {
    CodeMainInfo,
    CodeItem
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      params: {
        codeName: '',
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: ''
      },
      codeId: 0,
      dataInfo: {},
      infoDialog: false,
      configItemDialog: false,
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
        this.params.codeName = params.codeName
        this.params.pageNum = params.pageNum
      }
      this.spinShow = true
      fetchPageCodeMains(this.params).then(res => {
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
      this.params.orderBy = params.key
      this.params.orderType = params.order
      this.refreshTable()
    },
    handleCommand(command) {
      const arr = command.split('_')
      this.codeId = arr[1]
      if (arr[0] === 'detail') {
        getCodeMain({
          id: this.codeId
        }).then(res => {
          this.dataInfo = res.data
          this.infoDialog = true
        })
      } else {
        this.configItemDialog = true
      }
    },
    openEdit(row) {
      getCodeMain({
        id: row.id
      }).then(res => {
        this.$emit('openEdit', res.data)
      })
    },
    deleteOne(row) {
      this.$confirm('确定要删除该代码?', '提示', {
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
      deleteCodeMain({
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
