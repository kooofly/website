import _404 from '../components/bad_404.vue'
import _500 from '../components/bad_500.vue'
import Forbidden from '../components/bad_forbidden.vue'

export default {
    '/404': {
        component: _404
    },
    '/500': {
        component: _500
    },
    '/forbidden': {
        component: Forbidden
    }
}