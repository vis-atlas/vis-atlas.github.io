<template>
  <div class="call-for-contributions">
    Our collection is growing! Share your atlas cases by <a href="mailto:vis-atlas@outlook.com">emailing us.</a>
  </div>
  <el-container class="container">
    <el-aside class="filter-container">
      <div class="side-title-wrapper">
        <p class="side-title">Total displayed: {{ filteredItems.length }}</p>
      </div>

      <div v-for="dimension in dimensions" :key="dimension.dimension" class="dimension-group">
        <p class="side-title">{{ capitalizeFirstLetter(dimension.dimension) }}</p>
        <el-button
          size="small"
          class="custom-button"
          :class="{ 'custom-button-selected': selectedFilters[dimension.dimension].includes(item) }"
          plain
          v-for="item in dimension.items"
          :key="item"
          @click="toggleFilter(dimension.dimension, item)"
          :type="selectedFilters[dimension.dimension]. includes(item) ? 'primary' : 'default'"
          style="margin: 0 5px 5px 0;"
        >
          {{ item }}
        </el-button>
      </div>
    </el-aside>
    
    <el-main class="wall-container">
      <masonry-wall :items="filteredItems" :ssr-columns="1" :column-width="250" :gap="16">
        <template #default="{ item }">
          <a :href="item.link" target="_blank" style="text-decoration: none; color: inherit;">
            <el-card :body-style="{ padding: '5px' }" shadow="hover" class="card-contaier">      
            <img :src="'/img/' + item.image" class="card-image" alt="card image">
            <div class="card-content">
              <h3 class="atlas-title">{{ item.title }}</h3>
              <div class="button-badge-wrapper">
                <el-button type="primary" size="small" text bg>{{ item.Genre }}</el-button>
                <template v-if="filteredItems.indexOf(item) < 2">
                  <el-button type="success" round size="small" style="margin-left: 0;">New!</el-button>
                </template>
              </div>
            </div>
            
            </el-card>
        </a>
        </template>
      </masonry-wall>
    </el-main>
  </el-container>
</template>


<script setup>
// import Hero from "@/components/Hero.vue"
import { ref, onMounted, computed } from 'vue';
import Papa from 'papaparse';

const items = ref([]);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const selectedFilters = ref({
  Genre: [],
  Data: [],
  'Entry page': [],
  'Content page': [],
  'Atlas structure': [],
  'Vis interaction': [],
  'Vis type': [],
  'Atlas navigation': [],
  'Onboarding':[],
  'Transparency': []
});

// const selectedFilters = ref({
//   genre: [],
//   data: [],
//   'entry page': [],
//   'content page': [],
//   'atlas structure': [],
//   'vis interaction': [],
//   'atlas navigation': [],
//   'onboarding':[],
//   'transparency': []
// });

const dimensions = ref([]);

function parseCSV(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    trimHeaders: true,
  });

  console.log("parse", result.data);
  return result.data;
}

onMounted(async () => {
  try {
    const responseCollection = await fetch('/data.csv');
    const csvText = await responseCollection.text();
    items.value = parseCSV(csvText);
    console.log(items.value)

    const response = await fetch('/dimensions.json');
    const data = await response.json();
    dimensions.value = data;

    for (const dimension of data) {
      selectedFilters.value[dimension.dimension] = [];
    }
  } catch (error) {
    console.error("Failed to load CSV data:", error);
  }
});

function toggleFilter(dimension, item) {
  const index = selectedFilters.value[dimension].indexOf(item);
  if (index === -1) {
    selectedFilters.value[dimension].push(item);
  } else {
    selectedFilters.value[dimension].splice(index, 1);
  }
}

const filteredItems = computed(() => {
  const uniqueItems = new Set();
  items.value.forEach(item => {
    const matchesAllDimensions = Object.entries(selectedFilters.value).every(([dimension, selectedItems]) => {
      if (selectedItems.length === 0) return true;
      const itemValue = item[dimension] || '';
      const itemValues = itemValue.split(',').map(value => value.trim());
      return selectedItems.some(selectedItem => itemValues.includes(selectedItem));
    });
    if (matchesAllDimensions) {
      uniqueItems.add(JSON.stringify(item));
    }
  });

  return Array.from(uniqueItems)
    .map(item => JSON.parse(item))
    .sort((a, b) => b.id - a.id);
});
// });
</script>

<style scoped>
.call-for-contributions {
  background-color: #f9f9f9;
  padding: 10px;
  text-align: center;
  font-size: 1.2em;
  margin: 10px 0;
  /* border-bottom: #7caef9 1px solid; */
}

a {
  color: #2626ec;
  text-decoration: none;
}

.container {
  margin:2% 2%;
}

.filter-container {
  background-color: white;
}

.wall-container {
  padding-top: 0;
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
  object-fit: cover;
}

.card-content {
  padding: 10px;
}

.atlas-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.side-title {
  font-size: 1.2em;
  font-weight: bold;
  color: black;
}

.side-title-wrapper {
  border-bottom: 1px solid #ccc; 
  padding: 10px; 
}

.dimension-group {
  /* margin-bottom: 20px;  */
  border-bottom: 1px solid #ccc; 
  padding: 10px; 
}

.button-badge-wrapper {
  display: flex;
  align-items: center;
  gap: 8px; 
}

/* .custom-button:hover {
  color: #7126EC !important; 
  border-color: #7126EC !important; 
}

.custom-button-selected {
  color: #7126EC !important; 
  border-color: #7126EC !important; 
} */
</style>