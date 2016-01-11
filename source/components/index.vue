<template>

    <v-nav></v-nav>
    <div class="sidebar-placeholder"></div>
    <div class="bd">
        <v-article-list :url="article_list_url" :request="request"></v-article-list>
    </div>
    <div class="right">
        <v-about></v-about>
        <v-words :url="words_url"></v-words>
    </div>
</template>
<script>
    import common from '../common/common'
    import config from '../config'
    import VNav from './nav.vue'
    import VArticleList from './article_list.vue'
    import VWords from './words_index.vue'
    import VAbout from './about.vue'
    export default {
        data() {
            return {
                request: common.mix({
                    page: 1,
                    per_page: 10
                }, config.client),
                article_list_url: config.article_list_url,
                words_url: config.words_index_url
            }
        },
        ready: function() {
            var loading = this.$root.$refs.loading
            loading.start()
            //https://api.github.com/repositories/1207821/issues?filter=created&page=1&per_page=15
//
        },
        components: {
            VNav,
            VArticleList,
            VWords,
            VAbout
        }
    }
</script>