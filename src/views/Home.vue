<template>
    <div class="page">
        <h1>首页</h1>

        <!--list-->
        <router-link :to="{path:'/list'}" class="list-link">查看全部景点列表</router-link>

        <!--搜索栏-->  
        <div class="search-container">
            <input type="text" v-model="inputKeyword" @keyup.enter="handleSearch" placeholder="请输入景点名称或关键词">
            <button @click="handleSearch">搜索</button>
        </div>
        <!--轮播图-->
        <div class="carousel" @mouseenter="stopPlay" @mouseleave="autoPlay" ref="carouselRef">
            <!--图片列表，通过transform动态平移切换-->
            <div class="carousel-list" :style="{transform:`translateX(-${currentIndex * 100}%)`}">
                <div class="carousel-item" v-for="(item, index) in carouselList" :key="index" @click="turnTodetailById(index)">
                    <img :src="item" alt="景点图片">
                    <div class="carousel-item-title">{{ allSpots[index].name }}</div>
                </div>
            </div>
            <!--左右切换箭头-->
            <button class="carousel-pre-btn" @click="pre"><-</button>
            <button class="carousel-next-btn" @click="next">-></button>

            <!--小圆点-->
            <div class="carousel-indicators">
                <span 
                @click="switchTo(index)" 
                v-for="item, index in carouselList" :key="index" 
                :class="{active: currentIndex === index}">
                </span>
            </div>
        </div>

        
    </div>
</template>


<script setup>
    import {ref, onMounted, onUnmounted} from 'vue'
    import { useRouter } from 'vue-router'
    import { allSpots } from '../assets/data'

    const router = useRouter()

    const currentIndex = ref(0)
    const timer = ref(null) //定时器
    const carouselRef = ref(null)

    const carouselList = ref([])
    for (const item of allSpots){
        const imgurl = item.img
        carouselList.value.push(imgurl)
    }

    const switchTo = (index) => {
        const len = carouselList.value.length
        //边界处理
        if (index < 0){
            currentIndex.value = len - 1
        } else if (index >= len){
            currentIndex.value = 0
        } else {
            currentIndex.value = index
        }
    }

    const pre = () => {
        switchTo(currentIndex.value - 1)
    }
    const next = () => {
        switchTo(currentIndex.value + 1)
    }
    //跳转到detail界面
    const turnTodetailById = (index) => {
        router.push({path:`/detail/${index}`, query:{id: index}})
    }

    const autoPlay = () => {
        timer.value = setInterval(() => {
            switchTo(currentIndex.value + 1)
        }, 3000) //三秒切换一次图片
    }

    const stopPlay = () => {
        clearInterval(timer.value)
    }

    onMounted(() => {
        clearInterval(timer.value)
        autoPlay()
    })

    onUnmounted(() => {
        stopPlay()
    })


    //处理搜索和跳转SearchRes.vue
    const inputKeyword = ref('')
    const handleSearch = () => {
        if (!inputKeyword.value.trim()){
            alert('请输入关键词')
            return
        }
        router.push({path:'/searchres', query:{keyword: inputKeyword.value.trim()}})
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

/* 搜索栏样式 */
.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto var(--spacing-xl) auto;
  gap: var(--spacing-sm);
}

.search-container input {
  flex: 1;
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-normal);
}

.search-container input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.search-container button {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.search-container button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* 轮播图样式 */
.carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto var(--spacing-xl) auto;
  overflow: hidden;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
}

.carousel-list {
  display: flex;
  transition: transform var(--transition-normal);
  height: 400px;
}

.carousel-item {
  flex: 0 0 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
  border-radius: 0;
}

.carousel-item:hover img {
  transform: scale(1.05);
}

/* 轮播图标题样式 */
.carousel-item-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-md);
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  font-size: var(--font-size-lg);
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  z-index: 5;
}

/* 轮播图控制按钮 */
.carousel-pre-btn,
.carousel-next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--text-primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.carousel-pre-btn {
  left: var(--spacing-md);
}

.carousel-next-btn {
  right: var(--spacing-md);
}

.carousel-pre-btn:hover,
.carousel-next-btn:hover {
  background-color: white;
  box-shadow: var(--shadow-md);
  transform: translateY(-50%) scale(1.1);
}

/* 轮播图指示器 */
.carousel-indicators {
  position: absolute;
  bottom: var(--spacing-md);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
}

.carousel-indicators span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.carousel-indicators span.active {
  background-color: white;
  width: 30px;
  border-radius: 5px;
}

/* 列表链接样式 */
.list-link {
  display: block;
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--primary-color);
  font-size: var(--font-size-lg);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.list-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .page {
    padding: var(--spacing-md);
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .carousel {
    max-width: 100%;
  }
  
  .carousel-item {
    flex: 0 0 100%;
  }
  
  .carousel-list {
    height: 250px;
  }
}
</style>