<template>
  <div class="page">
    <h1>景点详情(前端2)</h1>
    <!-- 景点核心信息 -->
    <div class="spot-card" v-if="currentSpot">
      <!-- 景点名称 -->
      <h2 class="spot-name">{{ currentSpot.name }}</h2>
      <!-- 景点图片（懒加载+错误兜底） -->
      <img 
        :src="currentSpot.img" 
        alt="景点图片" 
        class="spot-img"
        loading="lazy"
        @error="handleImgError"
      />
      <!-- 景点描述 -->
      <p class="spot-desc">{{ currentSpot.description || '暂无详细介绍' }}</p>
      <!-- 门票价格（格式化展示） -->
      <p class="spot-price">门票价格：{{ formatPrice(currentSpot.price) }}</p>

      <!-- 点赞功能（持久化+样式优化） -->
      <div class="like-box">
        <button 
          @click="addLike" 
          class="like-btn"
          :class="{ liked: isLiked.value }"
          :disabled="isLiking.value"
        >
          👍 {{ isLiked.value ? '已点赞' : '点赞' }} {{ likeCount }}
        </button>
      </div>

      <!-- 评论区（带时间戳+列表优化） -->
      <div class="comment-area">
        <h3>评论区 <span class="comment-count">({{ commentList.length }})</span></h3>
        <div class="comment-input-wrap">
          <input
            v-model="newComment"
            placeholder="说说你的游玩感受吧~"
            class="comment-input"
            @keyup.enter="addComment"
          />
          <button 
            @click="addComment" 
            class="comment-btn"
            :disabled="!newComment.value.trim() || isCommenting.value"
          >
            提交评论
          </button>
        </div>
        <!-- 评论列表 -->
        <ul class="comment-list" v-if="commentList.length">
          <li v-for="(comment, index) in commentList" :key="comment.id || index">
            <div class="comment-content">{{ comment.content }}</div>
            <div class="comment-time">{{ comment.createTime }}</div>
          </li>
        </ul>
        <p class="no-comment" v-else>暂无评论，快来抢沙发~</p>
      </div>
    </div>
    <!-- 无匹配景点时提示 -->
    <div class="no-spot" v-else>暂无该景点信息</div>
  </div>
</template>

<script setup>
// 1. 引入工具 + 适配真实数据
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { allSpots } from '../assets/data.js'

// 2. 获取路由ID + 强类型转换
const route = useRoute()
const spotId = computed(() => Number(route.params.id)) // 转为数字类型，避免字符串匹配问题

// 3. 定义变量（优化健壮性+新增状态控制）
const currentSpot = ref(null)
const likeCount = ref(0)
const newComment = ref('')
const commentList = ref([])
const isLiking = ref(false) // 点赞防抖锁
const isCommenting = ref(false) // 评论防抖锁
const isLiked = ref(false) // 点赞状态标记

// 4. 格式化价格（处理空值、免费场景）
const formatPrice = (price) => {
  if (!price && price !== 0) return '暂无定价'
  return price === 0 ? '免费' : `¥${Number(price).toFixed(2)}`
}

// 5. 图片加载失败兜底
const handleImgError = (e) => {
  e.target.src = 'https://picsum.photos/800/400' // 兜底占位图
  e.target.alt = '景点图片加载失败'
}

// 6. 从localStorage恢复数据（持久化，刷新不丢失）
const restoreData = () => {
  // 恢复点赞数据
  const savedLike = localStorage.getItem(`spot_like_${spotId.value}`)
  if (savedLike) {
    const { count, liked } = JSON.parse(savedLike)
    likeCount.value = count
    isLiked.value = liked
  } else {
    // 初始值优化
    likeCount.value = 100 + spotId.value
  }

  // 恢复评论数据
  const savedComments = localStorage.getItem(`spot_comments_${spotId.value}`)
  if (savedComments) {
    commentList.value = JSON.parse(savedComments)
  }
}

// 7. 页面加载时匹配景点数据 + 恢复持久化数据
onMounted(() => {
  // 强类型匹配景点（避免id=1和id="1"不匹配）
  currentSpot.value = allSpots.find(item => Number(item.id) === spotId.value)
  
  // 恢复本地存储数据
  if (currentSpot.value) {
    restoreData()
  }
})

// 8. 点赞功能（防抖+持久化）
const addLike = async () => {
  if (isLiking.value || isLiked.value) return // 防抖+防止重复点赞
  isLiking.value = true

  // 更新点赞数和状态
  likeCount.value += 1
  isLiked.value = true

  // 持久化到localStorage
  localStorage.setItem(
    `spot_like_${spotId.value}`,
    JSON.stringify({ count: likeCount.value, liked: true })
  )

  // 防抖释放（模拟接口请求延迟，提升体验）
  setTimeout(() => {
    isLiking.value = false
  }, 500)
}

// 9. 提交评论功能（防抖+时间戳+持久化+去空）
const addComment = async () => {
  const commentContent = newComment.value.trim()
  if (!commentContent || isCommenting.value) return // 非空校验+防抖

  isCommenting.value = true

  // 构造评论数据
  const newCommentItem = {
    id: Date.now(), // 唯一标识（避免列表key重复）
    content: commentContent,
    createTime: new Date().toLocaleString() // 本地时间戳
  }

  // 更新评论列表
  commentList.value.unshift(newCommentItem) // 最新评论排在前面

  // 持久化评论数据
  localStorage.setItem(
    `spot_comments_${spotId.value}`,
    JSON.stringify(commentList.value)
  )

  // 清空输入框
  newComment.value = ''

  // 防抖释放
  setTimeout(() => {
    isCommenting.value = false
  }, 500)
}
</script>

<style scoped>
/* 优化视觉质感，增加过渡效果，提升高级感 */
.page {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Microsoft YaHei", sans-serif;
}

.spot-card {
  margin-top: 24px;
  padding: 28px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.spot-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.spot-name {
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 12px;
  margin: 0 0 20px 0;
  font-size: 24px;
}

.spot-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin: 20px 0;
  border-radius: 8px;
  transition: opacity 0.5s ease;
}

.spot-desc {
  line-height: 1.9;
  color: #555555;
  margin: 16px 0;
  font-size: 15px;
  text-align: justify;
}

.spot-price {
  color: #e63946;
  font-weight: 600;
  font-size: 16px;
  margin: 12px 0;
}

.like-box {
  margin: 24px 0;
}

.like-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.like-btn.liked {
  background: #90e0c0;
  cursor: not-allowed;
}

.like-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.comment-area {
  margin-top: 36px;
}

.comment-count {
  color: #999999;
  font-size: 14px;
  font-weight: normal;
}

.comment-input-wrap {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  align-items: center;
}

.comment-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.comment-input:focus {
  outline: none;
  border-color: #42b983;
}

.comment-btn {
  background: #2196f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.comment-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.comment-btn:hover:not(:disabled) {
  background: #1976d2;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.comment-list li {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: background 0.3s ease;
}

.comment-list li:hover {
  background: #f1f3f5;
}

.comment-content {
  color: #2c3e50;
  font-size: 15px;
  margin-bottom: 8px;
}

.comment-time {
  color: #999999;
  font-size: 12px;
  text-align: right;
}

.no-comment, .no-spot {
  color: #999999;
  margin: 16px 0;
  font-size: 14px;
  text-align: center;
}
</style>