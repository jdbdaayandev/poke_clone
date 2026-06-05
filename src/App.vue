<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from './stores/gameStore';

import GameWrapper from './components/GameWrapper.vue';
import BattleMenu from './components/ui/BattleMenu.vue';
import DialogBox from './components/ui/DialogBox.vue';
import MainMenu from './components/ui/MainMenu.vue';
import StartScreen from './components/ui/StartScreen.vue';
// 1. I-IMPORT ANG MOBILE GAMEPAD
import MobileGamepad from './components/ui/MobileGamepad.vue'; 

const gameStore = useGameStore();
const { currentGameState } = storeToRefs(gameStore);
</script>

<template>
  <main class="app-container">
    
    <div class="emulator-layout">
      
      <div class="game-frame">
        
        <GameWrapper />

        <div class="ui-overlay" :class="{ 'pointer-events-none': currentGameState === 'EXPLORING' }">
          <StartScreen v-if="currentGameState === 'START_SCREEN'" />
          <BattleMenu v-if="currentGameState === 'BATTLING'" />
          <DialogBox v-if="currentGameState === 'DIALOG'" />
          <MainMenu v-if="currentGameState === 'MENU'" />
        </div>

      </div>

      <MobileGamepad />

    </div>

  </main>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000; 
  overflow: hidden;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* EMULATOR LAYOUT:
  Sa PC, gitna lang ang focus.
*/
.emulator-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

/* Eksaktong sukat ng game container sa PC. 
*/
.game-frame {
  position: relative;
  width: 800px;  
  height: 600px; 
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 4 / 3; 
  overflow: hidden;
  background-color: transparent;
}

.ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10; 
  display: flex;
  flex-direction: column;
}

.pointer-events-none {
  pointer-events: none; 
}

/* =========================================
   MOBILE MEDIA QUERY (EMULATOR SPLIT)
   ========================================= */
@media (max-width: 768px) {
  .app-container {
    /* I-push pataas ang buong layout imbes na naka-center */
    align-items: flex-start; 
  }
  
  .emulator-layout {
    /* Punuin ang buong screen ng mobile */
    width: 100vw;
    height: 100vh;
    justify-content: flex-start; 
  }

  .game-frame {
    /* Sa mobile, kukunin ng game frame ang itaas na 60% ng screen */
    width: 100vw;
    height: 60vh;
    max-height: 60vh; /* I-override ang desktop settings */
    aspect-ratio: auto; /* Tanggalin ang fixed aspect ratio para sumakto sa 60vh div */
  }
}
</style>