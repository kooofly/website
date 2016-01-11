<style>
    .placeholder{ margin-top: 200px; padding: 20px; min-height: 200px; height: 100%; text-align: center;  }
    .placeholder .bg{ margin: 0 auto 20px; width: 128px; height: 128px; display: block; filter: grayscale(1); }
    .placeholder .txt{ color: #ccc; font-size: 18px; }
</style>
<template>
    <div class="placeholder">
        <div class="wrapper">
            <img class="bg" src="../images/logo.png" alt="">
            <span class="txt">{{isEmpty ? textEmpty : textLoading}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['isEmpty'],
        data() {
            return {
                isEmpty: false,
                textLoading: 'Loading...',
                textEmpty: 'Opps, 主人很懒，还没写内容'
            }
        },
        method: function() {

        }
    }
</script>