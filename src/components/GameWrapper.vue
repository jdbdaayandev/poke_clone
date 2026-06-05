<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Phaser from 'phaser';
import BootScene from '../game/scenes/BootScene';
import OverworldScene from '../game/scenes/OverworldScene';

// MGA UI MENUS IMPORT
import StartScreen from './ui/StartScreen.vue'; 
import MainMenu from './ui/MainMenu.vue';       // <-- IDAGDAG ITO
import LoadingScreen from './ui/LoadingScreen.vue'; // <-- IDAGDAG ITO
import PartyMenu from './ui/PartyMenu.vue';
import MobileGamepad from './ui/MobileGamepad.vue'; 
import IntroScreen from './ui/IntroScreen.vue';

const gameContainer = ref(null);
let game = null;

onMounted(() => {
  const config = {
    type: Phaser.AUTO, width: 800, height: 600,
    parent: gameContainer.value, backgroundColor: '#000000', pixelArt: true, 
    audio: { noAudio: true },
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: true } },
    scene: [BootScene, OverworldScene]
  };
  game = new Phaser.Game(config);
  window.phaserGame = game; 
});

onUnmounted(() => { if (game) game.destroy(true); });
</script>

<template>
  <div class="app-wrapper">
    <div ref="gameContainer" class="game-container"></div>

    <div class="ui-layer">
      <!-- LAHAT NG LAYERS AY NAKAHILERA DITO BASE SA STATE NILA -->
       <IntroScreen />
      <StartScreen />
      <MainMenu />
      <LoadingScreen />
      <PartyMenu />
      <MobileGamepad />
    </div>
  </div>
</template>

<style scoped>
/* (Keep the same CSS styles you already have in GameWrapper.vue) */
.app-wrapper { position: relative; width: 800px; height: 600px; margin: 0 auto; }
.game-container { width: 100%; height: 100%; }
.ui-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }
.ui-layer > * { pointer-events: auto; }
</style>