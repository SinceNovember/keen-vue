import { $instance } from '@/utils/request'

export const fetchPageOperateLogs = data => {
  return $instance({
    url: '/api/monitor/operateLog/page',
    method: 'get',
    data
  })
}

export const getOperateLog = data => {
  return $instance({
    url: '/api/monitor/operateLog',
    method: 'get',
    data
  })
}

export const addOrUpdateOperateLog = data => {
  return $instance({
    url: '/api/monitor/operateLog',
    method: 'post',
    data
  })
}

export const deleteOperateLog = data => {
  return $instance({
    url: '/api/monitor/operateLog/delete',
    method: 'post',
    data
  })
}
