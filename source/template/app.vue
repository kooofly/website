<style type="text/css">
    html,body{ height: 100%; }
    body * { box-sizing: border-box; }
    @import "../common/common.css";
    body{ color: #444; font-family: 'Microsoft YaHei', 'Arial', 'SimSun', sans-serif;  }
    .bd{ float: left; background: #fff; width: 52%; margin: 0 4%; }
    .right{ background: #fff; overflow: hidden; zoom: 1; padding-top: 6em; margin-right: 4%; }
    .pull-left{  float: left; }
    .pull-right{  float: right; }
</style>
<template>
    <loading :is-progress="isProgress" cls="progress-small progress-top progress-danger"  v-ref:loading></loading>
    <router-view></router-view>
</template>

<script>
import Loading from '../components/loading.vue'
export default {
    data () {
        return {
            isProgress: true,
        }
    },
    components: {
        Loading
    }
}
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-72322954-1', 'auto');
ga('send', 'pageview');
</script>