// src/stores/gameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    // Dinagdag natin ang 'START_SCREEN' sa mga posibleng state
    // At ginawa natin itong default na state kapag nag-load ang page
    currentGameState: 'START_SCREEN', 
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
    }
  }
});