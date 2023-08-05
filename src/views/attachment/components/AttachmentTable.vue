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
        label="名称"
        min-width="260"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="anchor">
            <img
              height="24"
              width="24"
              class="me-2"
              :src="scope.row.thumbnail"
            >
            <div
              v-if="scope.row.create || scope.row.editable"
              class="d-flex"
            >
              <el-input v-model="scope.row.name" />
              <el-button
                type="primary"
                plain
                size="small"
                class="ms-3"
                @click="confirmAddOrUpdate(scope.row)"
              >
                <i class="bi bi-check fs-4" />
              </el-button>
              <el-button
                type="danger"
                plain
                size="small"
                class="ms-3"
                @click="cancelAddOrUpdate(scope.row)"
              >
                <i class="bi bi-x fs-4" />
              </el-button>
            </div>
            <div
              v-else
              class="pointer"
              @click="navigateToNext(scope.row)"
            >
              {{ scope.row.name }}
            </div>

          </div>
        </template>

      </el-table-column>

      <el-table-column
        prop="createUserNickname"
        label="创建人"
        min-width="120"
        show-overflow-tooltip
      />

      <el-table-column
        prop="size"
        label="大小"
        align="center"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        label="排序"
        width="160"
        align="center"
        sortable
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div
            v-if="scope.row.folder && (scope.row.create || scope.row.editable)"
            class="d-flex"
          >
            <el-input-number v-model="scope.row.orderNum" />
          </div>
          <div v-else>
            {{ scope.row.orderNum }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column
        width="120"
        label="操作"
      >
        <template slot-scope="{row}">
          <table-button-group
            :row="row"
            :show-detail="false"
            :show-edit="false"
            :show-delete="false"
            @delete="deleteOne"
          >

            <a
              slot="before"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-2"
              @click="download(row)"
            >
              <span class="svg-icon svg-icon-2 transform-90 "><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.3"
                  width="12"
                  height="2"
                  rx="1"
                  transform="matrix(-1 0 0 1 15.5 11)"
                  fill="currentColor"
                />
                <path
                  d="M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z"
                  fill="currentColor"
                />
                <path
                  d="M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z"
                  fill="currentColor"
                />
              </svg>
              </span>
            </a>
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
                <el-dropdown-item :command="'move_' + row.id + '_' + row.folder"> <i class="fs-5 bi bi-arrow-return-left" />
                  移动</el-dropdown-item>
                <el-dropdown-item :command="'delete_' + row.id + '_' + row.folder"><i class="fs-5 bi bi-trash-fill" />
                  删除文件</el-dropdown-item>
                <el-dropdown-item :command="'rename_' + row.id + '_' + row.folder"><i class="fs-5 bi bi-shuffle" />
                  重命名</el-dropdown-item>
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
      :visible.sync="moveDialog"
      title="文件移动"
      :width="700"
      :show-save="true"
      :append-body="true"
      @save="saveMove"
      @cancel="moveDialog = false"
    >
      <attachment-move
        ref="move"
        :move-item="moveItem"
        @saveCallback="closeMoveAndRefreshTable"
      />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageAttachmentFolderAndInfo, addOrUpdateAttachmentFolder, addOrUpdateAttachmentInfo, deleteAttachment, deleteAttachmentFolder } from '@/api/attachment/attachment'
import { downloadAttachment } from '@/api/attachment/attachment'
import { getThumbnail } from '@/const/attachmentConst'
import AttachmentMove from './AttachmentMove.vue'
export default {
  name: 'AttachmentTable',
  components: {
    AttachmentMove
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      moveDialog: false,
      moveItem: {},
      params: {
        includeFile: true,
        parentId: 0,
        foldName: '',
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
      this.refreshMoveTable()
      this.loading = true
      if (params) {
        this.params.name = params.name
        this.params.pageNum = params.pageNum
      }
      this.spinShow = true
      fetchPageAttachmentFolderAndInfo(this.params)
        .then(res => {
          const { list, total } = res.data
          list.forEach(item => {
            item.thumbnail = getThumbnail(item.suffix)
          })
          this.list = list
          this.total = total
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
      this.$emit('update:isSelected', val.length !== 0)
      this.multipleSelection = val
    },
    sortTable(params) {
      this.params.orderBy = params.prop
      this.params.orderType = params.order
      this.refreshTable()
    },
    async refreshMoveTable() {
      if (this.$refs.move) {
        this.$refs.move.refreshTable()
      }
    },
    navigateToNext(row) {
      if (row.folder) {
        this.changeFolder(row)
        this.$emit('navigateNext', row)
      }
    },
    addFolder() {
      this.list.unshift({
        name: '',
        create: true,
        orderNum: 0,
        folder: true,
        thumbnail: getThumbnail('dir'),
        parentId: this.params.parentId
      })
    },
    changeFolder(row) {
      this.params.parentId = row.id
      this.params.name = ''
      this.refreshTable()
    },
    confirmAddOrUpdate(row) {
      const callback = () => {
        this.refreshTable()
      }
      if (row.folder) {
        addOrUpdateAttachmentFolder(row)
          .then(callback)
      } else {
        addOrUpdateAttachmentInfo(row)
          .then(callback)
      }
    },
    cancelAddOrUpdate(row) {
      if (row.create) {
        this.list.shift()
      } else {
        row.editable = false
      }
    },
    handleCommand(command) {
      const [name, id, isFolder] = command.split('_')
      if (name === 'move') {
        this.moveItem = {
          id: id,
          isFolder: isFolder
        }
        this.moveDialog = true
        if (this.$refs.move && this.$refs.move.$refs.navigationBar) {
          this.$refs.move.$refs.navigationBar.changeFolder({
            id: 0
          })
        }
      } else if (name === 'delete') {
        this.deleteOne({ id: id, folder: isFolder === 'true' })
      } else {
        this.rename(Number(id), isFolder === 'true')
      }
    },
    saveMove() {
      if (this.$refs.move) {
        this.$refs.move.save()
      }
    },
    rename(id, isFolder) {
      this.list.forEach(item => {
        if (item.id === id && item.folder === isFolder) {
          item.editable = true
          return
        }
      })
    },
    download(row) {
      if (!row.folder) {
        downloadAttachment(row.id)
          .then(res => {
          })
      }
    },
    deleteSelected() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定要删除选中的记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(this.multipleSelection)
        })
      } else {
        this.$message('至少选中一条记录')
      }
    },
    deleteOne(row) {
      const tipMessage = row.folder ? '确认删除该文件夹同时删除文件夹下的所有文件?' : '确认删除该文件?'
      this.$confirm(tipMessage, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete([row])
      })
    },
    async handleDelete(rows) {
      const folderIds = rows.filter(item => item.folder).map(item => item.id)
      const attachmentIds = rows.filter(item => !item.folder).map(item => item.id)
      if (folderIds.length > 0) {
        await deleteAttachmentFolder({
          ids: folderIds
        })
      }
      if (attachmentIds.length > 0) {
        await deleteAttachment({
          ids: attachmentIds
        })
      }
      this.refreshTable()
      this.$emit('refreshSummary')
      this.$message.success('删除成功')
    },
    closeMoveAndRefreshTable() {
      this.refreshTable()
      this.moveDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-input {
    .el-input__inner {
        background-color: transparent !important;
        border-color: var(--bs-gray-300) !important;
        min-height: 36px !important;
    }
}
</style>

