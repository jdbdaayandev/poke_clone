// src/stores/gameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    isMenuOpen: false,
    // Dinagdag natin ang 'START_SCREEN' sa mga posibleng state
    // At ginawa natin itong default na state kapag nag-load ang page
    currentGameState: 'START_SCREEN', 

    // BAGONG STATE PARA SA MOBILE CONTROLS
    keys: {
      up: false,
      down: false,
      left: false,
      right: false
    }
  }),
  actions: {
    // Bagong action para mag-umpisa ang laro
    startGame() {
      this.currentGameState = 'EXPLORING';
    },
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
    // PANG-UPDATE NG MOBILE BUTTONS
    setKey(keyName, isPressed) {
      this.keys[keyName] = isPressed;
    }
  }
});