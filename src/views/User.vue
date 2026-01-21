<template>
  <div class="page user-page">
    <h1>我的收藏</h1>

    <div v-if="favorites.length === 0" class="empty">
      <p>你还没有收藏任何景点。</p>
      <p>前往列表或详情页添加收藏，收藏会保存在浏览器的 LocalStorage 中（键名：`favorites`）。</p>
    </div>

    <ul v-else class="fav-list">
      <li v-for="item in favorites" :key="item.id" class="fav-item" @click="turnTodetail(item.id)">
        <img v-if="item.img" :src="item.img" alt="" class="thumb" />
        <div class="meta">
          <h3>{{ item.name }}</h3>
          <p class="desc">{{ item.description }}</p>
          <p class="price">价格：{{ item.price }}</p>
        </div>
        <button class="remove" @click.stop="remove(item.id)">取消收藏</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { allSpots } from '../assets/data.js'

const favorites = ref([])
const LS_KEY = 'favorites'
const router = useRouter()

const turnTodetail = (id) => {
  // 根据id值找到对应的索引值
  const index = allSpots.findIndex(item => item.id === id)
  if (index !== -1) {
    router.push({path:`/detail/${index}`, query:{id: index}})
  }
}

function loadFromLocalStorage() {
  const raw = localStorage.getItem(LS_KEY)
  if (!raw) {
    favorites.value = []
    return
  }

  try {
    const parsed = JSON.parse(raw)
    // parsed might be an array of ids ([1,2,3]) or array of objects
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        favorites.value = []
        return
      }

      const first = parsed[0]
      if (typeof first === 'number' || typeof first === 'string') {
        // array of ids -> map to allSpots
        const ids = parsed.map(x => Number(x))
        favorites.value = allSpots.filter(s => ids.includes(s.id))
        return
      }

      if (typeof first === 'object') {
        // array of objects -> assume they have id,name,img...
        favorites.value = parsed
        return
      }
    }

    // fallback: treat as empty
    favorites.value = []
  } catch (e) {
    console.warn('无法解析 favorites（LocalStorage）:', e)
    favorites.value = []
  }
}

function saveIdsToLocalStorage(ids) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids))
}

function remove(id) {
  // update favorites in-memory
  const idx = favorites.value.findIndex(i => i.id === id)
  if (idx === -1) return
  favorites.value.splice(idx, 1)

  // attempt to keep LocalStorage in id-array form if possible
  const raw = localStorage.getItem(LS_KEY)
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0 && (typeof parsed[0] === 'number' || typeof parsed[0] === 'string')) {
      const ids = parsed.map(x => Number(x)).filter(x => x !== id)
      saveIdsToLocalStorage(ids)
      return
    }
  } catch (e) {
    // ignore
  }

  // otherwise save as array of objects
  saveIdsToLocalStorage(favorites.value.map(i => i.id))
}

onMounted(() => {
  loadFromLocalStorage()
})
</script>

<style scoped>
/* 页面容器样式 */
.user-page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

/* 标题样式 */
.user-page h1 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  font-size: var(--font-size-2xl);
}

/* 空收藏提示 */
.empty {
  text-align: center;
  padding: var(--spacing-2xl) 0;
  color: var(--text-muted);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
}

.empty p {
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

/* 收藏列表 */
.fav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 单个收藏项 */
.fav-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--card-bg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-md);
  transition: all var(--transition-normal);
}

.fav-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* 收藏项图片 */
.thumb {
  width: 100px;
  height: 75px;
  object-fit: cover;
  background-color: #f2f2f2;
  border-radius: var(--border-radius-md);
  flex-shrink: 0;
}

/* 收藏项信息 */
.meta {
  flex: 1;
  min-width: 0;
}

.meta h3 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desc {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  margin: 0;
  color: var(--accent-color);
  font-weight: 600;
  font-size: var(--font-size-sm);
}

/* 取消收藏按钮 */
.remove {
  background-color: var(--accent-color);
  color: white;
  border: 0;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: var(--spacing-xs);
}

.remove:hover {
  background-color: #c1121f;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* 响应式样式 */
@media (max-width: 768px) {
  .user-page {
    padding: var(--spacing-md);
  }
  
  .fav-item {
    flex-direction: column;
  }
  
  .thumb {
    width: 100%;
    height: 150px;
  }
  
  .remove {
    align-self: flex-start;
    margin-top: var(--spacing-md);
  }
}
</style>