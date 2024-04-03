<template>
    <div class="sticky-nav">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item index="0">
                <h2 class="nav-title">Visualization Atlas</h2>
            </el-menu-item>

            <div class="flex-grow" />
            <el-menu-item index="/">Home</el-menu-item>
            <el-menu-item index="/collection">Collection</el-menu-item>
            <el-menu-item index="/design-space">Design Space</el-menu-item>
   
        </el-menu>
      </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const activeIndex = ref(route.path);
  
  watch(() => route.path, (newPath) => {
    activeIndex.value = newPath;
  });
  
  function handleSelect(index) {
    router.push(index);
  }
  </script>
  
  <style scoped>
  .sticky-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  /* .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
  .flex-grow {
    flex-grow: 1;
  }
  
  .nav-title {
    /* If you want to keep the title styling, otherwise remove this */
    font-weight: bold;
  }
  
  /* Remove custom color styling to revert to default Element Plus styles */
  </style>
  