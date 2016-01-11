<style>
    .sidebar-placeholder{ float: left; height: 1px; min-width: 240px; width: 15.6%; max-width: 360px; }
    .sidebar{
        min-width: 240px;
        width: 15.6%;
        max-width: 360px;
        position: fixed;
        top: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        font-family: "Microsoft YaHei", sans-serif;
        background: #44535D;
    }
    .sidebar::-webkit-scrollbar {
        width: 0 !important;
    }

    .sidebar ul{
        list-style: none;
        padding: 0;
        margin: 0;
        border-top: 1px solid #252E33;
    }
    .sidebar ul li{}
    .sidebar ul li a{
        display: block;
        line-height: 30px;
        padding: 5px 20px;
        color: #FFFFFF;
        opacity: .6;
        border-bottom: 1px solid #252E33;
        font-weight: 300;
        text-shadow: 1px 1px 1px #000;
    }
    .sidebar ul li a .icon{ margin-right: 4%; }
    .sidebar ul .ii a{ padding-left: 48px; }
    .sidebar ul li a:hover,
    .sidebar ul li .v-link-active{ background: #f15753; text-shadow: none; opacity: 1; }
    .sidebar ul li .v-link-active{ background: #d9534f; box-shadow: inset 1px 1px 1px 1px #C54943; }
</style>
<template>
    <div class="sidebar">
        <v-logo></v-logo>
        <ul>
            <li><a v-link="{ path: '/', exact: true }"><i class="icon icon-index"></i>主页</a></li>
            <li><a v-link="{ path: '/words', exact: true }"><i class="icon icon-words"></i>简说</a></li>
            <li v-for="label in labels"><a v-link="{ path: '/' + label, exact: true  }"><i class="icon icon-book"></i>{{label}}</a></li>
        </ul>
    </div>
</template>
<script>
    import config from '../config'
    import VLogo from './logo.vue'
    export default {
        data() {
            return {
                labels: []
            }
        },
        ready: function() {
            var self = this
            this.$http.get({
                url: config.nav_labels_url,
                data: config.client
            }).then(function(res) {
                var data = res.data
                for (var i = 0, j = data.length; i < j; i++) {
                    var name = data[i].name;
                    /_/.test(name) && self.labels.push(data[i].name)
                }
            }, function() {

            })
        },
        components: {
            VLogo
        }
    }
</script>