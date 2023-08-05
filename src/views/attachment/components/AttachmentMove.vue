<template>
  <div class="table-main">
    <attachment-navigation-bar
      ref="navigationBar"
      @changeFolder="changeFolder"
    />
    <el-table
      ref="table"
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      element-loading-text="Loading..."
    >
      <el-table-column
        width="15"
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
    </el-table>
    <div class="row py-7 float-end">
      <el-pagination
        layout="total,sizes, prev, pager, next"
        :total="total"
        :page-size="5"
        :page-sizes="[5, 10 ,15]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { fetchPageAttachmentFolderAndInfo, addOrUpdateAttachmentFolder, addOrUpdateAttachmentInfo } from '@/api/attachment/attachment'
import { getThumbnail } from '@/const/attachmentConst'
import AttachmentNavigationBar from './AttachmentNavigationBar.vue'
export default {
  name: 'AttachmentMove',
  components: {
    AttachmentNavigationBar
  },
  props: {
    moveItem: {
      type: Object,
      default: () => {}
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
        pageSize: 5,
        orderBy: '',
        orderType: ''
      }
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
    sortTable(params) {
      this.params.orderBy = params.prop
      this.params.orderType = params.order
      this.refreshTable()
    },
    navigateToNext(row) {
      this.changeFolder(row)
      this.$refs.navigationBar.addNavigationItem(row)
    },
    changeFolder(row) {
      this.params.parentId = row.id
      this.refreshTable()
    },
    save() {
      const callback = () => {
        this.$emit('saveCallback')
      }
      if (this.moveItem.isFolder === 'true') {
        addOrUpdateAttachmentFolder({
          id: this.moveItem.id,
          parentId: this.params.parentId
        })
          .then(callback)
      } else {
        addOrUpdateAttachmentInfo({
          id: this.moveItem.id,
          folderId: this.params.parentId
        })
          .then(callback)
      }
    }
  }
}
</script>
  <style lang="scss" scoped>
  .table-main {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  ::v-deep .el-input {
      .el-input__inner {
          background-color: transparent !important;
          border-color: var(--bs-gray-300) !important;
          min-height: 36px !important;
      }
  }
  </style>

