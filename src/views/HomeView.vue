<template>
  <div class="card-container">
    <div class="grid">
      
        <el-card shadow="always" class="home-card left-card">
          <div slot="header" class="clearfix">
            <span class="card-title">About</span>
          </div>
          <div>
            <!-- <p v-html="formattedMessage"></p> -->
            <p>Visualization atlases are an emerging form of web-based visualization that explains complex, contemporary issues like climate change, sustainability, AI, or cultural discoveries. Visualization atlases are unique in the way they combine exploratory visualization, narrative elements from data-driven storytelling, and structured navigation mechanics. They target a wide range of audiences with different levels of domain knowledge, acting as tools for study, communication, and discovery.
            </p>
            <br>
            <p>
              This website is an extension for our paper <span style="font-weight: 600;">Visualization Atlases: Explaining and Exploring Complex Topics through Data, Visualization, and Narration</span>, where we conducted a systematic analysis of 33 visualization atlases and semi-structured interviews with eight visualization atlas creators to understand this emerging genre and inform their design.
            </p>
          </div>

          <br />
          <div slot="header" class="clearfix">
            <span class="card-title">Publication</span>
          </div>
          <div>
            <p>Wang, J., Shu X., Bach B., Hinrichs U., (2024). Visualization Atlases: Explaining and Exploring Complex Topics through Data, Visualization, and Narration. <span style="font-style: italic;">Transactions on Visualization and Computer Graphics.</span>, 31(1)437 - 447, 2024. doi: 10.1109/TVCG.2024.3456311</p>
            <br>
            The paper is available on <a href="https://arxiv.org/abs/2408.07483" target="_blank">arXiv</a>.
          </div>
        </el-card>

        <el-card shadow="always" class="home-card right-card">
          <div slot="header" class="clearfix">
            <span class="card-title">What is a Visualization Atlas?</span>
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

const message = ref("Visualization atlases are an emerging form of web-based visualization that explains complex, contemporary issues like climate change, sustainability, AI, or cultural discoveries. Visualization atlases are unique in the way they combine exploratory visualization, narrative elements from data-driven storytelling, and structured navigation mechanics. They target a wide range of audiences with different levels of domain knowledge, acting as tools for study, communication, and discovery.");

const formattedMessage = computed(() => {
  return message.value.replace(/definition/g, '<strong>definition</strong>').replace(/design patterns/g, '<strong>design patterns</strong>').replace(/genres/g, '<strong>genres</strong>').replace(/insights into the atlas creation/g, '<strong>insights into the atlas creation</strong>');
});

const definition = ref("A <strong>Visualization Atlas</strong> is a compendium of (web) pages aimed at explaining and supporting exploration of data about a dedicated topic through data, visualizations and narration.")

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
    dimension: 'Vis type',
    items: ['Basic charts', 'Maps', 'Networks', 'Trees', 'Projection', 'Glyphys', 'Others'],
    color: '#A8D7BE'
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