<template>
    <!--搜索结果-->
    <router-link :to="{path:'/'}">返回首页</router-link>
    <div v-if="resList.length === 0" class="">
        未找到“{{currentKeyword}}”相关内容
    </div>
    <div v-else class="">
        <div class="res-item" v-for="item in resList" :key="item.id" @click="turnTodetail(item.id)">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
        </div>
    </div>

    <!--搜索栏-->
    <input type="text" v-model="inputKeyword" @keyup.enter="handleReSearch" placeholder="">
    <button @click="handleReSearch">搜索</button>
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
        if (!newKeyword.value.trim()){
            alert("请输入关键词")
            return
        }
        router.push({path:'/searchres', query:{keyword: newKeyword.value.trim()}})
    }

    const turnTodetail = (index) => {
        router.push({path:'/detail', query:{id: index}})
    }
</script>