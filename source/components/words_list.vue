<style>
    /* article-list */
    .words-list{ padding:0; list-style: none; margin: 6em 0; }
    .words-list li{ margin: 60px 0; }
    .words-list .footer{ font-size: 12px; color: #aaa; line-height: 20px; }
    .words-list .footer .tags{ border-radius: 15px; padding-top: 0; padding-bottom: 0; margin-left: 6px; font-family: Arial, sans-serif; font-size: 12px; vertical-align: 2px; }
</style>
<template>
    <ul v-if="isLoaded" class="words-list">
        <li v-for="item in list">
            <article>{{{item.body | marked}}}</article>
            <div class="footer clearfix">
                <span class="label"><i class="icon icon-time"></i> {{item.updated_at | time}}</span>
                <em class="pull-right">- {{item.title}}</em>
            </div>
        </li>
    </ul>
    <placeholder v-else :is-empty="isEmpty"></placeholder>
</template>
<script>
    import marked from '../common/marked.min'
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
            },
            marked: function(content) {
                if(!content) {
                    return ''
                }
                return marked(content)
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
                    } else {
                        self.isLoaded = true
                        self.list = self.list.concat(res.data)
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
            Placeholder
        }
    }
</script>