<template>
  <div v-if="store.currentGameState === 'INTRO'" class="intro-container" @pointerdown="skipIntro">
    <div class="intro-content">
      
      <div v-if="currentPhase === 2" class="flash-screen"></div>
      
      <div class="star-animation" :class="{ 'star-explode': currentPhase === 2 }">✦</div>

      <h2 v-if="currentPhase === 1" class="intro-text jdbd-text fade-in-out">
        JDBD GAMES PRESENTS
      </h2>

      <h2 v-if="currentPhase === 2" class="intro-text game-freak-text fade-in">
        GAME <span class="gf-star">★</span> FREAK
      </h2>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();
const currentPhase = ref(1); 

let phaseTimeout = null;
let endTimeout = null;

const skipIntro = () => {
  store.goToStartScreen();
};

const handleSkip = (e) => {
  skipIntro();
};

onMounted(() => {
  window.addEventListener('keydown', handleSkip);

  // TIMING CONTROL
  phaseTimeout = setTimeout(() => {
    if (store.currentGameState === 'INTRO') {
      currentPhase.value = 2;
    }
  }, 2200);

  endTimeout = setTimeout(() => {
    if (store.currentGameState === 'INTRO') {
      skipIntro();
    }
  }, 5000);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleSkip);
  clearTimeout(phaseTimeout);
  clearTimeout(endTimeout);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.intro-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Classic vignette radial gradient para mas cinematic */
  background: radial-gradient(circle at center, #ffffff 0%, #e6e6e6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  cursor: pointer;
  user-select: none;
  overflow: hidden; 
}

.intro-content {
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Base text styles */
.intro-text {
  font-family: 'Press Start 2P', monospace;
  position: relative;
  z-index: 10;
  margin: 0;
}

/* Phase 1 Text Styling */
.jdbd-text {
  font-size: 16px; 
  line-height: 1.8;
  color: #4a4a4a;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.1); /* Subtle shadow para hindi flat */
}

/* Phase 2 Classic Game Freak Styling */
.game-freak-text {
  font-size: 26px;
  color: #ff6b00; /* Mas vibrant na orange */
  -webkit-text-stroke: 1px #000; /* Itim na outline */
  text-shadow: 4px 4px 0px #000000; /* Makapal na GBA drop shadow */
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Ang bida sa gitna ng logo */
.gf-star {
  color: #ffcc00;
  font-size: 28px;
  display: inline-block;
  transform: translateY(-2px);
  text-shadow: 3px 3px 0px #000000;
}

/* --- MGA ANIMATIONS --- */

.fade-in-out {
  /* Mas smooth na pasok at labas */
  animation: fadeInOutAnim 2.2s ease-in-out forwards;
}

.fade-in {
  opacity: 0;
  /* Extra heavy bounce effect */
  animation: heavyDropAnim 0.7s cubic-bezier(0.25, 1.5, 0.5, 1) forwards;
}

/* GBA Star Asset (Comet effect) */
.star-animation {
  font-size: 30px;
  color: #ffffff;
  /* Patong-patong na shadow para magmukhang glowing energy */
  text-shadow: 
    0 0 10px #ffcc00, 
    0 0 20px #ffcc00, 
    0 0 30px #ff9900; 
  position: absolute;
  top: 30%;
  left: -10%;
  z-index: 5;
  animation: shootingStar 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.star-explode {
  /* Mabilis at matapang na pagsabog */
  animation: starExplode 0.4s ease-out forwards;
}

/* Screen flash effect */
.flash-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 15;
  /* Double flash para mas dramatic */
  animation: doubleFlashAnim 0.8s ease-out forwards;
  pointer-events: none;
}

/* --- KEYFRAMES --- */

@keyframes shootingStar {
  0% { top: 10%; left: -10%; transform: scale(0.3) rotate(0deg); opacity: 0; }
  15% { opacity: 1; }
  70% { top: 50%; left: 50%; transform: scale(1.5) rotate(270deg); opacity: 1; }
  100% { top: 50%; left: 50%; transform: scale(0); opacity: 0; }
}

@keyframes starExplode {
  0% { transform: scale(1.5); opacity: 1; filter: brightness(2); }
  50% { transform: scale(4); opacity: 0.5; }
  100% { transform: scale(0); opacity: 0; }
}

@keyframes doubleFlashAnim {
  0% { opacity: 0; }
  20% { opacity: 1; }
  40% { opacity: 0.5; }
  60% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes fadeInOutAnim {
  0% { opacity: 0; transform: scale(0.95); filter: blur(2px); }
  20% { opacity: 1; transform: scale(1); filter: blur(0px); }
  80% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.05); filter: blur(2px); }
}

@keyframes heavyDropAnim {
  0% { opacity: 0; transform: scale(2) translateY(-20px); filter: blur(4px); }
  50% { opacity: 1; transform: scale(0.9) translateY(5px); filter: blur(0px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
</style>