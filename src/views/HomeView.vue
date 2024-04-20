<template>
  <div class="card-container">
    <div class="grid">
      
        <el-card shadow="always" class="home-card left-card">
          <div slot="header" class="clearfix">
            <span class="card-title">About</span>
          </div>
          <div>
            <p v-html="formattedMessage"></p>
          </div>
        </el-card>

        <el-card shadow="always" class="home-card right-card">
          <div slot="header" class="clearfix">
            <span class="card-title">Working Definition</span>
          </div>
          <div>
            <p v-html="formattedDefinition"></p>
          </div>
        </el-card>

        <el-card shadow="always" class="home-card right-card">
          <div slot="header" class="clearfix">
            <span class="card-title">Design Space</span>
          </div>
          <div>
            <masonry-wall :items="items" :ssr-columns="1" :column-width="150" :gap="10">
              <template #default="{ item }">
                <el-card :body-style="{ padding: '5px' }" shadow="never" class="dimension-card">
                  <div slot="header" class="dimension-title" :style="{backgroundColor: item.color}">
                    <span>{{ item.dimension }}</span>
                  </div>
                  <div class="item-list">
                    <ul class="dimension-items">
                      <li v-for="(text, index) in item.items" :key="index">{{ text }}</li>
                    </ul>
                  </div>
                </el-card>
              </template>
            </masonry-wall>
          </div>
        </el-card>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const message = ref("We are currently witnessing an increase in web-based, data-driven initiatives that explain complex, contemporary issues through data and visualizations: climate change, sustainability, AI, or cultural discoveries. Many of these projects call themselves atlases, a term that historically referred to collections of maps or scientific illustrations. To answer the question of what makes a visualization atlas, we conducted a systematic analysis of 38 visualization atlases and semi-structured interviews with eight visualization atlas creators. Based on our results, we contribute (1) a <strong>definition</strong> of visualization atlases as an emerging format to present complex topics in a holistic, data-driven, and curated way through visualization, (2) a set of <strong>design patterns</strong> and design dimensions that led to (3) defining 5 visualization atlas <strong>genres</strong>, and (4) <strong>insights into the atlas creation</strong> from interviews. We found that visualization atlases are unique in that they combine exploratory visualization with narrative elements from data-driven storytelling and structured navigation mechanisms. They can act as a reference, communication or discovery tools targeting a wide range of audiences with different levels of domain knowledge.");

const formattedMessage = computed(() => {
  return message.value.replace(/definition/g, '<strong>definition</strong>').replace(/design patterns/g, '<strong>design patterns</strong>').replace(/genres/g, '<strong>genres</strong>').replace(/insights into the atlas creation/g, '<strong>insights into the atlas creation</strong>');
});

const definition = ref("A <strong>Visualization Atlas</strong> is a highly-curated collection of visualizations and explanations, aimed at promoting data-driven approaches to provide information about complex topics, usually with a global relevance.")

// Create a computed property to format the definition
const formattedDefinition = computed(() => {
  return definition.value.replace(/Visualization Atlas/g, '<strong>Visualization Atlas</strong>');
});

const items = ref([
  {
    dimension: 'Entry page',
    items: ['Featured', 'Random data', 'Metadata', 'table of content', 'personalization', 'lenses', 'Interactive vis', 'Vis screenshot', 'Cover vis/teaser'],
    color: '#B6D7A8'
  },
  {
    dimension: 'Content page',
    items: ['Report', 'Article', 'Dashboard', 'Exploratory vis', 'Chart collection', 'Table', 'Combination'],
    color: '#9FC5E8'
  },
  {
    dimension: 'Atlas structure',
    items: ['Parallel', 'Hierarchical', 'Multifacets', 'No structure'],
    color: '#FFE599'
  },
  {
    dimension: 'Vis interaction',
    items: ['Create focus', 'Customize data', 'Switch views', 'Coordinated views', 'Configure Layout'],
    color: '#B4A7D6'
  },
  {
    dimension: 'Atlas navigation',
    items: ['Search', 'Visual identity', 'Structural overview', 'Page links'],
    color: '#F9CB9C'
  },
  {
    dimension: 'Onboarding',
    items: ['Walkthrough', 'Glossary', 'Video', 'Textual user guide'],
    color: '#D5A6BD'
  },
  {
    dimension: 'Transparency',
    items: ['Data sourced', 'Export data/vis', 'Open source', 'Quality Evaluation', 'Methodology'],
    color: '#A2C4C9'
  }
]);

</script>


<style scoped>
.card-container {
  margin: 5% 5%;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 30px; 
}

.left-card {
  grid-row: span 2; /* Makes the left card span two rows */
}

.right-card {
  grid-row: span 1; /* Makes the right cards span one row */
}

.card-title {
  font-size: 20px;
  color: rgb(64, 158, 255);
  font-weight: bold;
}

.dimension-card {
  padding: 0;
}

.dimension-items {
  list-style-type: none;
  padding: 0;
  line-height: 1.1;
  font-size: 12px;
}

.dimension-title {
  margin: 0;
  padding: 0;
}

.item-list {
  padding-top: 5px;
}

.equal-height-columns {
  display: flex;
  flex-wrap: wrap;
}

::v-deep p strong {
  font-weight: bold !important;
}
</style>