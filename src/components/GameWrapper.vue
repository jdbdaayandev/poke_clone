<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Phaser from 'phaser';
import BootScene from '../game/scenes/BootScene';
import MainMenuScene from '../game/scenes/MainMenuScene';
import OverworldScene from '../game/scenes/OverworldScene';

// 1. GINAMIT NATIN ANG StartScreen DAHIL ITO ANG NASA FOLDER MO
import StartScreen from './ui/StartScreen.vue'; 
import PartyMenu from './ui/PartyMenu.vue';
import MobileGamepad from './ui/MobileGamepad.vue';

const gameContainer = ref(null);
let game = null;

onMounted(() => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: gameContainer.value,
    backgroundColor: '#000000',
    pixelArt: true, 
    
    audio: {
      noAudio: true 
    },

    physics: {
      default: 'arcade', 
      arcade: {
        gravity: { y: 0 }, 
        debug: true 
      }
    },
    scene: [BootScene, MainMenuScene, OverworldScene]
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

    <div class="ui-layer">
      <!-- 2. TINAWAG NATIN ANG StartScreen at PartyMenu DITO -->
      <StartScreen />
      <PartyMenu />
      <MobileGamepad />
    </div>

  </div>
</template>

<style scoped>
/* Ang wrapper ay dapat relative para hindi lumagpas sa screen yung mga menus */
.app-wrapper {
  position: relative;
  width: 800px; 
  height: 600px; 
  margin: 0 auto; 
}

/* Walang babaguhin sa laro mismo */
.game-container {
  width: 100%;
  height: 100%;
}

/* 3. ITO ANG NAGPAPALUTANG SA UI SA IBABAW NG LARO */
.ui-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; 
  z-index: 10; 
}

/* Para ma-click at gumana yung mismong menu natin */
.ui-layer > * {
  pointer-events: auto;
}
</style>