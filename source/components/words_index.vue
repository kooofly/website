<style>
    .words{ padding: 20px; background: #f3f3f3; margin-bottom: 40px;   }
    .words .title{font-size: 1.2em;}
    .words .title .icon{font-size: 1.2em;margin-right: 10px;}
    .words ul{ padding:0; list-style: none; font-family: Arial, sans-serif; line-height: 1.5 }
    .words ul li{ padding-bottom: 40px; }
    .words .content{ word-break: break-all; word-wrap: break-word; text-shadow: 1px 1px 1px #fff; }
</style>
<template>
    <div class="words">
        <div class="title"><i class="icon icon-words"></i>简说</div>
        <ul>
            <li v-for="item in words">
                <div class="content">{{{item.body | marked}}}</div>
                <div class="text-right"><em>- {{item.title}}</em></div>
            </li>
        </ul>
    </div>
</template>
<script>
    import marked from '../common/marked.min'
    export default {
        props: [{name: 'url', default: ''}],
        data() {
            return {
                words: null
            }
        },
        ready() {
            var self = this
            this.$http.get({
                url: this.url
            }).then(function(res) {
                self.$set('words', res.data)
            }, function() {

            })
            console.log()
        },
        filters: {
            marked: function(text) {
                if(text) {
                    return marked(text)
                }
                return ''
            }
        }

    }
</script>