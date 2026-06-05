<template>
  <div v-if="store.currentGameState === 'START_SCREEN'" class="start-screen-container" @pointerdown="handleInput">
    <div class="title-box">
      <div class="logo-wrapper">
        <!-- POKÉMON VUE SCREEN -->
        <h1 class="pokemon-logo">POKÉMON</h1>
        <h2 class="version-logo">VUE VERSION</h2>
      </div>
      <p class="blink-text">TOUCH SCREEN OR PRESS ANY KEY</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();

const handleInput = () => {
  if (store.currentGameState !== 'START_SCREEN') return;
  store.goToMainMenu(); 
};

onMounted(() => window.addEventListener('keydown', handleInput));
onUnmounted(() => window.removeEventListener('keydown', handleInput));
</script>

<style scoped>
.start-screen-container {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #1d7a5b, #0d4d36, #228b22);
  background-size: 400% 400%;
  animation: gradientBG 8s ease infinite;
  display: flex; justify-content: center; align-items: center; z-index: 3000;
  cursor: pointer;
}
.title-box { text-align: center; font-family: 'Courier New', Courier, monospace; user-select: none; }
.logo-wrapper { animation: floatLogo 3s ease-in-out infinite; margin-bottom: 50px; }
.pokemon-logo {
  font-size: 58px; color: #ffcc00; font-weight: 900; letter-spacing: 2px;
  stroke: #365fa9; -webkit-text-stroke: 4px #365fa9; text-shadow: 4px 4px 0px #000; margin: 0;
}
.version-logo { font-size: 26px; color: #00ffcc; font-style: italic; margin-top: -5px; text-shadow: 2px 2px 0px #000; font-weight: bold; }
.blink-text { font-size: 18px; color: #ffffff; font-weight: bold; animation: retroBlink 0.8s steps(2, start) infinite; text-shadow: 1px 1px 2px #000; }
@keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes floatLogo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes retroBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
</style>