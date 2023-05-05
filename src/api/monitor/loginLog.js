import { $instance } from '@/utils/request'

export const fetchPageLoginLogs = data => {
  return $instance({
    url: '/api/monitor/loginLog/page',
    method: 'get',
    data
  })
}

export const fetchRecentLoginLogs = data => {
  return $instance({
    url: '/api/monitor/loginLog/recent',
    method: 'get',
    data
  })
}

export const getLoginLog = data => {
  return $instance({
    url: '/api/monitor/loginLog',
    method: 'get',
    data
  })
}

export const getLoginLogWeekChart = data => {
  return $instance({
    url: '/api/monitor/loginLog/weekChart',
    method: 'get',
    data
  })
}

export const countAllLoginLog = data => {
  return $instance({
    url: '/api/monitor/loginLog/allCount',
    method: 'get',
    data
  })
}

export const countTodayLoginLog = data => {
  return $instance({
    url: '/api/monitor/loginLog/todayCount',
    method: 'get',
    data
  })
}

export const addOrUpdateLoginLog = data => {
  return $instance({
    url: '/api/monitor/loginLog',
    method: 'post',
    data
  })
}

export const deleteLoginLog = data => {
  return $instance({
    url: '/api/monitor/loginLog/delete',
    method: 'post',
    data
  })
}
