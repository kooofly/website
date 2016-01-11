<style type="text/css">
  .sidebar .wrapper-logo{
    display: block;
    text-align: left;
    padding: 10px 20px;
    font-size: 0;
  }

  .logo{  display:block;}
  .logo img,
  .logo .text { vertical-align: middle; -webkit-transition: all .2s ease; transition: all .2s ease;  }
  .logo .text{ font-size: 20px; display: inline-block; margin: 0 10px;color: #1C2327;text-shadow: 1px 1px 1px #707488;}
  .logo img{ width: 55px; height: 55px; padding: 10px; background: #2C2F3C; border-radius: 5px;}
  .logo:hover .text{ color: #d9534f;text-shadow: 1px 1px 1px #0D0E10;}
</style>
<template>
  <div class="wrapper-logo">
    <a class="logo" v-link="'/'">
      <img src="../images/logo.png" alt="">
      <span class="text">KOOOFLY</span>
    </a>
  </div>
</template>