<template>
  <div id="login">
    <img class="bg" src="./bg.jpg" alt="星洞-登陆页背景">
    <!-- 登陆的mask调用全局mask -->
    <div class="content">
      <div class="logo"></div>
      <div class="form">
        <div class="username"></div>
        <div class="password"></div>
        <div class="actions"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'login',
  }
</script>
<style>
  #login {
    width: 100%;
    height: 100%;
  }
  .bg {
    width: 100%;
    height: 100%;
  }
</style>

