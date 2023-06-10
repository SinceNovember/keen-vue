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
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        :selectable="checkSelectable"
        width="60"
      />
      <el-table-column
        prop="meta.title"
        label="菜单名称"
        show-overflow-tooltip
      />
      <el-table-column
        label="图标"
        width="80"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <i
            class="fs-4"
            :class="row.meta.icon"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="菜单类型"
        width="140"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <div
            v-if="row.type == 'DIRECTORY'"
            class="badge badge-light-primary"
          >目录</div>
          <div
            v-else-if="row.type == 'MENU'"
            class="badge badge-light-success"
          >菜单</div>
          <div
            v-else
            class="badge badge-light-danger"
          >按钮</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="component"
        label="组件路径"
        how-overflow-tooltip
      />
      <el-table-column
        prop="path"
        label="路由地址"
        how-overflow-tooltip
      />
      <el-table-column
        prop="redirect"
        label="重定向"
        show-overflow-tooltip
      />
      <el-table-column
        prop="orderNum"
        label="排序"
        width="80"
        sortable
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        width="70"
        label="隐藏"
        align="center"
      >
        <template slot-scope="{row}">
          <el-checkbox
            v-model="row.hidden"
            @change="edit(row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="70"
        label="公开"
        align="center"
      >
        <template slot-scope="{row}">
          <el-checkbox
            v-model="row.alwaysShow"
            @change="edit(row)"
          />
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
                <el-dropdown-item :command="'assign_' + row.id"><i class="fs-5 bi bi-sliders" />
                  分配权限</el-dropdown-item>
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
      title="菜单详情"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <menu-info :data-info="dataInfo" />
    </keen-dialog>

    <keen-dialog
      :visible.sync="assignDialog"
      title="分配权限"
      :width="760"
      @save="save"
      @cancel="assignDialog = false"
    >
      <menu-assign
        v-if="assignDialog"
        ref="menuAssign"
        :menu-id="menuId"
        @cancel="cancelAssign"
      />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageMenus, getMenu, addOrUpdateMenu, deleteMenu } from '@/api/system/menu'
import MenuAssign from './MenuAssign'
import MenuInfo from './MenuInfo'
export default {
  name: 'MenuTable',
  components: {
    MenuAssign,
    MenuInfo
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
      multipleSelection: [],
      infoDialog: false,
      assignDialog: false,
      menuId: 0

    }
  },
  mounted() {
    this.refreshTable()
  },
  methods: {
    refreshTable(params) {
      this.loading = true
      if (params) {
        this.params.title = params.title
        this.params.pageNum = params.pageNum
      }
      this.spinShow = true
      fetchPageMenus(this.params).then(res => {
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
      this.menuId = arr[1]
      if (arr[0] === 'detail') {
        getMenu({
          id: this.menuId
        }).then(res => {
          this.dataInfo = res.data
          this.infoDialog = true
        })
      } else {
        this.assignDialog = true
      }
    },
    save() {
      this.$refs.menuAssign.save()
    },
    openDetail(row) {
      getMenu({
        id: row.id
      }).then(res => {
        this.dataInfo = res.data
        this.infoModal = true
      })
    },
    openAssign(row) {
      this.menuId = row.id
      this.assignDialog = true
    },
    openEdit(row) {
      getMenu({
        id: row.id
      }).then(res => {
        this.$emit('openEdit', res.data)
      })
    },

    edit(row) {
      row = { ...row, ...row.meta }
      addOrUpdateMenu(row)
        .then(res => {
          this.$message.success('修改成功')
        }).catch(e => {
          this.$message.error('修改失败')
        })
    },
    deleteOne(row) {
      if (row.children.length > 0) {
        this.$message.error('当前菜单下包含子菜单，无法删除')
        return
      }
      this.$confirm('确定要删除该菜单?', '提示', {
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
      deleteMenu({
        ids: ids
      }).then(res => {
        this.refreshTable()
        this.$message.success('删除成功')
      })
    },
    checkSelectable(row) {
      return row.children.length <= 0
    },
    cancel() {
      this.infoModal = false
    },
    cancelAssign() {
      this.assignDialog = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
