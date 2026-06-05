// src/stores/gameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    isMenuOpen: false,
    
    // Default state pagka-load ng laro
    // Flow ng laro: START_SCREEN -> MAIN_MENU -> LOADING -> EXPLORING
    currentGameState: 'INTRO',

    // Mobile D-Pad configuration
    keys: {
      up: false,
      down: false,
      left: false,
      right: false
    }
  }),
  actions: {
    goToStartScreen() {
      this.currentGameState = 'START_SCREEN';
    },
    // 1. Lilipat mula Start Screen papuntang Classic Selection (New Game, Load Game)
    goToMainMenu() {
      this.currentGameState = 'MAIN_MENU';
    },

    // 2. Lilipat mula Main Menu papuntang Loading Screen na may Pikachu
    startLoading() {
      this.currentGameState = 'LOADING';
    },

    // 3. Tapos na ang loading, pasok na sa overworld map
    startGame() {
      this.currentGameState = 'EXPLORING';
    },

    // --- MGA EXISTING ACTIONS MO ---
    startBattle() {
      this.currentGameState = 'BATTLING';
    },
    endBattle() {
      this.currentGameState = 'EXPLORING';
    },
    openMenu() {
      this.currentGameState = 'MENU';
    },
    closeMenu() {
      this.currentGameState = 'EXPLORING';
    },

    // Pang-update ng controls mula sa MobileGamepad.vue
    setKey(keyName, isPressed) {
      this.keys[keyName] = isPressed;
    },
    openDialog(text) {
      this.dialogText = text;
      this.currentGameState = 'DIALOG'; // I-freeze ang laro, ipapakita ang Vue Dialog
    },
    closeDialog() {
      this.dialogText = '';
      this.currentGameState = 'EXPLORING'; // Balik sa paglalakad
    }
  }
});