// src/game/scenes/BootScene.js
import { Scene } from 'phaser';

export default class BootScene extends Scene {
  constructor() { 
    super('BootScene'); 
  }

  preload() {
    // TANGGALIN ang unang slash '/' sa path!
    this.load.image('pokemon_tiles', 'assets/tilesets/pokemon_exterior.png');
    
    // TANGGALIN ang unang slash '/' sa path!
    this.load.tilemapTiledJSON('pallet_town', 'assets/tilesets/pallet_town.json');
  }

  create() {
    this.scene.start('OverworldScene');
  }
}