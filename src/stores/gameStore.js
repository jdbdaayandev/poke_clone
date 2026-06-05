// src/stores/gameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    // Ang mga posibleng state: 'EXPLORING', 'BATTLING', 'DIALOG', 'MENU'
    currentGameState: 'EXPLORING', 
  }),
  actions: {
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