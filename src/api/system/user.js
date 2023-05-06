import { $instance } from '@/utils/request'

export const login = data => {
  return $instance({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export const fetchUserMenus = () => {
  return $instance({
    url: '/api/system/user/menu',
    method: 'get'
  })
}

export const fetchPageUsers = data => {
  return $instance({
    url: '/api/system/user/page',
    method: 'get',
    data
  })
}

export const fetchUsers = () => {
  return $instance({
    url: '/api/system/user/list',
    method: 'get'
  })
}

export const fetchUserTreeModel = () => {
  return $instance({
    url: '/api/system/user/tree',
    method: 'get'
  })
}

export const fetchUserLoginLogs = data => {
  return $instance({
    url: '/api/auth/loginLog',
    method: 'get',
    data
  })
}

export const fetchUserOperateLogs = data => {
  return $instance({
    url: '/api/auth/operateLog',
    method: 'get',
    data
  })
}

export const getUser = data => {
  return $instance({
    url: '/api/system/user',
    method: 'get',
    data
  })
}

export const getLoginUserInfo = () => {
  return $instance({
    url: '/api/auth/userInfo',
    method: 'get'
  })
}

export const countOnlineUser = () => {
  return $instance({
    url: '/api/system/user/onlineCount',
    method: 'get'
  })
}

export const addOrUpdateUser = data => {
  return $instance({
    url: '/api/system/user',
    method: 'post',
    data
  })
}

export const updateUsername = data => {
  return $instance({
    url: '/api/auth/username',
    method: 'put',
    data
  })
}

export const updatePassword = data => {
  return $instance({
    url: '/api/auth/password',
    method: 'put',
    data
  })
}

export const updateUser = data => {
  return $instance({
    url: '/api/system/user',
    method: 'put',
    data
  })
}

export const deleteUser = data => {
  return $instance({
    url: '/api/system/user/delete',
    method: 'post',
    data
  })
}

export const updateProfileImage = data => {
  return $instance({
    url: '/api/system/user/profileImage',
    method: 'put',
    data
  })
}

export const uploadImg = data => {
  return $instance({
    url: '/api/upload/img',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const logout = data => {
  return $instance({
    url: '/api/auth/logout',
    method: 'post',
    data
  })
}

// export const uploadImg = (params, config) => { return axios.post('/api/upload/img', params, config) }
