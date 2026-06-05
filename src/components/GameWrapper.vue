<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Phaser from 'phaser';
import BootScene from '../game/scenes/BootScene';
import OverworldScene from '../game/scenes/OverworldScene';

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
    
    // 1. IDAGDAG ITO PARA MATIGIL ANG AUDIO CONTEXT ERROR
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
    scene: [BootScene, OverworldScene]
  };
  
  game = new Phaser.Game(config);
});

onUnmounted(() => {
  if (game) game.destroy(true);
});
</script>

<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>