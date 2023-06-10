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
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <table-button-group
            :row="row"
            :show-detail="false"
            :show-edit="false"
            :show-delete="false"
            @detail="openDetail"
            @edit="openEdit"
            @delete="deleteOne"
          >
            <a
              slot="before"
              class="btn btn-icon btn-active-light-primary w-30px h-30px me-2"
              @click="copyLink(row)"
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
                  d="M18.4 5.59998C18.7766 5.9772 18.9881 6.48846 18.9881 7.02148C18.9881 7.55451 18.7766 8.06577 18.4 8.44299L14.843 12C14.466 12.377 13.9547 12.5887 13.4215 12.5887C12.8883 12.5887 12.377 12.377 12 12C11.623 11.623 11.4112 11.1117 11.4112 10.5785C11.4112 10.0453 11.623 9.53399 12 9.15698L15.553 5.604C15.9302 5.22741 16.4415 5.01587 16.9745 5.01587C17.5075 5.01587 18.0188 5.22741 18.396 5.604L18.4 5.59998ZM20.528 3.47205C20.0614 3.00535 19.5074 2.63503 18.8977 2.38245C18.288 2.12987 17.6344 1.99988 16.9745 1.99988C16.3145 1.99988 15.661 2.12987 15.0513 2.38245C14.4416 2.63503 13.8876 3.00535 13.421 3.47205L9.86801 7.02502C9.40136 7.49168 9.03118 8.04568 8.77863 8.6554C8.52608 9.26511 8.39609 9.91855 8.39609 10.5785C8.39609 11.2384 8.52608 11.8919 8.77863 12.5016C9.03118 13.1113 9.40136 13.6653 9.86801 14.132C10.3347 14.5986 10.8886 14.9688 11.4984 15.2213C12.1081 15.4739 12.7616 15.6039 13.4215 15.6039C14.0815 15.6039 14.7349 15.4739 15.3446 15.2213C15.9543 14.9688 16.5084 14.5986 16.975 14.132L20.528 10.579C20.9947 10.1124 21.3649 9.55844 21.6175 8.94873C21.8701 8.33902 22.0001 7.68547 22.0001 7.02551C22.0001 6.36555 21.8701 5.71201 21.6175 5.10229C21.3649 4.49258 20.9947 3.93867 20.528 3.47205Z"
                  fill="currentColor"
                />
                <path
                  d="M14.132 9.86804C13.6421 9.37931 13.0561 8.99749 12.411 8.74695L12 9.15698C11.6234 9.53421 11.4119 10.0455 11.4119 10.5785C11.4119 11.1115 11.6234 11.6228 12 12C12.3766 12.3772 12.5881 12.8885 12.5881 13.4215C12.5881 13.9545 12.3766 14.4658 12 14.843L8.44699 18.396C8.06999 18.773 7.55868 18.9849 7.02551 18.9849C6.49235 18.9849 5.98101 18.773 5.604 18.396C5.227 18.019 5.0152 17.5077 5.0152 16.9745C5.0152 16.4413 5.227 15.93 5.604 15.553L8.74701 12.411C8.28705 11.233 8.28705 9.92498 8.74701 8.74695C8.10159 8.99737 7.5152 9.37919 7.02499 9.86804L3.47198 13.421C2.52954 14.3635 2.00009 15.6417 2.00009 16.9745C2.00009 18.3073 2.52957 19.5855 3.47202 20.528C4.41446 21.4704 5.69269 21.9999 7.02551 21.9999C8.35833 21.9999 9.63656 21.4704 10.579 20.528L14.132 16.975C14.5987 16.5084 14.9689 15.9544 15.2215 15.3447C15.4741 14.735 15.6041 14.0815 15.6041 13.4215C15.6041 12.7615 15.4741 12.108 15.2215 11.4983C14.9689 10.8886 14.5987 10.3347 14.132 9.86804Z"
                  fill="currentColor"
                />
              </svg>
              </span>
            </a>
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
  </div>
</template>
<script>
import { fetchPageAttachmentFolderAndInfo, addOrUpdateAttachmentFolder, addOrUpdateAttachmentInfo, deleteAttachment, deleteAttachmentFolder } from '@/api/attachment/attachment'
import { downloadAttachment } from '@/api/attachment/attachment'
import { getThumbnail } from '@/const/attachmentConst'
export default {
  name: 'AttachmentTable',
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
      params: {
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
      this.params.orderBy = params.key
      this.params.orderType = params.order
      this.refreshTable()
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
      const callback = res => {
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
    copyLink(row) {
    },
    handleCommand(command) {
      const [name, id, isFolder] = command.split('_')
      if (name === 'move') {
        this.moveAttachment()
      } else if (name === 'delete') {
        this.deleteOne({ id: id, folder: isFolder === 'true' })
      } else {
        this.rename(Number(id), isFolder === 'true')
      }
    },
    moveAttachment(id, isFolder) {

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

