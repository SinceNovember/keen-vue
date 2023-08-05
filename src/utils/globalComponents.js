import KeenDialog from '@/components/KeenDialog'
import KeenSearchForm from '@/components/KeenSearchForm'
import { HeaderButtonGroup, TableButtonGroup } from '@/components/ButtonGroup'

function plugins(Vue) {
  // 注册
  Vue.component('KeenDialog', KeenDialog)
  Vue.component('KeenSearchForm', KeenSearchForm)
  Vue.component('HeaderButtonGroup', HeaderButtonGroup)
  Vue.component('TableButtonGroup', TableButtonGroup)
}
export default plugins
