<template>
  <div class="page">
    <h1>景点列表(前端1)</h1>
  </div>
  <div class="list">
    <div class="item" v-for="item in allSpots" :key="item.id" @click="turnTodetail(item.id)">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <img :src="item.img" :alt="item.name">
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { allSpots } from '../assets/data';

  const router = useRouter()

  const turnTodetail = (index) => {
    router.push({path:'/detail', query:{id: index}})
  }
</script>