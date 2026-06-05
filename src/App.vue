<!-- src/App.vue -->
<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from './stores/gameStore';

// Import ng iyong mga Components
import GameWrapper from './components/GameWrapper.vue';
import BattleMenu from './components/ui/BattleMenu.vue';
import DialogBox from './components/ui/DialogBox.vue';
import MainMenu from './components/ui/MainMenu.vue';
import StartScreen from './components/ui/StartScreen.vue';

// Kunin ang global state mula sa Pinia
const gameStore = useGameStore();

// Ginagamit natin ang storeToRefs para manatiling reactive ang state sa template
const { currentGameState } = storeToRefs(gameStore);
</script>

<template>
  <main class="app-container">
    
    <!-- 1. THE GAME ENGINE -->
    <!-- Dito tatakbo ang Phaser 3 canvas. Palagi itong naka-render sa background. -->
    <GameWrapper />

    <!-- 2. THE UI LAYER -->
    <!-- Dito pumapasok ang Vue. Magpapakita lang ng UI depende sa Pinia state -->
    <div class="ui-overlay" :class="{ 'pointer-events-none': currentGameState === 'EXPLORING' }">

      <StartScreen v-if="currentGameState === 'START_SCREEN'" />
      
      <!-- Magpapakita lang kapag may wild encounter -->
      <BattleMenu v-if="currentGameState === 'BATTLING'" />
      
      <!-- Magpapakita kapag kumakausap ng NPC o may binabasang sign -->
      <DialogBox v-if="currentGameState === 'DIALOG'" />
      
      <!-- Magpapakita kapag pinindot ang Start/Esc button (Pokedex, Pokemon, Bag, Save) -->
      <MainMenu v-if="currentGameState === 'MENU'" />

    </div>
  </main>
</template>

<style>
/* CSS Reset para sakop buong screen */
body, html {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000; /* Black borders kung hindi sakop buong screen */
  overflow: hidden;
}

.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 
  Napaka-importante ng klase na ito! 
  Sinisiguro nito na ang UI ng Vue ay laging nasa ibabaw ng Phaser Canvas.
*/
.ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10; /* Laging nasa ibabaw ng canvas */
  display: flex;
  flex-direction: column;
}

/* 
  Kung naglalakad lang ang player ('EXPLORING'), hindi dapat harangin 
  ng invisible UI container ang mouse clicks papunta sa Phaser.
*/
.pointer-events-none {
  pointer-events: none; 
}
</style>