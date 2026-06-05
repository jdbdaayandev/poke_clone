<template>
  <div v-if="store.currentGameState === 'START_SCREEN'" class="start-screen-container" @pointerdown="handleScreenTap">
    <div class="title-box">
      <div class="logo-wrapper">
        <h1 class="pokemon-logo">POKÉMON</h1>
        <div class="version-banner">
          <h2 class="version-logo">VUE VERSION</h2>
        </div>
      </div>
      <!-- Binago natin ang text para tama ang instruction sa player -->
      <p class="blink-text">▶ TAP SCREEN OR PRESS ENTER ◀</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();

// 1. Function para sa pag-Tap o Click sa screen
const handleScreenTap = () => {
  if (store.currentGameState !== 'START_SCREEN') return;
  store.goToMainMenu(); 
};

// 2. Function para sa Keyboard na naka-filter sa 'Enter' key lang
const handleKeyDown = (e) => {
  if (store.currentGameState !== 'START_SCREEN') return;
  
  // Titingnan kung ang pinindot na key ay 'Enter'
  if (e.key === 'Enter') {
    store.goToMainMenu();
  }
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Titan+One&display=swap');

.start-screen-container {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background-color: #1d7a5b; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  z-index: 3000;
  cursor: pointer;
  overflow: hidden;
}

.title-box { 
  text-align: center; 
  user-select: none; 
  z-index: 2;
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-wrapper { 
  animation: floatLogo 4s ease-in-out infinite; 
  margin-bottom: 30px; 
}

.pokemon-logo {
  font-family: 'Titan One', sans-serif;
  font-size: 50px;
  color: #ffcb05; 
  -webkit-text-stroke: 2px #3c5aa6; 
  text-shadow: 
    3px 3px 0px #2a4175,
    5px 5px 0px rgba(0, 0, 0, 0.6);
  margin: 0;
  letter-spacing: 2px;
  line-height: 1;
}

.version-banner {
  display: inline-block;
  background-color: #35495e; 
  padding: 6px 15px; 
  border: 2px solid #ffffff;
  border-radius: 15px;
  margin-top: -5px; 
  box-shadow: 3px 3px 0px rgba(0,0,0,0.5);
  transform: rotate(-3deg); 
}

.version-logo { 
  font-family: 'Press Start 2P', monospace;
  font-size: 12px; 
  color: #42b883; 
  margin: 0; 
  text-shadow: 1px 1px 0px #000; 
}

.blink-text { 
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  color: #ffffff; 
  text-shadow: 2px 2px 0px #000;
  animation: retroBlink 1s steps(2, start) infinite; 
  margin-top: 20px;
}

/* --- ANIMATIONS --- */

@keyframes floatLogo { 
  0%, 100% { transform: translateY(0); } 
  50% { transform: translateY(-8px); } 
}

@keyframes retroBlink { 
  0%, 100% { opacity: 1; } 
  50% { opacity: 0; } 
}
</style>