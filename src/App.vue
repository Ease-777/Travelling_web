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
/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--card-bg);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-2xl);
  box-sizing: border-box;
  z-index: 1000;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--primary-color);
}

.links a {
  text-decoration: none;
  color: var(--text-secondary);
  margin-left: var(--spacing-lg);
  font-size: var(--font-size-base);
  transition: color var(--transition-normal);
}

.links a:hover {
  color: var(--primary-color);
}

/* 激活状态：当前在哪个页面，哪个链接就变色 */
.links a.router-link-active {
  color: var(--primary-color);
  font-weight: bold;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: var(--spacing-xs);
}

/* 内容区域样式 */
.main-content {
  margin-top: 60px;
  padding: var(--spacing-lg);
  min-height: calc(100vh - 60px);
}
</style>