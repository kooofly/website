<style>
    .about{ padding: 20px; background: #f3f3f3; margin-bottom: 40px; }
    .about .links{margin-top: 16px;}
    .about .links .icon{ display: inline-block; font-size: 24px; line-height: 1; width: 24px; height: 24px;color: #7E7F84; margin-right: 6px;}
    .about .links a:hover .icon-github{color: #333;}
    .about .links a:hover .icon-sina{ color: #f74864; }
    .about .links a:hover .icon-phone{ color: #1ec354; }
    .about .introduction p{ margin-bottom: 0; }
    .about .introduction .tags{border-radius: 15px;
        margin-top: 14px;
        padding-top: 0;
        padding-bottom: 0;
        margin-right: 6px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        vertical-align: 2px; cursor: default; }
    .about .avatar{ width: 60px; height: 60px; }
</style>
<template>
    <div class="about">
        <div class="media">
            <div class="media-left">
                <img class="avatar" src="../images/avatar.jpg" alt="">
            </div>
            <div class="media-body">
                <b class="name">Kooofly</b>
                <div class="links">
                    <a href="https://github.com/kooofly" target="_blank"><i class="icon icon-github"></i></a>
                    <a href="http://weibo.com/kooofly?profile_ftype=1&is_all=1#_0" target="_blank"><i class="icon icon-sina"></i></a>
                    <!--<a href="#" target="_blank"><i class="icon icon-phone"></i></a>-->
                </div>
            </div>
        </div>
        <div class="introduction">
            <div>
                <span class="tags btn btn-sm btn-primary">前端</span>
                <span class="tags btn btn-sm btn-success">全栈</span>
                <span class="tags btn btn-sm btn-info">5年</span>
                <span class="tags btn btn-sm">1990</span>
            </div>
            <p>爱设计，爱前端，也爱颠覆创新；爱生活，爱音乐，也爱小资情趣</p>
        </div>

    </div>
</template>
<script>
    export default {

    }
</script>