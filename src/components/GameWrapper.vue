<!-- src/components/GameWrapper.vue -->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Phaser from 'phaser';
import BootScene from '../game/scenes/BootScene';
import OverworldScene from '../game/scenes/OverworldScene';

import { useGameStore } from '../stores/gameStore';

// MGA UI MENUS
import IntroScreen from './ui/IntroScreen.vue';     
import StartScreen from './ui/StartScreen.vue'; 
import MainMenu from './ui/MainMenu.vue';       
import LoadingScreen from './ui/LoadingScreen.vue'; 
import PartyMenu from './ui/PartyMenu.vue';
import MobileGamepad from './ui/MobileGamepad.vue'; 

const gameContainer = ref(null);
let game = null;
const store = useGameStore();

onMounted(() => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: gameContainer.value,
    backgroundColor: '#000000',
    pixelArt: true, 
    audio: { noAudio: true },
    physics: {
      default: 'arcade', 
      arcade: { gravity: { y: 0 }, debug: true }
    },
    scene: [BootScene, OverworldScene]
  };
  
  game = new Phaser.Game(config);
  window.phaserGame = game; 
});

onUnmounted(() => {
  if (game) game.destroy(true);
});
</script>

<template>
  <div class="app-wrapper">
    <!-- Phaser Game Canvas (Nasa Ilalim) -->
    <div ref="gameContainer" class="game-container"></div>

    <!-- UI LAYER (Nasa Ibabaw) -->
    <!-- Magdadagdag tayo ng 'in-game' class kapag ang state ay EXPLORING na -->
    <div :class="['ui-layer', { 'in-game': store.currentGameState === 'EXPLORING' }]">
      <IntroScreen v-if="store.currentGameState === 'INTRO'" />
      <StartScreen v-if="store.currentGameState === 'START_SCREEN'" />
      <MainMenu v-if="store.currentGameState === 'MAIN_MENU'" />
      <LoadingScreen v-if="store.currentGameState === 'LOADING'" />
      <PartyMenu v-if="store.currentGameState === 'MENU'" />
      <MobileGamepad v-if="store.currentGameState === 'EXPLORING'" />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  width: 800px; 
  height: 600px; 
  margin: 0 auto; 
}
.game-container {
  width: 100%;
  height: 100%;
}

/* --- ANG LUNAS SA APAT NA ANGLO --- */
.ui-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999 !important; /* Puwersahing lumutang sa pinaka-ibabaw ng Phaser */
  pointer-events: auto; /* BY DEFAULT: Clickable lahat ng menu! Hindi makaka-epal ang Phaser */
}

/* KAPAG NAGLALAKAD NA SA MAPA (EXPLORING): */
/* Dito lang natin gagawing 'none' ang background para makalusot ang galaw ng character sa Phaser */
.ui-layer.in-game {
  pointer-events: none !important;
}

/* Pero siguraduhing clickable pa rin ang mismong buttons ng Mobile D-pad kahit naka-lock ang laro */
.ui-layer > * {
  pointer-events: auto;
}
</style>