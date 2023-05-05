import { $instance } from '@/utils/request'

export const fetchPageCodeItems = data => {
  return $instance({
    url: '/api/metadata/codeItem/page',
    method: 'get',
    data
  })
}

export const getCodeItem = data => {
  return $instance({
    url: '/api/metadata/codeItem',
    method: 'get',
    data
  })
}

export const addOrUpdateCodeItem = data => {
  return $instance({
    url: '/api/metadata/codeItem',
    method: 'post',
    data
  })
}

export const deleteCodeItem = data => {
  return $instance({
    url: '/api/metadata/codeItem/delete',
    method: 'post',
    data
  })
}
