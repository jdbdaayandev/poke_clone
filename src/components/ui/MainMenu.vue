<template>
  <div class="main-menu-container">
    <div class="menu-box">
      <div class="button-group">
        <button 
          v-for="(option, index) in options" 
          :key="index" 
          :class="['menu-btn', { active: selectedIndex === index }]"
          @mouseover="hoverOption(index)"
          @click="clickOption(index)"
        >
          <span 
            class="cursor" 
            :class="{ 'cursor-active': selectedIndex === index }"
            :style="{ visibility: selectedIndex === index ? 'visible' : 'hidden' }"
          >
            ▶
          </span>
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

// --- WEB AUDIO API PARA SA MENU SOUNDS ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

// Tunog kapag lumilipat ng option (Blip)
const playBlip = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.type = 'square'; 
  osc.frequency.setValueAtTime(400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
};

// Tunog kapag pinindot ang 'Enter' o kinlick (High Ping)
const playSelect = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
};

// --- MENU LOGIC ---
const handleKeys = (e) => {
  if (store.currentGameState !== 'MAIN_MENU') return;
  
  if (e.key === 'ArrowUp') {
    selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : options.length - 1;
    playBlip();
  } else if (e.key === 'ArrowDown') {
    selectedIndex.value = selectedIndex.value < options.length - 1 ? selectedIndex.value + 1 : 0;
    playBlip();
  } else if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
    executeSelection();
  }
};

const hoverOption = (index) => {
  if (selectedIndex.value !== index) {
    selectedIndex.value = index;
    playBlip(); // Tutunog din kapag dinaanan ng mouse
  }
};

const clickOption = (index) => {
  selectedIndex.value = index;
  executeSelection();
};

const executeSelection = () => {
  playSelect(); // Play select sound
  const choice = options[selectedIndex.value];
  
  if (choice === 'NEW GAME') {
    store.startLoading(); 
    
    setTimeout(() => {
      store.startGame(); 
      if (window.phaserGame) {
        window.phaserGame.scene.start('OverworldScene');
      }
    }, 3000);
  } else {
    // Pang-placeholder kung ano mangyayari sa iba
    alert("Pinili mo ang: " + choice);
  }
};

onMounted(() => window.addEventListener('keydown', handleKeys));
onUnmounted(() => window.removeEventListener('keydown', handleKeys));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.main-menu-container {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background-color: #1d7a5b; /* Seamless sa background ng StartScreen */
  display: flex; 
  justify-content: center; 
  align-items: center; 
  z-index: 2900;
  pointer-events: auto !important; 
}

/* Authentic GBA Text Box Styling (Emerald/FireRed style) */
.menu-box {
  background: #ffffff; 
  border: 4px solid #5a5a5a; /* Outer border */
  border-radius: 12px;
  padding: 30px 40px; 
  min-width: 320px; 
  /* Patong-patong na shadow para magkaroon ng inner outline at kapal */
  box-shadow: 
    inset 0 0 0 4px #d8d8d8, /* Inner light-gray border */
    inset 0 0 0 6px #ffffff, /* Gap */
    6px 6px 0px rgba(0,0,0,0.3); /* Drop shadow ng buong box */
  user-select: none;
  pointer-events: auto !important;
}

.button-group {
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  pointer-events: auto !important;
}

/* Text Buttons */
.menu-btn {
  background-color: transparent; 
  color: #666666; /* Grayed out kapag hindi active */
  font-family: 'Press Start 2P', monospace; 
  font-size: 18px; 
  border: none; 
  cursor: pointer; 
  text-align: left;
  display: flex;
  align-items: center;
  pointer-events: auto !important; 
  outline: none;
  transition: color 0.1s;
}

.menu-btn.active {
  color: #000000; /* Magiging pure black ang text kapag nakatutok ang cursor */
  text-shadow: 1px 1px 0px #cccccc; /* Subtle drop shadow sa active text */
}

/* Styling at Animation para sa Cursor */
.cursor {
  color: #ff3300; /* Classic Red-Orange cursor */
  margin-right: 15px;
  font-size: 18px;
  display: inline-block; /* Kailangan ito para gumana ang transform */
}

/* Gumagalaw na arrow effect */
.cursor-active {
  animation: pointerBounce 0.4s infinite alternate ease-in-out;
}

/* --- ANIMATIONS --- */
@keyframes pointerBounce {
  0% { transform: translateX(0); }
  100% { transform: translateX(6px); } /* Aatras at aabante */
}
</style>