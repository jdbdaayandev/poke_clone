<!-- src/components/ui/LoadingScreen.vue -->
<template>
  <div v-if="store.currentGameState === 'LOADING'" class="loading-container">
    <div class="loading-content">
      <!-- Pikachu Running Sprite (Gagamit tayo ng CSS animation) -->
      <div class="pikachu-run"></div>
      <p class="loading-text">LOADING RESOURCES...</p>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/gameStore';
const store = useGameStore();
</script>

<style scoped>
.loading-container {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-color: #000000; display: flex; justify-content: center; align-items: center; z-index: 4000;
}
.loading-content { text-align: center; color: white; font-family: 'Courier New', Courier, monospace; }

/* --- PIKACHU SPRITE ANIMATION --- */
.pikachu-run {
  width: 64px; height: 64px; margin: 0 auto 20px auto;
  /* Gagamit tayo ng sikat na gif/sprite url para kay pikachu */
  background: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/anim/normal/25.gif') no-repeat center;
  background-size: contain;
  transform: scale(2); /* Palakihin si Pikachu */
}

.loading-text { font-size: 20px; color: #ffcc00; font-weight: bold; letter-spacing: 2px; }
</style>