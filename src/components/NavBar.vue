<template>
    <div class="nav-container">
    <div class="sticky-nav">
      <nav class="navbar">
        <div class="nav-links">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link to="/collection" class="nav-item">Collection</router-link>
          <!-- <router-link to="/design-space" class="nav-item">Design Space</router-link> -->
        </div>
      </nav>
    </div>
    <!-- Hero section with dynamic class -->
    <div :class="{'hero-full': $route.path === '/', 'hero-small': $route.path !== '/'}" class="hero-container">
      <h1 class="hero-title">Visualization Atlas</h1>
    </div>
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
    width: 100%;
    background-color: transparent;
    z-index: 1000;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: right;
    padding: 0 20px;
  }
  
  .nav-container {
    position: relative;
    background-color: #ccc;
    background-size: cover;
    background: url('/hero.png') no-repeat center center;
    animation: scrollBackground 200s linear infinite;
  }

  @keyframes scrollBackground {
    from {
        background-position: 5% center;
    }
    to {
        background-position: 100% center;
    }
  }

  .nav-container::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
  }

  .nav-container > * {
      position: relative;
      z-index: 2;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .nav-title {
    font-weight: bold;
  }

  .nav-links {
    display: flex;
  }

  .nav-item {
      padding: 5px 15px;
      color: #fff;
      font-weight: 500;
      text-decoration: none;
  }

  .nav-item.router-link-active {
      border-bottom: 6px solid #7126EC;
  }

  .hero-full, .hero-small {
    position: relative;
    width: 100%;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-full {
      height: 25vh;
  }

  .hero-small {
      height: 100px; 
  }

  .hero-title {
    font-weight: bold;
    font-size: 2rem;
    color: white;
  }

  </style>
