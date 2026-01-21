<template>
  <div class="page">
    <h1>景点列表</h1>
    <div class="list">
      <div class="item" v-for="(item, index) in allSpots" :key="item.id" @click="turnTodetail(index)">
        <img :src="item.img" :alt="item.name">
        <div class="item-content">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { allSpots } from '../assets/data';

  const router = useRouter()

  const turnTodetail = (index) => {
    router.push({path:`/detail/${index}`, query:{id: index}})
  }
</script>

<style scoped>
/* 页面容器样式 */
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* 标题样式 */
.page h1 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  font-size: var(--font-size-2xl);
}

/* 景点列表容器 */
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

/* 单个景点项 */
.item {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

/* 景点图片 */
.item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0;
  transition: transform var(--transition-slow);
}

.item:hover img {
  transform: scale(1.05);
}

/* 景点信息 */
.item-content {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 景点名称 */
.item h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  line-height: 1.4;
}

/* 景点描述 */
.item p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .page {
    padding: var(--spacing-md);
  }
  
  .list {
    grid-template-columns: 1fr;
  }
  
  .item img {
    height: 180px;
  }
}
</style>