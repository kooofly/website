<style>

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        } }
    @keyframes rotateReverse1 {
        0% {
            transform: translate(-50%,-50%) rotate(360deg);
        }
        100% {
            transform: translate(-50%,-50%) rotate(0deg);
        } }
    @keyframes rotateReverse2 {
        0% {
            transform: translate(-50%,50%) rotate(360deg);
        }
        100% {
            transform: translate(-50%,50%) rotate(0deg);
        } }

    .loading,
    .loading *,
    .loading :after,
    .loading :before{ transition: all .3s ease; }
    .loading:after{ transition: all .5s ease; }
    .loading-promise{
        position: absolute;
        width: 60px;
        height: 60px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .loading-promise:before,
    .loading-promise:after{
        position: absolute;
        content: ' ';
        display: block;
        border: 4px solid;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-color: transparent #fff transparent #fff;

    }
    .loading-promise:before{ animation: rotate 1s 0s linear infinite; }
    .loading-promise:after{ opacity: 0 }
    .loading-promise .inner{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .loading-promise .inner:before,
    .loading-promise .inner:after{
        position: absolute;
        content: ' ';
        display: block;
        border: 4px solid;
        border-radius: 50%;
        width: 62%;
        height: 62%;

    }

    .loading-promise .inner:before{
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-color: #fff transparent transparent transparent;
        animation: rotateReverse1 1s 0s linear infinite;
    }
    .loading-promise .inner:after{
        bottom: 50%;
        left: 50%;
        transform: translate(-50%,50%);
        border-color: transparent transparent #fff transparent;
        animation: rotateReverse2 1s 0s linear infinite;
    }
    .loading-promise-success:before,
    .loading-promise-error:before{
        transform: rotatez(360deg);
        opacity: 0;
        animation: rotate .5s 0s linear 2;
    }
    .loading-promise-success:after,
    .loading-promise-error:after{
        border-color: #fff;
        transform: rotatez(360deg);
        opacity: 1;
    }
    .loading-promise-success .inner:before{
        border-radius: 0;
        height: 4px;
        border: none;
        width: 30%;
        top: 52%;
        left: 18%;
        -webkit-transform: rotatez(45deg);
        transform: rotatez(45deg);
        background: #fff;
        -webkit-animation: none;
        animation: none;
    }
    .loading-promise-success .inner:after{
        border-radius: 0;
        height: 4px;
        border: none;
        width: 50%;
        top: 48%;
        left: 35%;
        -webkit-transform: rotatez(-45deg);
        transform: rotatez(-45deg);
        background: #fff;
        -webkit-animation: none;
        animation: none;
    }

    .loading-promise-error {}
    .loading-promise-error .inner:before{
        border-radius: 0;
        height: 4px;
        border: none;
        top: 49%;
        left: 18%;
        -webkit-transform: rotatez(45deg);
        transform: rotatez(45deg);
        background: #fff;
        -webkit-animation: none;
        animation: none;
    }
    .loading-promise-error .inner:after{
        border-radius: 0;
        height: 4px;
        border: none;
        top: 46%;
        left: 19%;
        -webkit-transform: rotatez(-45deg);
        transform: rotatez(-45deg);
        background: #fff;
        -webkit-animation: none;
        animation: none;
    }
    .loading-wrapper{
        position: absolute; width: 100%; height: 100%; min-height: 80px;
        opacity: 1; background: #ddd;
        z-index: 150; transition: all 1s ease; }
    .loading-opacity{ opacity: 0; }
    .loading-wrapper-success{ background: #5cb85c; }
    .loading-wrapper-warning{ background: #f0ad4e; }
    .loading-wrapper-danger{ background: #d9534f; }
    .loading-wrapper-info{ background: #5bc0de; }
    .loading-wrapper-primary{ background: #7799bb; }
    .progress{ position: absolute; left: 0; top: 0; z-index: 160; width: 100%; }
    .progress-top{ position: fixed; }
    .progress .bar{
        transition: all .2s ease;
    }
</style>
<template>
    <div v-show="isShow" :class="['progress-' + state]" class="progress {{cls}}" v-if="isProgress">
        <div class="bar tran" :style="{ width: width + '%' }"></div>
    </div>
    <div v-if="isPromise" v-show="isShow" class="loading-wrapper" :class="['loading-wrapper-' + state, cls, isSuccess && 'loading-opacity']" :style="{ height: height + 'px' }">
        <div class="loading-promise loading" :class="[isSuccess && 'loading-promise-success', isError && 'loading-promise-error' ]">
            <div class="inner"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['isProgress', 'cls', 'state', { width: { default: 0 } }, 'height', 'isPromise', 'isShow'],
        data() {
            return {
                width: 0,
                isShow: true,
                isSuccess: false,
                isError: false,
                intervalId: null
            }
        },
        ready: function() {
            this.isProgress && this.progress();
        },
        methods: {
            reset: function() {
                if(this.$get('isProgress')) {
                    this.reset_progress()
                }
                if(this.$get('isPromise')) {
                    this.reset_promise()
                }
            },
            start: function(type) {
                if(type === 'promise'){
                    this.$set('isPromise', true)
                } else {
                    this.$set('isProgress', true)
                }

            },
            reset_progress: function() {
                this.$set('width', 0)
                this.$set('isProgress', false)
            },
            reset_promise: function() {
                this.$set('isError', false)
                this.$set('isSuccess', false)
                this.$set('isShow', true)
            },
            widthCalc: function(interval) {
                var width = this.$get('width'),
                    threshold = 30, //匀速阈值
                    total = 100,
                    increment //增量
                if(width <= threshold) {
                    //匀速阶段
                    increment = threshold * interval / 1000

                } else if(width > threshold && width < total) {
                    //随机速度阶段
                    increment = Math.floor((total - width) * .1 * Math.random() * 1000) / 1000
                }
                this.$set('width', Math.floor( (width + increment) * 1000) / 1000)
            },
            progress: function() {
                var self = this,
                    interval = 200 //执行间隔
                var intervalId = setInterval(function() {
                    self.widthCalc(interval)
                }, interval)
                self.$set('intervalId', intervalId)
            },
            success: function() {
                var self = this
                this.$set('isSuccess', true)
                var id = setTimeout(function() {
                    self.$set('isPromise', false)
                    clearTimeout(id)
                }, 1000)
            },
            fail: function() {
                this.$set('isError', true)
            },
            done: function(isResolve) {
                var self = this, timeoutId
                if(this.$get('isProgress')) {
                    this.$set('width', 100)
                    clearInterval(this.$get('intervalId'))
                    timeoutId = setTimeout(function() {
                        self.reset_progress()
                        clearTimeout(timeoutId)
                    }, 300)
                }

                if(this.$get('isPromise')) {
                    isResolve ? this.success() : this.fail()
                    timeoutId = setTimeout(function() {
                        self.reset_promise()
                        clearTimeout(timeoutId)
                    }, 1000)
                }
            }
        }
    }
    /*loading({
        type: 'circle || progress || placeholder',
        placeholder: {
            width: 100,
            height: 100
        }
    })
    modal({
        type: 'alert || modal || confirm',
        title: '',
        body: '',
        button: {
            success: {
                text: '确定',
                callback: function() {},
                className: '',
                attr: ''
            },
            cancel: {
                text: '取消',
                callback: function() {}
            }
        }
    })*/
</script>