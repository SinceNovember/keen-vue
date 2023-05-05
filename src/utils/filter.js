
import Vue from 'vue'
import { nowTimeStr } from './utils'

Vue.filter('StatusFilter', function(status) {
  const statusMap = {
    true: '是',
    false: '否'
  }
  return statusMap[status]
})

Vue.filter('SexFilter', function(status) {
  const statusMap = {
    MALE: '男',
    FEMALE: '女',
    UNKNOWN: '未知'
  }
  return statusMap[status]
})

Vue.filter('StatusTypeFilter', function(status) {
  const statusMap = {
    LOCK: '禁用',
    VALID: '启用'
  }
  return statusMap[status]
})

Vue.filter('readTypeFilter', function(type) {
  const typeMap = {
    READ: '已读',
    UNREAD: '未读'
  }
  return typeMap[type]
})

Vue.filter('noticationTypeFilter', function(type) {
  const typeMap = {
    DEFAULT: '默认',
    SUCCESS: '成功',
    INFO: '信息',
    WARNING: '警告',
    ERROR: '错误'
  }
  return typeMap[type]
})

Vue.filter('noticationTypeBadgetFilter', function(type) {
  const typeMap = {
    DEFAULT: 'primary',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'danger'
  }
  return `badge-light-${typeMap[type]}`
})

Vue.filter('noticationTypeBgtFilter', function(type) {
  const typeMap = {
    DEFAULT: 'primary',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'danger'
  }
  return `bg-light-${typeMap[type]}`
})

Vue.filter('noticationTypeSvgtFilter', function(type) {
  const typeMap = {
    DEFAULT: 'primary',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'danger'
  }
  return `svg-icon-${typeMap[type]}`
})

Vue.filter('dateStrFilter', function(data) {
  if (data) {
    var timeArr = data.replace(' ', ':').replace(/\:/g, '-').split('-')
    var nowArr = nowTimeStr().replace(' ', ':').replace(/\:/g, '-').split('-')
    // 今天的显示时间
    if (nowArr[1] === timeArr[1] && nowArr[2] === timeArr[2]) {
      return '' + timeArr[3] + ':' + timeArr[4]
    }
    return '' + timeArr[1] + '-' + timeArr[2]
  }

  return ''
})

Vue.filter('messageFilter', function(data) {
  if (data.contentType === 'IMAGE') {
    return '[图片]'
  }
  return data.content
})
