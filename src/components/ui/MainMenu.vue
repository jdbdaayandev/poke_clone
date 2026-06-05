<!-- src/components/ui/MainMenu.vue -->
<template>
  <div class="main-menu-container">
    <div class="menu-box">
      <div class="button-group">
        <button 
          v-for="(option, index) in options" 
          :key="index" 
          :class="['menu-btn', { active: selectedIndex === index }]"
          @mouseover="selectedIndex = index"
          @click="clickOption(index)"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();
const options = ['NEW GAME', 'LOAD GAME', 'OPTION'];
const selectedIndex = ref(0);

const handleKeys = (e) => {
  if (store.currentGameState !== 'MAIN_MENU') return;
  if (e.key === 'ArrowUp') {
    selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : options.length - 1;
  } else if (e.key === 'ArrowDown') {
    selectedIndex.value = selectedIndex.value < options.length - 1 ? selectedIndex.value + 1 : 0;
  } else if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
    console.log("⌨️ Keyboard Enter/Z pressed on index:", selectedIndex.value);
    executeSelection();
  }
};

const clickOption = (index) => {
  // LOG 1: Tingnan kung gumagana ang Touch/Click physical response
  console.log("🎯 DETECTED: May nag-click/nag-touch sa button:", options[index]);
  selectedIndex.value = index;
  executeSelection();
};

const executeSelection = () => {
  const choice = options[selectedIndex.value];
  console.log("🚀 EXECUTING: Pinapagana ang option:", choice);
  
  if (choice === 'NEW GAME') {
    // LOG 2: Tingnan kung magbabago ang screen papuntang Loading
    console.log("🟡 STEP 1: Tinatawag ang store.startLoading()...");
    store.startLoading(); 
    
    setTimeout(() => {
      // LOG 3: Tingnan kung matatapos ang 3 seconds loading
      console.log("🟢 STEP 2: Tapos na ang 3 seconds delay. Tinatawag ang store.startGame()...");
      store.startGame(); 
      
      // LOG 4: I-tsek kung kilala ba ng Vue si Phaser
      if (window.phaserGame) {
        console.log("🔵 STEP 3: Nahanap si window.phaserGame! Inililipat ang scene sa Overworld...");
        window.phaserGame.scene.start('OverworldScene');
      } else {
        console.error("❌ ERROR: Hindi nahanap si window.phaserGame sa window object!");
      }
    }, 3000);
  } else {
    alert("Pinili mo ang: " + choice);
  }
};

onMounted(() => window.addEventListener('keydown', handleKeys));
onUnmounted(() => window.removeEventListener('keydown', handleKeys));
</script>

<style scoped>
.main-menu-container {
  position: absolute; 
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: #1d7a5b; 
  display: flex; justify-content: center; align-items: center; 
  z-index: 2900;
  pointer-events: auto !important; /* Pinupuwersang maging clickable ang buong area */
}

.menu-box {
  background: #2c4356; 
  border: 4px solid #ffffff; border-radius: 12px;
  padding: 25px; min-width: 260px; box-shadow: 6px 6px 0px #000;
  user-select: none;
  pointer-events: auto !important;
}

.button-group {
  display: flex; flex-direction: column; gap: 12px;
  pointer-events: auto !important;
}

.menu-btn {
  background-color: #3e5f7a; color: white;
  font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: bold;
  padding: 12px 20px; border: 2px solid #ffffff; border-radius: 8px;
  cursor: pointer; text-align: center;
  box-shadow: 2px 2px 0px #000;
  pointer-events: auto !important; /* Siguradong tatanggap ng click ang bawat button */
}

.menu-btn:hover, .menu-btn.active {
  background-color: #ffcc00; color: #000000; border-color: #000000;
  transform: translateY(-2px); box-shadow: 4px 4px 0px #000;
}
</style>