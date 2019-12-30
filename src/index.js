
import vueCountDown from './vue-count-down.vue'

vueCountDown.install = (Vue, options = {}) => {
  Vue.component(options.component || 'count-down', vueCountDown)
}

export default vueCountDown