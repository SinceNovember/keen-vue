<template>
  <div class="user-list-container d-flex flex-column flex-lg-row w-100 h-100">
    <div class="user-list-sidebar w-100 w-lg-350px w-xl-350px min-w-350px pt-2">
      <div class="user-list-sidebar-header">
        <div class="user-list-sidebar-header-toolbar">
          <div class="toolbar-title">
            Users
          </div>
        </div>
        <div class="user-list-sidebar-header-search">
          <el-input
            v-model="searchKey"
            prefix-icon="el-icon-search"
            placeholder="Search...."
          />
        </div>
      </div>
      <div class="user-list-sidebar-content scroll">
        <user-list-item
          v-for="(deptUser, index) in deptUserList"
          :key="index"
          :dept-user="deptUser"
          @changeUser="changeUser"
        />
      </div>
    </div>
    <div
      v-if="selectedUser.id"
      class="user-list-content flex-lg-row-fluid"
    >
      <user-list-item-detail
        :selected-user="selectedUser"
        @sendMessage="sendMessage"
      />
    </div>
    <div
      v-else
      class="empty-user-list"
    />
  </div>
</template>
<script>
import { fetchDeptUsers } from '@/api/system/dept'
import { treeToArray } from '@/utils/utils'
import UserListItem from './UserListItem'
import UserListItemDetail from './UserListItemDetail'
export default {
  name: 'UserList',
  components: {
    UserListItem,
    UserListItemDetail
  },
  data() {
    return {
      searchKey: '',
      deptUserList: [],
      deptUserListClone: [],
      flatDeptUserList: [],
      flatDeptUserListClone: [],
      selectedUser: {}
    }
  },
  watch: {
    searchKey(val) {
      if (val) {
        this.deptUserList = this.filterFlatDeptUserList(val)
      } else {
        this.deptUserList = this.deptUserListClone
      }
    }
  },
  mounted() {
    this.loadDeptUsers()
  },
  methods: {
    loadDeptUsers() {
      fetchDeptUsers().then(res => {
        this.deptUserList = res.data
        this.deptUserListClone = res.data
        this.flatDeptUserListClone = treeToArray(this.deptUserListClone)
        this.flatDeptUserList = this.flatDeptUserListClone
      })
    },
    changeUser(user) {
      this.selectedUser = user
    },
    filterFlatDeptUserList(val) {
      this.flatDeptUserList = JSON.parse(JSON.stringify(this.flatDeptUserListClone))
      return this.flatDeptUserList.filter(item => {
        item.show = true
        item.users = item.users.filter(userItem => userItem.nickname.indexOf(val) !== -1)
        return item.users.length > 0
      })
    },
    sendMessage(user) {
      this.$emit('addUserChat', user)
    },
    changeUserOnlineStatus(user, online) {
      this.recurisveDeptUser(this.deptUserListClone, user.id, online)
      if (this.searchKey) {
        this.recurisveDeptUser(this.flatDeptUserList, user.id, online)
      }
    },
    recurisveDeptUser(deptUsers, userId, online) {
      var find = false
      deptUsers.forEach(deptUser => {
        if (deptUser.users && deptUser.users.length > 0) {
          deptUser.users.forEach(user => {
            if (user.id === userId) {
              user.online = online
              find = true
              return
            }
          })
        }
        if (find) {
          return
        }
        if (deptUser.children && deptUser.children.length > 0) {
          this.recurisveDeptUser(deptUser.children, userId, online)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user-list-container {
    .user-list-sidebar {
        border-right: 1px solid var(--bs-border-color);

        .user-list-sidebar-header {
            padding: 0px 18px;

            .user-list-sidebar-header-toolbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-height: 40px;

                .toolbar-title {
                    font-weight: bold;
                }
            }

            .user-list-sidebar-header-search {
                min-height: 40px;
                margin: 10px 0px;
            }
        }

        .user-list-sidebar-content {
            max-height: 480px;
        }
    }

    .empty-user-list {
        flex: 1 auto;
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('~@/assets/media/illustrations/empty-user-list.png');
    }

}
</style>
