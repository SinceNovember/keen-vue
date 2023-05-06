import { $instance } from '@/utils/request'

export const fetchPageNotificationMessages = data => {
  return $instance({
    url: '/api/message/notification/page',
    method: 'get',
    data
  })
}

export const fetchPageUserNotificationMessages = data => {
  return $instance({
    url: '/api/message/notification/user/page',
    method: 'get',
    data
  })
}

export const getNotificationMessage = data => {
  return $instance({
    url: '/api/message/notification',
    method: 'get',
    data
  })
}

export const addOrUpdateNotificationMessage = data => {
  return $instance({
    url: '/api/message/notification',
    method: 'post',
    data
  })
}

export const addOrUpdateUserNotificationMessage = data => {
  return $instance({
    url: '/api/message/notification/user',
    method: 'post',
    data
  })
}

export const deleteNotificationMessage = data => {
  return $instance({
    url: '/api/message/notification/delete',
    method: 'post',
    data
  })
}

export const deleteUserNotificationMessage = data => {
  return $instance({
    url: '/api/message/notification/user/delete',
    method: 'post',
    data
  })
}
