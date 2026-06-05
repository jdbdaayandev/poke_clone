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
    parent: gameContainer.value,
    backgroundColor: '#000000',
    pixelArt: true, 
    audio: { noAudio: true },
    
    // ==========================================
    // BAGONG SCALE CONFIG: Dito ginagawa ang magic!
    // ==========================================
    scale: {
      mode: Phaser.Scale.FIT, // I-fi-fit ang canvas sa loob ng wrapper nang hindi nasisira ang hugis
      autoCenter: Phaser.Scale.CENTER_BOTH, // Laging gitna
      width: 800, // Base internal resolution (Width)
      height: 600 // Base internal resolution (Height)
    },
    
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
    <div ref="gameContainer" class="game-container"></div>

    <div :class="['ui-layer', { 'in-game': store.currentGameState === 'EXPLORING' }]">
      <IntroScreen v-if="store.currentGameState === 'INTRO'" />
      <StartScreen v-if="store.currentGameState === 'START_SCREEN'" />
      <MainMenu v-if="store.currentGameState === 'MAIN_MENU'" />
      <LoadingScreen v-if="store.currentGameState === 'LOADING'" />
      <PartyMenu v-if="store.currentGameState === 'MENU'" />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  /* BINAGO: Imbes na 800px at 600px, susunod na ito sa sukat ng parent div (yung nasa App.vue) */
  width: 100%; 
  height: 100%; 
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
  z-index: 99999 !important; 
  pointer-events: auto; 
}

/* KAPAG NAGLALAKAD NA SA MAPA (EXPLORING): */
.ui-layer.in-game {
  pointer-events: none !important;
}

.ui-layer > * {
  pointer-events: auto;
}
</style>