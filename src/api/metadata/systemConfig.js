import { $instance } from '@/utils/request'

export const fetchPageSystemConfigs = data => {
  return $instance({
    url: '/api/metadata/systemConfig/page',
    method: 'get',
    data
  })
}

export const getSystemConfig = data => {
  return $instance({
    url: '/api/metadata/systemConfig',
    method: 'get',
    data
  })
}

export const addOrUpdateSystemConfig = data => {
  return $instance({
    url: '/api/metadata/systemConfig',
    method: 'post',
    data
  })
}

export const deleteSystemConfig = data => {
  return $instance({
    url: '/api/metadata/systemConfig/delete',
    method: 'post',
    data
  })
}
