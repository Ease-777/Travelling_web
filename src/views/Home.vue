<template>
    <div class="page">
        <h1>首页(前端1)</h1>

        <!--轮播图-->
        <template class="carousel" @mouseenter="stopPlay" @mouseleave="autoPlay">
            <!--图片列表，通过transform动态平移切换-->
            <div class="carousel-list" :style="{transform:'translateX(-${currentIndex * itemWidth}px)'}">
                <div class="carousel-item" v-for="(item, index) in carouselList" :key="index" @click="turnTodetailById(index)">
                    <img :src="item.imgurl" alt="">
                </div>
            </div>
            <!--左右切换箭头-->
            <button class="carousel-pre-btn" @click="pre"><-</button>
            <button class="carousel-next-btn" @click="next">-></button>

            <!--小圆点-->
            <div class="">
                <span class="" 
                @click="switchTo(index)" 
                v-for="item, index in carouselList" :key="index" 
                :class="{active: currentIndex === index}">
                </span>
            </div>
        </template>

        <!--搜索栏-->
        <input type="text" v-model="inputKeyword" @keyup.enter="handleSearch">
        <button class="" @click="handleSearch">搜索</button>
    </div>
</template>


<script setup>
    import {ref, onMounted, onUnmounted} from 'vue'
    import { useRouter } from 'vue-router'
    import { allSpots } from '../assets/data'

    const router = useRouter()

    const currentIndex = ref(0)
    const timer = ref(null) //定时器
    const itemWidth = 800//后期根据美化更改

    const carouselList = ref([])
    for (const item in allSpots){
        imgurl = item.img
        carouselList.value.join(imgurl)
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
        router.push({path:'/detail', query:{id: index}})
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