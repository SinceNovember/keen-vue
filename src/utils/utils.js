export function changeHtmlVal(name, value) {
  window.document.documentElement.setAttribute(name, value)
}

export function changeElementVal(name, value) {
  window.document.body.setAttribute(name, value)
}

export function addElementCls(cls) {
  window.document.body.classList.add(cls)
}

export function removeElementCls(cls) {
  window.document.body.classList.remove(cls)
}

export function hasShowingChild(children = [], parent) {
  // if (parent.component.name != "Layout") {
  //     return false;
  // }
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      // this.onlyOneChild = item;
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length > 0) {
    return true
  }

  // Show parent if there are no child router to display
  // if (showingChildren.length === 0) {
  //     this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
  //     return true;
  // }

  return false
}

export function treeToArray(tree) {
  return tree.reduce((res, item) => {
    const { children, ...i } = item
    return res.concat(i, children && children.length ? treeToArray(children) : [])
  }, [])
}

export function dateFormat(fmt, date) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function msgDateFormat(date) {
  return dateFormat('hh:mm', date)
}

export function nowTimeStr() {
  return dateTimeFormat(new Date())
}

export function dateTimeFormat(date) {
  return dateFormat('yyyy-MM-dd hh:mm:ss', date)
}

export function getTimeLine(lastMsg) {
  var now = ''
  // 消息之间差三分钟，添加时间线
  if (!lastMsg || parseInt(Date.parse(new Date()) - Date.parse(lastMsg.createTime)) / 1000 / 60 > 3) {
    now = dateFormat('hh:mm', new Date())
  }
  return now
}

export function getFileSuffixBase64(suffix) {

}
