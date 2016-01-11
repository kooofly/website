"use strict";
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import common from '../common/common'
import commonRouter from '../common/router'

import App from './app.vue'

//page
import Index from '../components/index.vue'
import Blog from '../components/blog.vue'
import Words from '../components/words.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
var router = new VueRouter()
router.map(commonRouter)
router.map({
    '/': {
        component: Index,
        auths: {
            allow: [],
            special: []
        }
    },
    '/blog/:id': {
        component: Blog
    },
    '/words': {
        component: Words
    }
})
var app = Vue.extend(App).extend({
    ready: function() {
        common.routerBeforeEach(router);
        common.routerAfterEach(router);
        //common.validUser.call(this, router, common)
    }
})

router.start(app, 'app');
window.router = router;