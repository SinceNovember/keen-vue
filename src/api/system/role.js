import { $instance } from '@/utils/request'

export const fetchPageRoles = data => {
  return $instance({
    url: '/api/system/role/page',
    method: 'get',
    data
  })
}

export const fetchRoleOptionModel = () => {
  return $instance({
    url: 'api/system/role/option',
    method: 'get'
  })
}

export const getRole = data => {
  return $instance({
    url: '/api/system/role',
    method: 'get',
    data
  })
}

export const addOrUpdateRole = data => {
  return $instance({
    url: '/api/system/role',
    method: 'post',
    data
  })
}

export const deleteRole = data => {
  return $instance({
    url: '/api/system/role/delete',
    method: 'post',
    data
  })
}
