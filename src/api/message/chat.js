import { $instance } from '@/utils/request'

export const fetchPageChatMessages = data => {
  return $instance({
    url: '/api/message/chat/page',
    method: 'get',
    data
  })
}

export const fetchChatMessages = data => {
  return $instance({
    url: '/api/message/chat/history',
    method: 'get',
    data
  })
}

export const fetchContactUsers = data => {
  return $instance({
    url: '/api/message/chat/contactUser',
    method: 'get',
    data
  })
}

export const fetchUnreadAllChatMessage = data => {
  return $instance({
    url: '/api/message/chat/unread/all',
    method: 'get',
    data
  })
}

export const countUnreadAllChatMessage = data => {
  return $instance({
    url: '/api/message/chat/unread/count',
    method: 'get',
    data
  })
}

export const hiddenContactUser = data => {
  return $instance({
    url: '/api/message/chat/contactUser/hidden',
    method: 'post',
    data
  })
}

export const showContactUser = data => {
  return $instance({
    url: '/api/message/chat/contactUser/show',
    method: 'post',
    data
  })
}

export const deleteChatMessage = data => {
  return $instance({
    url: '/api/message/chat/delete',
    method: 'post',
    data
  })
}

export const clearUnreadChatMessage = data => {
  return $instance({
    url: '/api/message/chat/unread/clear',
    method: 'put',
    data
  })
}
