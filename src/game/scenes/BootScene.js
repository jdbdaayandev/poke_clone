// src/game/scenes/BootScene.js
import { Scene } from 'phaser';

export default class BootScene extends Scene {
  constructor() { super('BootScene'); }

  preload() {
    const tilesetUrl = new URL('/assets/tilesets/pokemon_exterior.png', import.meta.url).href;
    const mapUrl = new URL('/assets/tilesets/pallet_town.json', import.meta.url).href;
    const playerUrl = new URL('/assets/sprites/player.png', import.meta.url).href;

    this.load.image('pokemon_tiles', tilesetUrl);
    this.load.tilemapTiledJSON('pallet_town', mapUrl);

    this.load.spritesheet('hero', playerUrl, {
      frameWidth: 32, 
      frameHeight: 32 
    });
  }

  create() {
    this.scene.start('OverworldScene');
  }
}