<style>

</style>
<template>
    <v-nav></v-nav>
    <div class="sidebar-placeholder"></div>
    <div class="bd">
        <v-article :url="article_url"></v-article>
    </div>
</template>
<script>

    import config from '../config'
    import VNav from './nav.vue'
    import VArticle from './article.vue'

    export default {
        data() {
            return {
                article_url: null
            }
        },
        ready: function() {
            var loading = this.$root.$refs.loading
            loading.start()
            var id = this.$route.params.id
            this.$set('article_url', config.article_url + id)
        },
        components: {
            VNav,
            VArticle
        }
    }
</script>