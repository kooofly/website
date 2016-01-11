"use strict";
export default {
    mix: function(o) {
        var i = 1,
            l = arguments.length
        for ( ; i < l; i++ ) {
            var arg = arguments[i]
            for ( var k in arg ) {
                if( arg.hasOwnProperty( k ) ){
                    // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
                    if( k !== 'prototype' ){
                        o[k] = arg[k]
                    }
                }
            }
        }
        return o;
    },
    link: function(data, prefix) {
        var result = [];
        var pathname = location.pathname,
            pathnameWithHTML = pathname.match(/^\/.+\.html/i);
        var regExp = (pathnameWithHTML && new RegExp(pathnameWithHTML[0]));

        for (var i = 0, j = data.length; i < j; i++) {
            var obj = data[i],
                url = obj.url;
            if( /^(https?:\/\/)/i.test(url) ){
                result.push(obj);
            } else {
                if(/^\/.+\.html/i.test(url)) {
                    obj.url = url.replace('.html', '.html' + prefix)
                } else {
                    obj.url = url.replace('/', '/' + prefix + '/')
                }
                result.push(obj);
            }
        }
        return result;
    },
    routerBeforeEach: function(router) {
        var self = this;
        router.beforeEach(function (transition) {


            var toPath = transition.to.path,
                fromPath = transition.from.path
            //app 检测  不同的.html文件代表不同的app
            /*if(/\.html/i.test(toPath)) {
             //修复浏览器历史记录问题
             router.replace(transition.from.path);
             window.location.replace(urlRoot + (toPath.charAt(0) === '/' ? toPath : '/' + toPath) );
             return ;
             }*/

            //404 检测
            if(!transition.to.fullPath){
                console.log(transition)
                //修复404 退回问题
                fromPath && router.replace(fromPath);
                router.go('/404');
                return ;
            }

            var auths = transition.to.auths
            //身份 权限检测
            self.authsCheck(toPath, auths, transition)

            //组件 使用权限检测
            self.comCheck(toPath, auths, transition)

            transition.next()
        })
    },
    routerAfterEach: function(router) {
        //滚动条 调整问题
        router.afterEach(function(transition) {
            var matched
            if(transition.from && transition.from.matched && transition.from.matched[0]) {
                matched = transition.from.matched[0]
                if(!matched.isDynamic) {
                    window.scrollTo(0, 0)
                }
            }
        })
    },
    authsCheck: function(toPath, auths, transition) {


    },
    comCheck: function(toPath, auths, transition) {

    },
    validUser: function(router, common) {
        //获取用户信息
        var http = this.$resource('../data/user.json');
        http.get({id: 1}, function(res, status, request) {

            //记录用户信息
            this.$set('auth', res.data.auth);
            this.$set('isAdmin', true);
            this.$set('name', res.data.name);

            //添加特殊路由规则
            common.routerBeforeEach(router);

            console.log(this);
        }).error(function(data, status, request) {
            router.go('/500');
        })
        console.log(http);
    }

}