<template>
  <div class="app-navbar-item ms-1 ms-lg-3">
    <el-dropdown trigger="click">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-235px h-35px w-md-40px h-md-40px"
      >
        <span class="svg-icon svg-icon-1"><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z"
            fill="currentColor"
          />
          <path
            d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z"
            fill="currentColor"
          />
          <path
            opacity="0.3"
            d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z"
            fill="currentColor"
          />
          <path
            opacity="0.3"
            d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z"
            fill="currentColor"
          />
        </svg>
        </span>
      </div>

      <el-dropdown-menu slot="dropdown">
        <div class="notice d-flex flex-column bgi-no-repeat rounded-top">
          <!--begin::Title-->
          <h3 class="notice-header text-white fw-semibold">
            Notifications <span class="fs-8 opacity-75 ps-3">{{ total }} reports</span>
          </h3>

          <div class="scroll-y mh-325px my-5 px-8">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="d-flex flex-stack py-4"
            >
              <div class="d-flex align-items-center">
                <div class="symbol symbol-35px me-4">
                  <span
                    class="symbol-label"
                    :class="item.type | noticationTypeBgtFilter"
                  >
                    <span
                      class="svg-icon svg-icon-2"
                      :class="item.type | noticationTypeSvgtFilter"
                    >
                      <svg
                        v-if="item.type == 'DEFAULT'"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.3"
                          d="M6 22H4V3C4 2.4 4.4 2 5 2C5.6 2 6 2.4 6 3V22Z"
                          fill="currentColor"
                        />
                        <path
                          d="M18 14H4V4H18C18.8 4 19.2 4.9 18.7 5.5L16 9L18.8 12.5C19.3 13.1 18.8 14 18 14Z"
                          fill="currentColor"
                        />
                      </svg>
                      <svg
                        v-if="item.type == 'SUCCESS'"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.3"
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="10"
                          fill="currentColor"
                        />
                        <path
                          d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                          fill="currentColor"
                        />
                      </svg>
                      <svg
                        v-if="item.type == 'INFO'"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.0077 19.2901L12.9293 17.5311C12.3487 17.1993 11.6407 17.1796 11.0426 17.4787L6.89443 19.5528C5.56462 20.2177 4 19.2507 4 17.7639V5C4 3.89543 4.89543 3 6 3H17C18.1046 3 19 3.89543 19 5V17.5536C19 19.0893 17.341 20.052 16.0077 19.2901Z"
                          fill="currentColor"
                        />
                      </svg>
                      <svg
                        v-if="item.type == 'WARNING'"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.3"
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="10"
                          fill="currentColor"
                        />
                        <rect
                          x="11"
                          y="14"
                          width="7"
                          height="2"
                          rx="1"
                          transform="rotate(-90 11 14)"
                          fill="currentColor"
                        />
                        <rect
                          x="11"
                          y="17"
                          width="2"
                          height="2"
                          rx="1"
                          transform="rotate(-90 11 17)"
                          fill="currentColor"
                        />
                      </svg>
                      <svg
                        v-if="item.type == 'ERROR'"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.3"
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="10"
                          fill="currentColor"
                        />
                        <rect
                          x="7"
                          y="15.3137"
                          width="12"
                          height="2"
                          rx="1"
                          transform="rotate(-45 7 15.3137)"
                          fill="currentColor"
                        />
                        <rect
                          x="8.41422"
                          y="7"
                          width="12"
                          height="2"
                          rx="1"
                          transform="rotate(45 8.41422 7)"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
                <div class="mb-0 me-2 mw-225px">
                  <a
                    class="fs-6 text-gray-800 text-hover-primary fw-bold pointer"
                    @click="openDetail(item)"
                  >
                    {{ item.title }}
                  </a>
                  <div class="text-gray-400 fs-7 text-truncate">
                    {{ item.content }}
                  </div>
                </div>
              </div>
              <span class="badge badge-light fs-8">{{ item.formatTime }}</span>
            </div>
          </div>
          <div class="py-3 text-center border-top">
            <a
              class="btn btn-color-gray-600 btn-active-color-primary"
              @click="openMore"
            >
              View All
              <span class="svg-icon svg-icon-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.5"
                    x="18"
                    y="13"
                    width="13"
                    height="2"
                    rx="1"
                    transform="rotate(-180 18 13)"
                    fill="currentColor"
                  />
                  <path
                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <keen-dialog
      title="通知详情"
      :visible.sync="infoDialog"
      :show-save="false"
      @cancel="infoDialog = false"
    >
      <notification-info :data-info="dataInfo" />
    </keen-dialog>
  </div>
</template>
<script>
import { fetchPageUserNotificationMessages } from '@/api/message/notification'
import NotificationInfo from './components/NotificationInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'UserMenu',
  components: {
    NotificationInfo
  },
  data() {
    return {
      list: [],
      total: 0,
      infoDialog: false,
      dataInfo: {}

    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.loadUserNotificationMessages()
  },
  methods: {
    loadUserNotificationMessages() {
      fetchPageUserNotificationMessages().then(res => {
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    openDetail(dataInfo) {
      this.dataInfo = dataInfo
      this.infoDialog = true
    },
    openMore() {
      this.$router.push({ path: 'overview', query: { tab: 'notifications' }})
    }
  }
}
</script>
<style lang="scss" scoped>
.notice {
    width: 400px;

    .notice-header {
        display: flex;
        align-items: center;
        height: 86px;
        margin: 0px;
        padding-left: 32px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: var(--bs-primary);
    }
}
</style>
