<style>
    /* article */
    article{ font-size: 1.15em; text-align: left; }
    article .info{ font-size:1em; margin: 5em 0 1.4em; }

    article .info a{ color: #455c88; display: inline-block; margin-left:0.2em; padding:0 0.2em; border-bottom:1px solid rgba(255, 51, 54, 0.79); }
    article img{ max-width: 100%; }
    article h1{ font-size:2.4em; font-weight: 400; }
    article h1,
    article h2,
    article h3,
    article h4{ font-weight: 500; }
    article .content{ font-size: 1.165em; margin:1.6em 0; line-height:2; }
    article .content p{ margin: 1em 0; }

    /* desert scheme ported from vim to google prettify */
    pre.prettyprint { display: block; background-color: #333 }
    pre .nocode { background-color: none; color: #000 }
    pre .str { color: #ffa0a0 } /* string  - pink */
    pre .kwd { color: #f0e68c; font-weight: bold }
    pre .com { color: #87ceeb } /* comment - skyblue */
    pre .typ { color: #98fb98 } /* type    - lightgreen */
    pre .lit { color: #cd5c5c } /* literal - darkred */
    pre .pun { color: #fff }    /* punctuation */
    pre .pln { color: #fff }    /* plaintext */
    pre .tag { color: #f0e68c; font-weight: bold } /* html/xml tag    - lightyellow */
    pre .atn { color: #bdb76b; font-weight: bold } /* attribute name  - khaki */
    pre .atv { color: #ffa0a0 } /* attribute value - pink */
    pre .dec { color: #98fb98 } /* decimal         - lightgreen */

    /* Specify class=linenums on a pre to get line numbering */
    ol.linenums { margin-top: 0; margin-bottom: 0; color: #AEAEAE } /* IE indents via margin-left */
    li.L0,li.L1,li.L2,li.L3,li.L5,li.L6,li.L7,li.L8 { list-style-type: none }
    /* Alternate shading for lines */
    li.L1,li.L3,li.L5,li.L7,li.L9 { }

    @media print {
        pre.prettyprint { background-color: none }
        pre .str, code .str { color: #060 }
        pre .kwd, code .kwd { color: #006; font-weight: bold }
        pre .com, code .com { color: #600; font-style: italic }
        pre .typ, code .typ { color: #404; font-weight: bold }
        pre .lit, code .lit { color: #044 }
        pre .pun, code .pun { color: #440 }
        pre .pln, code .pln { color: #000 }
        pre .tag, code .tag { color: #006; font-weight: bold }
        pre .atn, code .atn { color: #404 }
        pre .atv, code .atv { color: #060 }
    }
</style>
<template>
    <article v-if="isLoaded">
        <div class="info clearfix">
            <span class="pull-left">
                {{article.updated_at | time}}
            </span>
            <span class="pull-right">
                <a href="#comments">Comments {{article.comments}}</a>
            </span>
        </div>
        <h1>{{article.title}}</h1>
        <div class="content">
            {{{article.body | marked}}}
        </div>
    </article>
    <placeholder v-else :is-empty="isEmpty"></placeholder>
</template>
<script>
    import Placeholder from './placeholder.vue'
    import marked from '../common/marked.min'
    export default {
        props: ['url'],
        data() {
            return {
                isLoaded: false,
                article: null
            }
        },
        watch: {
            url: function(val, oldVal) {
                var self = this,
                    loading = self.$root.$refs.loading
                this.$http.get({
                    url: val,
                }).then(function(res) {
                    loading.done()
                    self.isLoaded = true
                    self.$set('article', res.data)
                }, function() {
                    loading.done()
                    self.$set('isEmpty', true)
                })
            }
        },
        filters: {
            marked: function(text) {
                if(text) {
                    return marked(text)
                }
                return ''
            },
            time: function(time) {
                if(time){
                    return time.replace(/[A-Z]/g, ' ')
                }
                return ''
            }
        },
        components: {
            Placeholder
        }

    }
</script>