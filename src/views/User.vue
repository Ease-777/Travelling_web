<template>
  <div class="page user-page">
    <h1>我的收藏</h1>

    <div v-if="favorites.length === 0" class="empty">
      <p>你还没有收藏任何景点。</p>
      <p>前往列表或详情页添加收藏，收藏会保存在浏览器的 LocalStorage 中（键名：`favorites`）。</p>
    </div>

    <ul v-else class="fav-list">
      <li v-for="item in favorites" :key="item.id" class="fav-item">
        <img v-if="item.img" :src="item.img" alt="" class="thumb" />
        <div class="meta">
          <h3>{{ item.name }}</h3>
          <p class="desc">{{ item.description }}</p>
          <p class="price">价格：{{ item.price }}</p>
        </div>
        <button class="remove" @click="remove(item.id)">取消收藏</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { allSpots } from '../assets/data.js'

const favorites = ref([])
const LS_KEY = 'favorites'

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
.user-page { padding: 16px }
.empty { color: #666; padding: 20px; }
.fav-list { list-style: none; padding: 0; margin: 0; }
.fav-item { display:flex; align-items:flex-start; gap:12px; padding:12px; border-bottom:1px solid #eee }
.thumb { width:86px; height:64px; object-fit:cover; background:#f2f2f2 }
.meta { flex:1 }
.meta h3 { margin:0 0 6px 0 }
.desc { margin:0 0 6px 0; color:#555; font-size:14px }
.price { margin:0; color:#333; font-weight:600 }
.remove { background:#ff6b6b; color:#fff; border:0; padding:6px 10px; cursor:pointer; border-radius:4px }
</style>