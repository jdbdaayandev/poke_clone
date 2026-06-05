// src/game/scenes/OverworldScene.js
import { Scene } from 'phaser';

export default class OverworldScene extends Scene {
  constructor() { super('OverworldScene'); }

  create() {
    const map = this.make.tilemap({ key: 'pallet_town' });
    const tileset = map.addTilesetImage('pokemon_exterior', 'pokemon_tiles'); 
    
    // TINGNAN NATIN KUNG SUCCESS ANG TILESET IMAGE
    console.log("Tileset Image Loaded:", tileset !== null);

    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const collisionLayer = map.createLayer('Collission', tileset, 0, 0); 
    const overheadLayer = map.createLayer('Overhead', tileset, 0, 0);

    groundLayer?.setScale(2);
    collisionLayer?.setScale(2);
    overheadLayer?.setScale(2);

    this.add.text(20, 20, 'Success: Map Loaded!', { fill: '#00ff00', backgroundColor: '#000000' });
  }
}