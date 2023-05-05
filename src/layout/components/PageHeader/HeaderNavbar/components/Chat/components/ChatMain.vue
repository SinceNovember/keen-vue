<template>
  <div class="chat-main-container d-flex flex-column flex-lg-row w-100 h-100">
    <div class="chat-sidebar w-100 w-lg-350px w-xl-350px pt-2">
      <div class="chat-sidebar-header">
        <div class="chat-sidebar-header-toolbar">
          <div class="toolbar-title">
            Messages
          </div>
        </div>
        <div class="chat-sidebar-header-search">
          <el-input
            v-model="searchKey"
            prefix-icon="el-icon-search"
            placeholder="Search...."
          />
        </div>
      </div>
      <div class="chat-sidebar-content">
        <div class="content-ct">
          <div class="d-flex align-items-center">
            <div class="title-spin">
              <i class="fs-7 bi bi-people-fill" />
              <!-- <div class="text-gray-500 fs-8">Pinned</div> -->
            </div>
            <div class="text-gray-500 fs-8">All Messages</div>
          </div>
          <i class="fs-4 bi bi-three-dots" />
        </div>
        <div
          ref="sidebarRef"
          class="user-content scroll"
        >
          <div
            v-for="(contactUser, index) in contactUserList"
            :key="index"
            class="user-item"
            :class="{ 'active': contactUser.user.id == toUser.id }"
            @click="openMessage(contactUser)"
            @contextmenu.prevent="openMenu(contactUser, $event)"
          >
            <template v-if="!contactUser.hidden">
              <div class="d-flex align-items-center">
                <div class="symbol  symbol-40px symbol-circle ">
                  <img
                    alt="Pic"
                    :class="{ 'gray-scale-100': !contactUser.user.online }"
                    :src="contactUser.user.avatar"
                  >
                  <div
                    v-if="contactUser.user.online"
                    class="symbol-badge bg-success start-100 top-100 border-4 h-8px w-8px"
                  />
                </div>
                <div class="ms-5">
                  <a
                    href="#"
                    class="fs-5 text-gray-800 text-hover-primary mb-2"
                  >
                    {{ contactUser.user.nickname }}</a>
                  <div
                    v-if="contactUser.messageList.length > 0"
                    class="d-flex align-items-center fw-semibold fs-7 text-muted mw-210px text-truncate"
                    v-html="replaceHtml(contactUser.messageList[contactUser.messageList.length - 1])"
                  />
                </div>
              </div>
              <div
                v-if="contactUser.messageList.length > 0"
                class="d-flex flex-column align-items-end ms-2"
              >
                <span class="text-muted fs-7 mb-1">
                  {{
                    contactUser.messageList[contactUser.messageList.length - 1].createTime |
                      dateStrFilter
                  }}
                </span>

                <span
                  v-if="contactUser.unreadMessageCount > 0"
                  class="badge badge-sm badge-circle badge-danger"
                >
                  {{ contactUser.unreadMessageCount }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="toContactUser.user"
      class="chat-main flex-lg-row-fluid d-flex flex-column"
    >
      <div class="chat-header">
        <div class="header-info">
          <div class="symbol symbol-40px symbol-circle ">
            <img
              alt="Pic"
              :class="{ 'gray-scale-100': !toUser.online }"
              :src="toUser.avatar"
            >
            <div
              v-if="toUser.online"
              class="symbol-badge bg-success start-100 top-100 border-4 h-8px w-8px"
            />
          </div>
          <div class="chat-info-detail">
            <div class="chat-info-title fs-5 text-gray-800">
              {{ toUser.nickname }}
            </div>
            <div class="chat-info-summary fs-7 text-muted">
              {{ toUser.deptName }}
            </div>
          </div>
        </div>
        <div class="header-tool">
          <span class="svg-icon svg-icon-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.5"
                x="17.0365"
                y="15.1223"
                width="8.15546"
                height="2"
                rx="1"
                transform="rotate(45 17.0365 15.1223)"
                fill="currentColor"
              />
              <path
                d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span class="svg-icon svg-icon-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M10 4H21C21.6 4 22 4.4 22 5V7H10V4Z"
                fill="currentColor"
              />
              <path
                d="M9.2 3H3C2.4 3 2 3.4 2 4V19C2 19.6 2.4 20 3 20H21C21.6 20 22 19.6 22 19V7C22 6.4 21.6 6 21 6H12L10.4 3.60001C10.2 3.20001 9.7 3 9.2 3Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <!-- <i class="bi bi-camera-video"></i> -->
          <span class="svg-icon svg-icon-3">

            <svg
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
                x="10"
                y="3"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              />
              <rect
                x="10"
                y="17"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
      <div
        ref="chatContent"
        class="chat-content flex-lg-row-fluid scroll"
      >
        <div
          v-for="(message, index) in messageList"
          :key="index"
          class="message"
        >
          <div
            v-if="message.timeLine"
            class="time-line"
          >
            {{ message.timeLine }}
          </div>
          <div
            class="message-line"
            :class="message.from != 'me' ? 'other' : 'me'"
          >
            <div class="d-flex flex-column align-items-start">
              <div class="d-flex  mb-2">
                <template v-if="message.from != 'me'">
                  <div class="symbol symbol-35px symbol-circle ">
                    <img
                      alt="Pic"
                      :src="toUser.avatar"
                    >
                  </div>
                  <div
                    v-if="message.contentType == 'TEXT'"
                    class="message-content"
                    v-html="message.content"
                  />
                  <div
                    v-else
                    class="message-image"
                  >
                    <img :src="message.content">
                  </div>
                </template>
                <template v-else>
                  <div
                    v-if="message.contentType == 'TEXT'"
                    class="message-content"
                    v-html="message.content"
                  />
                  <div
                    v-else
                    class="message-image"
                  >
                    <img :src="message.content">
                  </div>
                  <div class="symbol symbol-35px symbol-circle ">
                    <img
                      alt="Pic"
                      :src="userInfo.avatar"
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-send flex-lg-row-fluid">
        <div class="icon-list">
          <el-popover
            placement="bottom"
            popper-class="p-3"
            width="310"
            offset="50"
            trigger="click"
          >
            <emoji @select="selectEmoji" />
            <span
              slot="reference"
              class="svg-icon svg-icon-1 me-5 svg-icon-gray-400"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12C22 12.2 22 12.5 22 12.7L19.5 10.2L16.9 12.8C16.9 12.5 17 12.3 17 12C17 9.5 15.2 7.50001 12.8 7.10001L10.2 4.5L12.7 2C17.9 2.4 22 6.7 22 12ZM11.2 16.9C8.80001 16.5 7 14.5 7 12C7 11.7 7.00001 11.5 7.10001 11.2L4.5 13.8L2 11.3C2 11.5 2 11.8 2 12C2 17.3 6.09999 21.6 11.3 22L13.8 19.5L11.2 16.9Z"
                  fill="currentColor"
                />
                <path
                  opacity="0.3"
                  d="M22 12.7C21.6 17.9 17.3 22 12 22C11.8 22 11.5 22 11.3 22L13.8 19.5L11.2 16.9C11.5 16.9 11.7 17 12 17C14.5 17 16.5 15.2 16.9 12.8L19.5 10.2L22 12.7ZM10.2 4.5L12.7 2C12.5 2 12.2 2 12 2C6.7 2 2.4 6.1 2 11.3L4.5 13.8L7.10001 11.2C7.50001 8.8 9.5 7 12 7C12.3 7 12.5 7.00001 12.8 7.10001L10.2 4.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </el-popover>
          <el-upload
            class="upload-demo"
            action=""
            :before-upload="beforeAvatarUpload"
          >
            <span class="svg-icon svg-icon-1 me-5 svg-icon-gray-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  d="M22 5V19C22 19.6 21.6 20 21 20H19.5L11.9 12.4C11.5 12 10.9 12 10.5 12.4L3 20C2.5 20 2 19.5 2 19V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5ZM7.5 7C6.7 7 6 7.7 6 8.5C6 9.3 6.7 10 7.5 10C8.3 10 9 9.3 9 8.5C9 7.7 8.3 7 7.5 7Z"
                  fill="currentColor"
                />
                <path
                  d="M19.1 10C18.7 9.60001 18.1 9.60001 17.7 10L10.7 17H2V19C2 19.6 2.4 20 3 20H21C21.6 20 22 19.6 22 19V12.9L19.1 10Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </el-upload>
          <span class="svg-icon svg-icon-1 me-5 svg-icon-gray-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M10 4H21C21.6 4 22 4.4 22 5V7H10V4Z"
                fill="currentColor"
              />
              <path
                d="M9.2 3H3C2.4 3 2 3.4 2 4V19C2 19.6 2.4 20 3 20H21C21.6 20 22 19.6 22 19V7C22 6.4 21.6 6 21 6H12L10.4 3.60001C10.2 3.20001 9.7 3 9.2 3Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span class="svg-icon svg-icon-1 me-5 svg-icon-gray-400">

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                fill="currentColor"
              />
              <rect
                x="6"
                y="12"
                width="7"
                height="2"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="6"
                y="7"
                width="12"
                height="2"
                rx="1"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        <div
          ref="messageRef"
          class="send-input scroll"
          contenteditable="true"
          placeholder="请输入"
          @click="handleBoxClick"
          @keydown="handleCtrlEnter"
        />
        <div class="send-btn">
          <el-button
            type="primary"
            class="fw-bold w-85px"
            plain
            @click="sendText"
          >发 送</el-button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="empty-chat-main"
    />
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="context-menu"
    >
      <li>
        置顶
      </li>
      <li @click="closeContactUser">
        删除聊天
      </li>
    </ul>

  </div>
</template>
<script>
import { fetchContactUsers, clearUnreadChatMessage, hiddenContactUser, showContactUser } from '@/api/message/chat'
import { addOrUpdateUserNotificationMessage } from '@/api/message/notification'
import { uploadImg } from '@/api/system/user'
import { nowTimeStr, getTimeLine } from '@/utils/utils'
import { getEmoji } from '@/utils/emoji'
import Emoji from '@/components/Emoji'
import { mapGetters } from 'vuex'

export default {
  name: 'ChatMain',
  components: {
    Emoji
  },
  props: {
    userList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchKey: '',
      top: 0,
      left: 0,
      visible: false,
      content: '',
      toUser: {},
      toContactUser: {},
      messageList: [],
      contextMenuContactUser: {},
      contactUserList: [],
      contactUserListClone: [],
      rangeOfInputBox: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    searchKey(val) {
      if (val) {
        this.contactUserList = this.contactUserList.filter(item => {
          return item.user.nickname.indexOf(val) !== -1
        })
      } else {
        this.contactUserList = this.contactUserListClone
      }
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.loadContactUsers()
    document.addEventListener('selectionchange', this.recordLastEditRange)
    // 建立socket连接， 并设置socket信息返回接受函数
    this.$socketApi.initWebSocket(this.receiveMessage)
  },
  beforeDestroy() {
    this.$socketApi.closeWebSocket()
  },
  methods: {
    loadContactUsers() {
      fetchContactUsers().then(res => {
        this.contactUserList = res.data
        this.contactUserListClone = this.contactUserList
      })
    },
    openMessage(contactUser) {
      this.clearUnreadChatMessageCount(contactUser)
      this.changeSelectedUser(contactUser)
    },

    sendMessage(content, type) {
      if (!content) {
        return
      }
      this.$socketApi.sender.single(this.toUser.id, content, type)
      this.messageList.push({
        'content': content,
        'from': 'me',
        'contentType': type,
        timeLine: getTimeLine(this.messageList[this.messageList.length - 1]),
        createTime: nowTimeStr()
      })
      this.clearUnreadChatMessageCount(this.toContactUser)
      this.sortContactUser(this.toUser.id)
    },
    sendText() {
      var content = this.$refs.messageRef.innerHTML
      this.sendMessage(content, 'TEXT')
      this.$refs.messageRef.innerText = ''
    },
    sendImage(imageUrl) {
      this.sendMessage(imageUrl, 'IMAGE')
    },
    // socket信息返回接受函数
    receiveMessage(data) {
      if (data.type === 'NOTIFICATION') {
        this.handleNotification(data)
      } else {
        // 接受的消息来源不在列表中，添加用户到列表中
        if (!this.contactUserList.some(item => item.user.id === data.fromId)) {
          this.addUserChat(this.userList.find(item => item.id === data.fromId))
        }
        this.contactUserList.forEach(item => {
          if (item.user.id === data.fromId) {
            if (data.type === 'SINGLE') {
              item.messageList.push({
                content: data.content,
                from: 'other',
                contentType: data.contentType,
                timeLine: getTimeLine(item.messageList[item.messageList.length - 1]),
                createTime: nowTimeStr()
              })
              item.hidden = false
              item.unreadMessageCount += 1
              this.$store.dispatch('user/increaseUnreadMessageCount', 1)
              this.sortContactUser(data.fromId)
            } else if (data.type === 'LOGIN') {
              item.user.online = true
              this.$emit('online', item.user)
            } else if (data.type === 'LOGOUT') {
              item.user.online = false
              this.$emit('offline', item.user)
            }
          }
        })
        showContactUser({ toId: data.fromId })
      }
    },
    // 发送socket信息
    websocketSend(data) {
      this.$socketApi.sendSock(data)
    },
    handleNotification(data) {
      addOrUpdateUserNotificationMessage({
        title: data.title,
        content: data.content,
        type: data.notificationMessageType
      }).then(res => {
        this.$notify({
          title: data.title,
          message: data.content,
          type: data.notificationMessageType.toLowerCase()
        })
        this.$emit('refreshNotification')
      }).catch(e => {
        console.error(e)
        this.$message.error('用户通知保存失败')
      })
    },
    addUserChat(user) {
      var isExist = false
      this.searchKey = ''
      this.contactUserList = this.contactUserListClone
      this.contactUserList.forEach(item => {
        if (item.user.id === user.id) {
          isExist = true
          item.hidden = false
          this.toUser = item.user
          this.toContactUser = item
          this.messageList = item.messageList
          this.sortContactUser(user.id)
          return
        }
      })
      if (!isExist) {
        this.contactUserList.unshift({
          user: user,
          hidden: false,
          messageList: [],
          unreadMessageCount: 0
        })
        this.toUser = this.contactUserList[0].user
        this.toContactUser = this.contactUserList[0]
        this.messageList = this.contactUserList[0].messageList
      }
      this.sidebarScrollToTop()
    },
    changeSelectedUser(contactUser) {
      this.toUser = contactUser.user
      this.toContactUser = contactUser
      this.messageList = contactUser.messageList
      this.scrollToBottom()
    },
    sortContactUser(userId) {
      this.contactUserList.map((item, index) => {
        if (item.user.id === userId) {
          this.contactUserList.unshift(
            this.contactUserList.splice(index, 1)[0]
          )
          this.scrollToBottom()
        }
      })
    },
    selectEmoji(emoji) {
      const emojiEl = document.createElement('img')
      const url = getEmoji(emoji)
      emojiEl.src = require('@/assets/media/emoji/' + url + '')
      emojiEl.className = 'h-20px w-20px'

      if (!this.rangeOfInputBox) {
        this.rangeOfInputBox = new Range()
        this.rangeOfInputBox.selectNodeContents(this.$refs.messageRef)
      }

      if (this.rangeOfInputBox.collapsed) {
        this.rangeOfInputBox.insertNode(emojiEl)
      } else {
        this.rangeOfInputBox.deleteContents()
        this.rangeOfInputBox.insertNode(emojiEl)
      }
      this.rangeOfInputBox.collapse(false)
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImg) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isImg && isLt2M) {
        const param = new FormData() // 创建form对象
        param.append('file', file, file.name) // file对象是 beforeUpload参数
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        uploadImg(param, config).then(res => {
          this.sendImage(res.data)
        })
      }
      return false
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
      })
    },
    sidebarScrollToTop() {
      this.$nextTick(() => {
        this.$refs.sidebarRef.scrollTop = 0
      })
    },
    clearUnreadChatMessageCount(contactUser) {
      if (contactUser.unreadMessageCount > 0) {
        this.$store.dispatch('user/descendUnreadMessageCount', contactUser.unreadMessageCount)
        contactUser.unreadMessageCount = 0
        clearUnreadChatMessage({
          fromId: contactUser.user.id
        })
      }
    },
    closeContactUser() {
      hiddenContactUser({
        toId: this.contextMenuContactUser.user.id
      }).then(res => {
        this.contextMenuContactUser.hidden = true
        this.clearUnreadChatMessageCount(this.contextMenuContactUser)
      })
    },
    openMenu(contactUser, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 50 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY - 20
      this.contextMenuContactUser = contactUser
      this.visible = true
    },
    closeMenu() {
      this.visible = false
    },
    // 监听按键操作
    handleCtrlEnter(event) {
      if (event.ctrlKey && event.keyCode === 13) {
        // ctrl+enter
        document.execCommand('insertHTML', false, '<br><br>')
      } else if (event.keyCode === 13) {
        // enter
        this.sendText()
        event.preventDefault() // 阻止浏览器默认换行操作
        return false
      }
    },
    handleBoxClick(event) {
      const target = event.target
      this.setCaretForEmoji(target)
    },
    // 处理点击图片光标不变问题
    setCaretForEmoji(target) {
      if (target.tagName.toLowerCase() === 'img') {
        const range = new Range()
        range.setStartBefore(target)
        range.collapse(true)
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(range)
      }
    },
    // 监听光标并记录光标的位置
    recordLastEditRange() {
      const selection = getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        if (this.$refs && this.$refs.messageRef && this.$refs.messageRef.contains(range.commonAncestorContainer)) {
          this.rangeOfInputBox = range
        }
      }
    },
    replaceHtml(data) {
      console.log(data)
      if (!data.content) {
        return
      }
      if (data.contentType === 'IMAGE') {
        return '[图片]'
      }
      return data.content.replace('<br>', '')
    }
  }
}

</script>
<style lang="scss" scoped>
.chat-main-container {
    .chat-sidebar {
        border-right: 1px solid var(--bs-border-color);

        .chat-sidebar-header {
            padding: 0px 18px;

            .chat-sidebar-header-toolbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-height: 40px;

                .toolbar-title {
                    font-weight: bold;
                }
            }

            .chat-sidebar-header-search {
                min-height: 40px;
                margin: 10px 0px;
            }
        }

        .chat-sidebar-content {

            .content-ct {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 4px 18px;

                .title-spin {
                    width: 24px;
                    height: 24px;
                    background-color: var(--bs-primary);
                    border-radius: 50%;
                    margin-right: 8px;

                    i {
                        position: relative;
                        left: 6px;
                        top: 1px;
                        margin-right: 8px;
                        color: #fff;

                    }
                }
            }

            .user-content {
                max-height: 440px;
                padding: 8px 0px;

                .user-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 18px;

                    &:not(:last-child) {
                        border-bottom: 1px solid var(--bs-border-color);
                    }

                    &:hover {
                        cursor: pointer;
                        background-color: var(--bs-gray-200);
                    }

                    &.active {
                        background-color: var(--bs-gray-200);
                    }

                    .symbol-badge {
                        margin-left: -0.35rem;
                        margin-top: -0.5rem;
                    }

                    .badge-sm {
                        min-width: 1.25rem;
                        width: 1.25rem;
                        height: 1.25rem;
                        font-weight: 500;
                    }
                }
            }

        }
    }

    .chat-main {
        .chat-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 60px;
            padding: 12px 24px;
            border-bottom: 1px solid var(--bs-border-color);

            .header-info {
                display: flex;

                .symbol-badge {
                    margin-left: -0.35rem;
                    margin-top: -0.5rem;
                }

                .chat-info-detail {
                    display: flex;
                    flex-direction: column;
                    margin-left: 20px;
                }
            }

            .header-tool {
                .svg-icon {
                    margin-right: 12px;
                }
            }
        }

        .chat-content {
            padding: 8px 24px;
            height: 360px;
            background-color: var(--bs-message-content-bg);

            .message {
                .time-line {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 12px 0px;
                    height: 12px;
                    color: var(--bs-text-muted);
                    font-size: 10px;
                }

                .message-line {
                    display: flex;
                    margin: 12px 0px;

                    &.other {
                        justify-content: flex-start;
                        -webkit-box-pack: start;

                        .message-content {
                            margin-left: 16px;
                            background-color: var(--bs-gray-200);
                            color: var(--bs-text-gray-700);

                            &::before {
                                border-top: 9px solid transparent;
                                border-bottom: 4px solid transparent;
                                border-right: 10px solid var(--bs-gray-200);
                                left: -9px;
                                top: 11px;
                            }
                        }
                    }

                    &.me {
                        -webkit-box-pack: end;
                        justify-content: flex-end;

                        .message-content {
                            margin-right: 16px;
                            background-color: var(--bs-primary);
                            color: #fff;

                            &::before {
                                border-top: 9px solid transparent;
                                border-bottom: 4px solid transparent;
                                border-left: 10px solid var(--bs-primary);
                                right: -9px;
                                top: 11px;
                            }
                        }
                    }

                    .message-content {
                        position: relative;
                        padding: 10px;
                        max-width: 400px;
                        border-radius: 0.475rem;
                        color: var(--bs-text-dark);

                        &::before {
                            width: 0px;
                            height: 0px;
                            content: "";
                            position: absolute;
                        }
                    }

                    .message-image {
                        img {
                            max-width: 240px;
                            max-height: 240px;
                            border-radius: 6px;
                            margin: 0px 8px;
                        }
                    }
                }
            }
        }

        .chat-send {
            display: flex;
            flex-direction: column;
            padding: 4px 20px;
            margin: 0 auto;
            width: 560px;
            height: 160px;
            border-radius: 4px;
            border-top: 1px solid var(--bs-border-color);

            .icon-list {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 40px;
            }

            .send-input {
                margin: 0 auto;
                width: 100%;
                outline: none;
                height: 80px;
            }

            .send-btn {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-bottom: 12px;
                margin-right: 6px;
                height: 40px;
            }
        }
    }
}

.empty-chat-main {
    flex: 1 auto;
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('~@/assets/media/illustrations/empty-chat.png');
}

.context-menu {
    margin: 0;
    background: var(--bs-message-bg);
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: var(--bs-gray-600);
    box-shadow: 0 16px 24px #0d0b0b14;

    li {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 13px;
        padding: 7px 24px 7px 16px;
        cursor: pointer;

        &:hover {
            background: var(--bs-gray-200);
        }

        i {
            font-size: 16px;
            margin-right: 8px;
        }
    }
}
</style>
