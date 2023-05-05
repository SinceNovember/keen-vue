import { $instance } from '@/utils/request'

export const fetchPageCodeMains = data => {
  return $instance({
    url: '/api/metadata/codeMain/page',
    method: 'get',
    data
  })
}

export const getCodeMain = data => {
  return $instance({
    url: '/api/metadata/codeMain',
    method: 'get',
    data
  })
}

export const addOrUpdateCodeMain = data => {
  return $instance({
    url: '/api/metadata/codeMain',
    method: 'post',
    data
  })
}

export const deleteCodeMain = data => {
  return $instance({
    url: '/api/metadata/codeMain/delete',
    method: 'post',
    data
  })
}
