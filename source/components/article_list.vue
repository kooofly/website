<style>
    /* article-list */
    .article-list{ padding:0; list-style: none; margin: 6em 0; min-height: 800px; }
    .article-list li{ margin: 60px 0; }
    .article-list .footer{ font-size: 12px; color: #aaa; line-height: 20px; }
    .article-list .footer .icon-comment{ vertical-align: -1px; }
    .article-list .footer .tags{ border-radius: 15px; padding-top: 0; padding-bottom: 0; margin-right: 6px; font-family: Arial, sans-serif; font-size: 12px; vertical-align: 2px; color: #fff; }
    .article-list .footer .label{ margin-right: 6px; }
    .article-list-handle{ margin-bottom: 60px; text-align: right; }
</style>
<template>
    <div v-if="isLoaded" style="position: relative">
        <ul class="article-list">
            <li v-for="item in list">
                <h2><a v-link="{ path: 'blog/' + item.number }">{{item.title}}</a></h2>
                <div class="footer">

                    <span class="label"><i class="icon icon-comment"></i> {{item.comments}}</span>
                    <span class="label"><i class="icon icon-time"></i> {{item.updated_at | time}}</span>
                    <span v-for="label in item.labels" class="tags btn btn-sm" :style="{background: '#' + label.color}">{{label.name}}</span>
                </div>
            </li>
        </ul>
        <div class="article-list-handle"><button class="btn btn-primary" v-on:click="loadMore()">加载更多</button></div>
    </div>
    <placeholder v-else :is-empty="isEmpty"></placeholder>
</template>
<script>
    import Loading from './loading.vue'
    import Placeholder from './placeholder.vue'
    export default {
        props: ['url', 'request'],
        data() {
            return {
                list: [],
                isLoaded: false,
                isLoadAll: false
            }
        },
        ready() {
            this.load()
        },
        filters: {
            time: function(time) {
                return time.replace(/[A-Z]/g, ' ')
            }
        },
        methods: {
            loadMore: function() {
                this.request.page = this.request.page + 1
                this.load()
            },
            load: function() {
                if(this.isLoadAll) return
                var self = this,
                    loading = self.$root.$refs.loading
                this.$http.get({
                    url: this.$get('url'),
                    data: this.$get('request')
                }).then(function(res) {
                    loading.done()
                    if(!res.data.length) {
                        self.$set('isEmpty', true)
                    } else{
                        self.list = self.list.concat(res.data)
                        self.isLoaded = true
                        if(!res.data.length) {
                            self.isLoadAll = true
                        }
                    }
                }, function() {
                    loading.done()
                    self.$set('isEmpty', true)
                })
            }
        },
        components: {
            Loading,
            Placeholder
        }
    }
</script>