<template>
  <div
    class="user-list-item"
    :class="{ 'ps-5': deptUser.parentId }"
  >
    <div
      class="content-ct"
      @click="show = !show"
    >
      <div class="d-flex align-items-center">
        <div
          v-if="!deptUser.parentId"
          class="title-spin"
        >
          <i class="fs-7 bi bi-diagram-3" />
        </div>
        <div
          v-else
          class="sub-title"
        />
        <div class="text-gray-500 fs-8">{{ deptUser.deptName }}</div>
      </div>
      <i
        class="bi bi-caret-down-fill text-gray-500"
        :class="show ? 'bi-caret-up-fill' : 'bi-caret-down-fill'"
      />
    </div>
    <div
      v-if="show == true"
      class="ps-2"
    >
      <div
        v-for="(user, index) in deptUser.users"
        :key="index"
        class="user-item"
        @click="changeUser(user)"
      >
        <div class="d-flex align-items-center">
          <div class="symbol symbol-35px symbol-circle ">
            <img
              alt="Pic"
              :class="{ 'gray-scale-100': !user.online }"
              :src="user.avatar"
            >
            <div
              v-if="user.online"
              class="symbol-badge bg-success start-100 top-100 border-4 h-8px w-8px"
            />
          </div>
          <div class="ms-5">
            <a
              href="#"
              class="fs-6 text-gray-700 text-hover-primary mb-2"
            >
              {{ user.nickname }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <template v-if="deptUser.children && deptUser.children.length > 0">
      <user-list-item
        v-for="(item, index) in deptUser.children"
        :key="index"
        :dept-user="item"
        v-on="$listeners"
      />
    </template>
  </div>
</template>
<script>
export default {
  name: 'UserListItem',
  props: {
    deptUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.$watch(
      () => this.deptUser.show,
      () => {
        this.show = this.deptUser.show
      }
    )
  },
  methods: {
    changeUser(user) {
      this.$emit('changeUser', user)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-list-item {
    .content-ct {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 18px;

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

        .yello-spin {
            background-color: #d49821;
        }

        .sub-title {
            margin-right: 18px;
            width: 7px;
            height: 7px;
            border-left: solid 1px var(--bs-text-gray-400);
            border-bottom: solid 1px var(--bs-text-gray-400);
        }

    }

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
</style>
