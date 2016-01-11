<style scoped>
    .media{ margin:10px; }
    .media-left{  }
    .media-body{}
    .title{ background: none; white-space: pre; }
    .item{ border: 1px solid #fff; display: inline-block; padding: 6px 10px; background: #f1f1f1; margin: 10px; cursor: pointer; }
    .selected{ border: 1px solid red; }
    .disabled{ border: 1px dashed #ccc; cursor: not-allowed; }
</style>

<template>
    <div v-for="(index, list) in lists" class="media">
        <div class="media-left">
            <label class="title">{{list.title}}</label>
        </div>
        <div class="media-body">
            <span class="item" :class="{ 'selected': selected[index] == item, 'disabled': disabled[item] }" v-for="item in list.sku" v-on:click="change(index, item, $event)" name="{{list.title}}">
                {{item}}
            </span>
        </div>
    </div>
    <div v-if="model.id">ID: {{model.id}} | count: {{model.count}}</div>
</template>
<script>
    export default {
        props: ['lists', 'map'],
        data() {
            return {
                skuCount: 0,
                /*lists: [
                    {
                        title: '颜色',
                        sku: ['红', '黄', '蓝']
                    }
                ],
                data: [
                    {
                        sku: '红#M#1',
                        id: 1,
                        count: 0
                    }
                ],*/
                map: [],
                lists: [],
                selected: [],
                disabled: {},
                disabledTemp: [],
                defaults: 'auto', //auto || 红#XL
                model: {} //可以放 默认值
            }
        },
        ready: function() {
            console.log(this)
            this.$watch('data.lists', function() {
                console.log(1);
            })
            this.$watch('lists', function() {
                console.log(1);
            })
        },
        watch: {
            lists: function(val, oldVal) {
                console.log(2)
                if(this.$get('map').length) {
                    //取样计算
                    var aSampling = this.$get('map')[0].sku.split('#')
                    this.$set('skuCount', aSampling.length)
                }
                //默认值
                var defaults = this.$get('defaults'),
                        defSku
                if(defaults) {
                    if(defaults === 'auto') {
                        var data = this.$get('map')
                        for (var i = 0, j = data.length; i < j; i++) {
                            var o = data[i]
                            if(o.count) {
                                defSku = o.sku
                                break
                            }
                        }
                    } else {
                        defSku = defaults
                    }
                    defSku && this.selectPro(defSku)
                }
            }
        },
        methods: {
            selectPro: function(sku) {
                var result = sku.split('#')
                for (var i = 0, j = result.length; i < j; i++) {
                    this.change(i, result[i])
                }
            },
            change: function(index, item, e) {
                if(this.disabled[item]) return
                this.selected[index] === item ? this.unSelect(index) : this.select(index, item)

                var map = [{}].concat(this.disabledTemp)
                this.$set('disabled', this.mix.apply(this, map))
            },
            select: function(index, item) {
                var data = this.$get('map')
                var temp = {}
                this.$get('selected')[index] = item
                var selected = this.$get('selected')
                //对比length 判断是否选择完全一个规格组合
                if(this.isSelectAll(selected)) {
                    for (var i = 0, j = data.length; i < j; i++) {
                        var o = data[i]
                        this.setItem(selected, o)
                        this.checkStatus(index, item, o, temp)
                    }
                } else {
                    for (var i = 0, j = data.length; i < j; i++) {
                        var o = data[i]
                        this.checkStatus(index, item, o, temp)
                    }
                }
                //缓存每个项的禁用列表
                this.disabledTemp[index] = temp
            },
            unSelect: function(index) {
                this.selected[index] = undefined
                this.disabledTemp[index] = undefined
                this.model.id = null
                this.model.count = null
            },
            setItem: function(selected, item) {
                var sku = selected.join('#')
                item.sku === sku && this.$set('model', { id: item.id, count: item.count })
            },
            isSelectAll: function(selected) {
                var result = true
                if(this.$get('skuCount') === selected.length) {
                    for (var i = 0, j = selected.length; i < j; i++) {
                        if(selected[i] === undefined) {
                            result = false
                        }
                    }
                } else {
                    result = false
                }
                return result
            },
            checkStatus: function(index, item, o, result) {
                var sku = o.sku.split('#')
                if(sku[index] === item) {
                    for (var i = 0, j = sku.length; i < j; i++) {
                        var key = sku[i];
                        if(index !== i) {
                            if(o.count === 0) {
                                result[key] !== false && ( result[key] = true )
                            } else {
                                result[key] = false
                            }
                        }
                    }
                }
            },
            //特殊的mix
            mix: function(o) {
                var i = 1,
                        l = arguments.length
                for ( ; i < l; i++ ) {
                    var arg = arguments[i]
                    for ( var k in arg ) {
                        if( arg.hasOwnProperty( k ) ){
                            if(!o[k]) {
                                o[k] = arg[k]
                            }
                        }
                    }
                }
                return o;
            }
        }
    }
</script>