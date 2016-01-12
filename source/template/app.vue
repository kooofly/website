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
</script>