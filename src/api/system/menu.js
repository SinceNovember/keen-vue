import { $instance } from '@/utils/request'

export const fetchPageMenus = data => {
  return $instance({
    url: '/api/system/menu/page',
    method: 'get',
    data
  })
}

export const fetchMenuTreeModel = () => {
  return $instance({
    url: '/api/system/menu/tree',
    method: 'get'
  })
}

export const fetchMenuPermissions = data => {
  return $instance({
    url: '/api/system/menu/permission',
    method: 'get',
    data
  })
}

export const getMenu = data => {
  return $instance({
    url: '/api/system/menu',
    method: 'get',
    data
  })
}

export const addOrUpdateMenu = data => {
  return $instance({
    url: '/api/system/menu',
    method: 'post',
    data
  })
}

export const deleteDept = data => {
  return $instance({
    url: '/api/system/dept/delete',
    method: 'post',
    data
  })
}

export const deleteMenu = data => {
  return $instance({
    url: '/api/system/menu/delete',
    method: 'post',
    data
  })
}

export const addOrUpdateMenuPermission = data => {
  return $instance({
    url: '/api/system/menu/permission',
    method: 'post',
    data
  })
}
