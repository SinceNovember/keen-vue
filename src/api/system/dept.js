import { $instance } from '@/utils/request'

export const fetchPageDepts = data => {
  return $instance({
    url: '/api/system/dept/page',
    method: 'get',
    data
  })
}

export const fetchDeptTreeModel = () => {
  return $instance({
    url: '/api/system/dept/tree',
    method: 'get'
  })
}

export const fetchDeptUsers = data => {
  return $instance({
    url: '/api/system/dept/user',
    method: 'get',
    data
  })
}

export const getDept = data => {
  return $instance({
    url: '/api/system/dept',
    method: 'get',
    data
  })
}

export const addOrUpdateDept = data => {
  return $instance({
    url: '/api/system/dept',
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
