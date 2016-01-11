<style>

</style>
<template>
    <v-nav></v-nav>
    <div class="sidebar-placeholder"></div>
    <div class="bd">
        <v-words :url="words_list_url"></v-words>
    </div>
</template>
<script>

    import config from '../config'
    import VNav from './nav.vue'
    import VWords from './words_list.vue'

    export default {
        data() {
            return {
                request: {
                    page: 1,
                    per_page: 5,
                    access_token: config.access_token
                },
                words_list_url: config.words_list_url
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
            VWords
        }
    }
</script>