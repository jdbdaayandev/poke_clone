<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Phaser from 'phaser';

// 1. I-import ang mga scenes na ginawa natin
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
    pixelArt: true, // Importante ito para malinaw ang Pokemon sprites
    
    // 2. DITO ANG PAGBABAGO: Imbes na yung function na nagpi-print 
    // ng green text, ilalagay na natin dito ang Array ng scenes mo.
    // Ang unang nasa listahan (BootScene) ang unang mag-ra-run.
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