<template>
  <div
    class="chat-container d-flex flex-column flex-lg-row"
    style="min-height: 600px;"
  >
    <div class="chat-panel w-100 w-lg-50px w-xl-50px py-2">
      <span
        class="icon "
        :class="{ 'active': activePanel == 'chat' }"
        @click="activePanel = 'chat'"
      >
        <i class="bi bi-chat" />
      </span>
      <span
        class="icon"
        :class="{ 'active': activePanel == 'people' }"
        @click="activePanel = 'people'"
      >
        <i class="bi bi-people" />
      </span>
      <span
        class="icon "
        :class="{ 'active': activePanel == 'folder' }"
        @click="activePanel = 'folder'"
      >
        <i class="bi bi-folder" />
      </span>
      <span
        class="icon"
        :class="{ 'active': activePanel == 'bookmark' }"
        @click="activePanel = 'bookmark'"
      >
        <i class="bi bi-bookmark" />
      </span>
      <span
        class="icon"
        :class="{ 'active': activePanel == 'star' }"
        @click="activePanel = 'star'"
      >
        <i class="bi bi-star" />
      </span>
    </div>
    <div class="w-100">
      <div
        v-show="activePanel == 'chat'"
        class="h-100"
      >
        <chat-main
          ref="chatMain"
          :user-list="userList"
          @online="online"
          @offline="offline"
          @refreshNotification="refreshNotification"
        />
      </div>
      <div
        v-show="activePanel == 'people'"
        class="h-100"
      >
        <user-list
          ref="userList"
          @addUserChat="addUserChat"
        />
      </div>
    </div>

  </div>
  <!--end::Messenger-->
</template>
<script>
import { fetchUsers } from '@/api/system/user'
import ChatMain from './components/ChatMain'
import UserList from './components/UserList'
export default {
  name: 'KeenChat',
  components: {
    ChatMain,
    UserList
  },

  data() {
    return {
      activePanel: 'chat',
      userList: []
    }
  },
  mounted() {
    this.loadAllUsers()
  },
  methods: {
    loadAllUsers() {
      fetchUsers().then(res => {
        this.userList = res.data
      })
    },
    addUserChat(user) {
      this.$refs.chatMain.addUserChat(user)
      this.activePanel = 'chat'
    },
    online(user) {
      this.$refs.userList.changeUserOnlineStatus(user, true)
    },
    offline(user) {
      this.$refs.userList.changeUserOnlineStatus(user, false)
    },
    refreshNotification() {
      this.$emit('refreshNotification')
    }
  }

}

</script>
<style lang="scss" scoped>
.chat-container {
    .chat-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 0;
        border-right: 1px solid var(--bs-border-color);

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 16px 0px;
            height: 32px;
            width: 32px;
            border-radius: 5px;

            &:hover {
                cursor: pointer;
            }

            i {
                font-size: 14px;
                color: var(--bs-text-gray-600);
            }

        }

        .active {
            background-color: var(--bs-primary);

            i {
                color: #fff;
            }
        }
    }
}
</style>
