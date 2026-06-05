<!-- src/components/ui/MainMenu.vue -->
<template>
  <div v-if="store.currentGameState === 'MAIN_MENU'" class="main-menu-container">
    <!-- Pinwersa nating maging clickable ang mismong menu box -->
    <div class="menu-box">
      <ul>
        <!-- Ginamit natin ang @click para selyado sa PC mouse at Phone touch screen -->
        <li 
          v-for="(option, index) in options" 
          :key="index" 
          :class="{ active: selectedIndex === index }"
          @mouseover="selectedIndex = index"
          @click="clickOption(index)"
        >
          <span v-if="selectedIndex === index" class="cursor">▶</span>
          <span v-else class="spacer">&nbsp;&nbsp;</span>
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();
const options = ['NEW GAME', 'LOAD GAME', 'OPTION'];
const selectedIndex = ref(0);

// Keyboard controls para kung gusto gamitin ang keyboard ng PC
const handleKeys = (e) => {
  if (store.currentGameState !== 'MAIN_MENU') return;
  if (e.key === 'ArrowUp') {
    selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : options.length - 1;
  } else if (e.key === 'ArrowDown') {
    selectedIndex.value = selectedIndex.value < options.length - 1 ? selectedIndex.value + 1 : 0;
  } else if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
    executeSelection();
  }
};

// Touch Screen / Mouse Click trigger
const clickOption = (index) => {
  selectedIndex.value = index;
  executeSelection();
};

const executeSelection = () => {
  const choice = options[selectedIndex.value];
  
  if (choice === 'NEW GAME') {
    store.startLoading(); // Pasok sa Pikachu loading screen
    
    setTimeout(() => {
      store.startGame(); // Pasok sa mismong overworld map
      if (window.phaserGame) {
        const currentScene = window.phaserGame.scene.getScenes(true)[0];
        if (currentScene) currentScene.scene.start('OverworldScene');
      }
    }, 3000);
  } else {
    alert("Pinili mo ang: " + choice + " (Wala pa itong function sa ngayon)");
  }
};

onMounted(() => window.addEventListener('keydown', handleKeys));
onUnmounted(() => window.removeEventListener('keydown', handleKeys));
</script>

<style scoped>
.main-menu-container {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background-color: #1d7a5b; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  z-index: 2900;
  pointer-events: auto !important; /* Siguraduhing buhay ang clicks sa container */
}

.menu-box {
  background: #3e5f7a; 
  border: 4px solid #ffffff; 
  border-radius: 8px;
  padding: 20px 30px; 
  min-width: 220px; 
  box-shadow: 4px 4px 0px #000;
  user-select: none;
  pointer-events: auto !important; /* Puwersahing tanggapin ang click/touch ng mouse at daliri */
}

ul { 
  list-style: none; 
  padding: 0; 
  margin: 0; 
}

li { 
  color: white; 
  font-family: 'Courier New', Courier, monospace; 
  font-size: 24px; 
  padding: 8px 0; 
  font-weight: bold; 
  cursor: pointer; 
  transition: padding-left 0.1s ease;
  pointer-events: auto !important; /* Double-check para sa bawat item */
}

li:hover { 
  color: #ffcc00; 
  padding-left: 5px; 
}

.cursor { 
  color: #ffcc00; 
  margin-right: 10px; 
}

.spacer { 
  display: inline-block; 
  width: 24px; 
}

.active { 
  color: #ffcc00 !important; 
}
</style>