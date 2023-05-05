import { login, logout } from '@/api/system/user'
import { getToken, setToken, removeToken, clearToken } from '@/utils/auth'

const state = {
  userInfo: {},
  token: getToken(),
  avatar: '',
  roles: []
}
const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  INCREASE_UNREAD_MESSAGE_COUNT: (state, count) => {
    state.userInfo.unreadMessageCount += count
  },
  DESCEND_UNREAD_MESSAGE_COUNT: (state, count) => {
    state.userInfo.unreadMessageCount -= count
  }

}

const actions = {
  login({ commit }, userInfo) {
    const { username, password, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        rememberMe: rememberMe
      }).then(res => {
        if (res.code === 200) {
          const { tokenValue } = res.data
          setToken(tokenValue)
          resolve()
        } else {
          reject(res.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ tokenValue: getToken() }).then(() => {
        clearToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  saveUserInfo({ commit }, userInfo) {
    commit('SET_USERINFO', userInfo)
  },

  increaseUnreadMessageCount({ commit }, count) {
    commit('INCREASE_UNREAD_MESSAGE_COUNT', count)
  },

  descendUnreadMessageCount({ commit }, count) {
    commit('DESCEND_UNREAD_MESSAGE_COUNT', count)
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
