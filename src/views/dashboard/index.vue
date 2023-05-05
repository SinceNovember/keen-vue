<template>
  <div class="dashboard-container">
    <el-card
      shadow="never"
      class="summary-main"
    >
      <div class="summary-header d-flex">
        <div class="summary-header-left  col">
          <span class="fs-3 fw-bold text-white mb-2 lh-1 ls-n2">
            欢 迎 登 陆
          </span>
          <span class="fs-5 text-white me-2 ">
            Life is good, happy every day
          </span>
        </div>
        <div class="summary-header-right" />
      </div>
      <div class="summary-body">
        <div
          class="quick-item"
          @click="toQuick('user')"
        >
          <span class="quick-icon">
            <i class="bi bi-person-lines-fill" />
          </span>
          <span class="text-muted fw-medium">
            用户管理
          </span>
        </div>

        <div
          class="quick-item"
          @click="toQuick('dept')"
        >
          <span class="quick-icon">
            <i class="bi bi-diagram-3" />
          </span>
          <span class="text-muted fw-medium">
            部门管理
          </span>
        </div>

        <div
          class="quick-item"
          @click="toQuick('role')"
        >
          <span class="quick-icon">
            <i class="bi bi-person-vcard" />
          </span>
          <span class="text-muted fw-medium">
            角色管理
          </span>
        </div>

        <div
          class="quick-item"
          @click="toQuick('menu')"
        >
          <span class="quick-icon">
            <i class="bi bi-list" />
          </span>
          <span class="text-muted fw-medium">
            菜单管理
          </span>
        </div>
      </div>
    </el-card>
    <div class="num-main">
      <el-card
        shadow="never"
        class="w-100"
      >
        <div class="num-item">
          <div class="menu-item-main">
            <div class="num-icon">
              <div class="symbol symbol-50px">
                <span class="symbol-label  bg-light-primary">
                  <i class="text-primary fs-2 lh-0 bi bi-brightness-alt-high-fill" />
                </span>
              </div>
            </div>
            <div class="num-info">
              <span class="title-text">{{ logLoginAllCount }}</span>
              <p class="text-muted fw-medium pt-2 mb-0">访问总量</p>
            </div>
          </div>
          <i class="text-primary fs-6 bi bi-chevron-right" />
        </div>
      </el-card>
      <el-card
        shadow="never"
        class="w-100"
      >
        <div class="num-item">
          <div class="menu-item-main">
            <div class="num-icon">
              <div class="symbol symbol-50px">
                <span class="symbol-label  bg-light-primary">
                  <i class="text-primary fs-2 lh-0 bi bi-brightness-alt-high-fill" />
                </span>
              </div>
            </div>
            <div class="num-info">
              <span class="title-text">{{ logLoginTodayCount }}</span>
              <p class="text-muted fw-medium pt-2 mb-0">今日访问</p>
            </div>
          </div>
          <i class="text-primary fs-6 bi bi-chevron-right" />
        </div>
      </el-card>
      <el-card
        shadow="never"
        class="w-100"
      >
        <div class="num-item">
          <div class="menu-item-main">
            <div class="num-icon">
              <div class="symbol symbol-50px">
                <span class="symbol-label  bg-light-primary">
                  <i class="text-primary fs-2 lh-0 bi bi-chat-dots-fill" />
                </span>
              </div>
            </div>
            <div class="num-info">
              <span class="title-text">{{ userInfo.unreadMessageCount }}</span>
              <p class="text-muted fw-medium pt-2 mb-0">未读消息</p>
            </div>
          </div>
          <i class="text-primary fs-6 bi bi-chevron-right" />
        </div>
      </el-card>
      <el-card
        shadow="never"
        class="w-100"
      >
        <div class="num-item">
          <div class="menu-item-main">
            <div class="num-icon">
              <div class="symbol symbol-50px">
                <span class="symbol-label  bg-light-primary">
                  <i class="text-primary fs-2 lh-0 bi bi-person-fill" />
                </span>
              </div>
            </div>
            <div class="num-info">
              <span class="title-text">{{ onlineUserCount }}</span>
              <p class="text-muted fw-medium pt-2 mb-0">在线人数</p>
            </div>
          </div>
          <i class="text-primary fs-6 bi bi-chevron-right" />
        </div>
      </el-card>

    </div>
    <el-card
      class="chart-main"
      shadow="nerve"
    >
      <div
        slot="header"
        class="chart-header"
      >
        <div class="title-text fs-6">
          最近一周访问历史
        </div>
      </div>
      <line-chart
        :chart-data="visitHistory"
        :height="'460px'"
      />
    </el-card>

    <div class="other-main">
      <el-card shadow="nerve">
        <span
          slot="header"
          class="title-text fs-6"
        >
          最近登录
        </span>
        <div class="timeline py-5 px-2">
          <div
            v-for="(item, index) in recentLoginLogList"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-line w-40px" />
            <div class="timeline-icon symbol symbol-circle symbol-40px">
              <div class="symbol-label bg-light">
                <div
                  class="symbol symbol-circle symbol-45px"
                >
                  <img
                    :src="item.avatar"
                    alt="img"
                  >
                </div>
                <i class="ki-duotone ki-flag fs-2 text-gray-500"><span class="path1" /><span
                  class="path2"
                /></i>
              </div>
            </div>
            <div class="timeline-content mb-10 mt-n2">
              <div class="d-flex flex-stack">
                <div class="overflow-auto pe-3">
                  <div class="d-flex flex-column">
                    <div class="fw-bold d-flex align-items-center text-gray-800 fs-6">
                      {{ item.nickname }}
                      <span
                        v-for="(subItem, subIndex) in item.roleNames"
                        :key="subIndex"
                        class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"
                      >
                        {{ subItem }}
                      </span>
                    </div>

                    <a
                      href="#"
                      class="fw-semibold text-muted text-hover-primary fs-7 my-1"
                    >
                      大数据1部</a>
                  </div>

                  <div class="d-flex align-items-center flex-wrap fw-semibold fs-7 pe-2">
                    <a
                      href="#"
                      class="d-flex align-items-center text-gray-400 text-hover-primary"
                    >
                      {{ item.ip }}
                    </a>
                    <span class="bullet bullet-dot h-5px w-5px bg-gray-400 mx-3" />
                    <a
                      href="#"
                      class="d-flex align-items-center text-gray-400 text-hover-primary mw-100px text-truncate"
                    >
                      {{ item.location }}
                    </a>

                  </div>
                </div>
                <span class="badge badge-light fs-8">{{ item.formatTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { fetchRecentLoginLogs, countAllLoginLog, countTodayLoginLog, getLoginLogWeekChart } from '@/api/monitor/loginLog'
import { countOnlineUser } from '@/api/system/user'
import LineChart from './components/LineChart'
import { mapGetters } from 'vuex'

export default {
  name: 'KeenDashboard',
  components: {
    LineChart
  },
  data() {
    return {
      logLoginAllCount: 0,
      logLoginTodayCount: 0,
      onlineUserCount: 0,
      recentLoginLogList: [],
      visitHistory: {
        nameList: [],
        dataList: []
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.loadLoginLogAllCount()
    this.loadLoginLoginTodayCount()
    this.loadOnlineUserCount()
    this.loadRecentLoginLog()
    this.loadLoginLogWeekChart()
  },
  methods: {
    loadLoginLogAllCount() {
      countAllLoginLog().then(res => {
        this.logLoginAllCount = res.data
      })
    },
    loadLoginLoginTodayCount() {
      countTodayLoginLog().then(res => {
        this.logLoginTodayCount = res.data
      })
    },
    loadOnlineUserCount() {
      countOnlineUser().then(res => {
        this.onlineUserCount = res.data
      })
    },
    loadRecentLoginLog() {
      fetchRecentLoginLogs().then(res => {
        this.recentLoginLogList = res.data
      })
    },
    loadLoginLogWeekChart() {
      getLoginLogWeekChart().then(res => {
        this.visitHistory.nameList = res.data.nameList
        this.visitHistory.dataList = res.data.valueList
      })
    },
    toQuick(name) {
      this.$router.push({ name: name })
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
    display: grid;
    grid:
        'summary num num'
        'chart chart other';
    grid-template-columns: 1.25fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    .summary-main {
        grid-area: summary;
        display: flex;
        flex-direction: column;

        .summary-header {
            background: linear-gradient(112.14deg, #3A7BD5 0%, #00D2FF 100%);

            .summary-header-left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0px 20px;
            }

            .summary-header-right {
                height: 100px;
                width: 160px;
                background-size: 90%;
                background-repeat: no-repeat;
                background-position: right;
                background-image: url('~@/assets/media/illustrations/profile-img.png');
            }
        }

        .summary-body {
            display: flex;
            justify-content: space-between;
            padding: 24px 12px;

            .quick-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 64px;
                cursor: pointer;

                .quick-icon {
                    display: flex;
                    align-items: center;
                    margin-bottom: 6px;

                    i {
                        font-size: 24px;
                        color: var(--bs-text-primary);
                    }
                }
            }
        }
    }

    .num-main {
        grid-area: num;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 20px;

        .num-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0px;

            .menu-item-main {
                display: flex;
                align-items: center;

                .num-info {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                }
            }

        }
    }

    .chart-main {
        grid-area: chart;

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .chart-title-text {
                margin-left: 6px;
                color: var(--bs-text-gray-700);
                font-weight: 700;
            }

            .chart-tool {
                width: 120px;
            }
        }

    }

    .other-main {
        grid-area: other;
    }

    // .title-text {
    //     margin-left: 6px;
    //     color: var(--bs-text-gray-700);
    //     line-height: 24px;
    //     font-weight: 700;
    // }
    .title-text {
        color: var(--bs-text-gray-800);
        font-size: 1.25rem;
        line-height: 24px;
        font-weight: 700;
    }
}
</style>
