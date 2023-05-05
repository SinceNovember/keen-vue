import { $instance } from '@/utils/request'

export const getSexOption = () => {
  return $instance({
    url: '/api/metadata/option/sex',
    method: 'get'
  })
}

export const getStatusOption = () => {
  return $instance({
    url: '/api/metadata/option/status',
    method: 'get'
  })
}

