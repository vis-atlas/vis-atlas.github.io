

<template>
  <!-- <Hero /> -->
  <div class="container">
  <masonry-wall :items="items" :ssr-columns="1" :column-width="350" :gap="16">
  <template #default="{ item }">
    <a :href="item.link" style="text-decoration: none; color: inherit;">
    <el-card :body-style="{ padding: '5px' }" shadow="hover" class="card-contaier">
      <img :src="item.image" class="card-image" alt="card image">
      <div class="card-content">
        <h3>{{ item.title }}</h3>
        <!-- <p>{{ item.description }}</p> -->
        <el-button type="primary" size="small" text bg>{{ item.genre }}</el-button>
      </div>
    </el-card>
  </a>
  </template>
</masonry-wall>
</div>
</template>


<script setup>
// import Hero from "@/components/Hero.vue"

import { ref, onMounted } from 'vue';

const items = ref([]);

function parseCSV(text) {
  const lines = text.split('\n');
  const result = [];
  const headers = lines[0].split(',').map(header => header.trim());

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j].trim();
    }

    result.push(obj);
  }

  return result;
}

onMounted(async () => {
  try {
    const response = await fetch('/collection.csv');
    const csvText = await response.text();
    items.value = parseCSV(csvText);
  } catch (error) {
    console.error("Failed to load CSV data:", error);
  }
});

</script>

<style scoped>
.container {
  margin:3% 10%;
}

.masonry-item {
  margin-bottom: 30px;
}

.card-container {
  width: 350px;
  margin-bottom: 16px;
}

.card-image {
  width: 100%;
  height: auto;
  /* max-height: 200px; */
  object-fit: cover;
}

.card-content {
  padding: 10px;
}

</style>