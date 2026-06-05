<template>
  <!-- Ipapakita lang ito kapag ang state ay START_SCREEN -->
  <div v-if="store.currentGameState === 'START_SCREEN'" class="start-screen-container">
    <div class="title-box">
      <h1>POKÉMON CLONE</h1>
      <p class="blink-text">Press ENTER to Start</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();

const handleKeys = (e) => {
  // Tatakbo lang ito kung nasa Title Screen tayo
  if (store.currentGameState !== 'START_SCREEN') return;

  if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
    // 1. Palitan ang Pinia State papuntang 'EXPLORING'
    store.startGame();
    
    // 2. Hanapin ang Phaser game instance at ilipat ang Scene papuntang Overworld
    const phaserGame = window.phaserGame; // (Kailangan nating i-set ito sa wrapper mamaya)
    if (phaserGame) {
      // Pinapatay muna ang MainMenuScene (kung meron) at bubuksan ang mapa
      const currentScene = phaserGame.scene.getScenes(true)[0];
      if (currentScene) {
        currentScene.scene.start('OverworldScene');
      }
    }
  }
};

onMounted(() => window.addEventListener('keydown', handleKeys));
onUnmounted(() => window.removeEventListener('keydown', handleKeys));
</script>

<style scoped>
.start-screen-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1d7a5b; /* Emerald Green */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
}

.title-box {
  text-align: center;
  color: white;
  font-family: 'Courier New', Courier, monospace;
}

h1 {
  font-size: 48px;
  text-shadow: 4px 4px 0px #000;
  margin-bottom: 20px;
}

.blink-text {
  font-size: 24px;
  color: #ffcc00;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>