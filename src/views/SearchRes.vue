<template>
    <div class="search-result-page">
        <!--搜索结果-->
        <router-link :to="{path:'/'}" class="back-home">返回首页</router-link>
        
        <h2 class="search-title">搜索结果: {{currentKeyword}}</h2>
        
        <div v-if="resList.length === 0" class="no-result">
            未找到“{{currentKeyword}}”相关内容
        </div>
        
        <div v-else class="result-list">
            <div class="res-item" v-for="item in resList" :key="item.id" @click="turnTodetail(item.id)">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
            </div>
        </div>

        <!--搜索栏-->
        <div class="search-bar">
            <input type="text" v-model="inputKeyword" @keyup.enter="handleReSearch" placeholder="请输入新的搜索关键词">
            <button @click="handleReSearch">搜索</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { allSpots } from '../assets/data'
    const route = useRoute()
    const router = useRouter()

    const currentKeyword = ref('')
    const inputKeyword = ref('')
    const resList = computed(() => {
        if(!currentKeyword.value.trim()){
            return []
        }
        const key = currentKeyword.value.trim().toLowerCase()
        return allSpots.filter(item => item.name.toLowerCase().includes(key) || item.description.toLowerCase().includes(key))
    })

   watch(
    () => route.query.keyword,
    (newKeyword) => {
        if (newKeyword){
            currentKeyword.value = newKeyword
            inputKeyword.value = newKeyword
        }
        else {
            currentKeyword.value = ''
        }
    },
    {immediate: true}
   )

    const handleReSearch = () => {
        if (!inputKeyword.value.trim()){
            alert("请输入关键词")
            return
        }
        router.push({path:'/searchres', query:{keyword: inputKeyword.value.trim()}})
    }

    const turnTodetail = (id) => {
        // 根据id值找到对应的索引值
        const index = allSpots.findIndex(item => item.id === id)
        if (index !== -1) {
            router.push({path:`/detail/${index}`, query:{id: index}})
        }
    }
</script>

<style scoped>
/* 页面容器样式 */
.search-result-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* 返回首页链接 */
.back-home {
  display: inline-block;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-fast);
  font-size: var(--font-size-sm);
}

.back-home:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* 搜索结果标题 */
.search-title {
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  font-size: var(--font-size-xl);
}

/* 无结果提示 */
.no-result {
  text-align: center;
  padding: var(--spacing-2xl) 0;
  color: var(--text-muted);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
}

/* 搜索结果列表 */
.result-list {
  margin-bottom: var(--spacing-xl);
}

/* 单个搜索结果项 */
.res-item {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.res-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 搜索结果标题 */
.res-item h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  transition: color var(--transition-fast);
}

.res-item:hover h3 {
  color: var(--primary-color);
}

/* 搜索结果描述 */
.res-item p {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 搜索栏容器 */
.search-bar {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: var(--spacing-sm);
}

/* 搜索输入框 */
.search-bar input {
  flex: 1;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-normal);
}

.search-bar input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

/* 搜索按钮 */
.search-bar button {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.search-bar button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* 响应式样式 */
@media (max-width: 768px) {
  .search-result-page {
    padding: var(--spacing-md);
  }
  
  .search-bar {
    flex-direction: column;
  }
}
</style>