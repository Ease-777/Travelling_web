<template>
  <div class="app-container">
    <!-- 顶部导航栏 (固定在最上面) -->
    <nav class="navbar">
      <div class="logo">旅游导览</div>
      <div class="links">
        <router-link to="/">首页</router-link>
        <router-link to="/list">景点列表</router-link>
        <router-link to="/user">我的收藏</router-link>
      </div>
    </nav>

    <!-- 页面内容显示区 -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style>
/* 全局基础样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', sans-serif;
  background-color: #f5f7fa; 
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  z-index: 1000;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #42b983;
}

.links a {
  text-decoration: none;
  color: #606266;
  margin-left: 30px;
  font-size: 16px;
  transition: color 0.3s;
}

.links a:hover {
  color: #42b983;
}

/* 激活状态：当前在哪个页面，哪个链接就变色 */
.links a.router-link-active {
  color: #42b983;
  font-weight: bold;
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
}

/* 内容区域样式 */
.main-content {
  margin-top: 60px; 
  padding: 20px;
  min-height: calc(100vh - 60px);
}
</style>