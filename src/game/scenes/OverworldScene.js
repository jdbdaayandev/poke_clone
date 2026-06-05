// src/game/scenes/OverworldScene.js
import { Scene } from 'phaser';
import Player from '../entities/Player'; 

export default class OverworldScene extends Scene {
  constructor() { super('OverworldScene'); }

  create() {
    const map = this.make.tilemap({ key: 'pallet_town' });
    const tileset = map.addTilesetImage('pokemon_exterior', 'pokemon_tiles'); 

    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const collisionLayer = map.createLayer('Collission', tileset, 0, 0); 
    const overheadLayer = map.createLayer('Overhead', tileset, 0, 0);

    groundLayer?.setScale(2).setDepth(0);
    collisionLayer?.setScale(2).setDepth(1);
    overheadLayer?.setScale(2).setDepth(3);

    // TANGGALIN NA ITO: collisionLayer.setCollisionByExclusion([-1]);

    // IPASA ANG collisionLayer SA PLAYER MO!
    // Ang mga parameter ngayon: scene, x, y, collisionLayer
    this.player = new Player(this, 144, 144, collisionLayer); // Pinalitan ko ng 144 para naka-snap sa grid
    
    // TANGGALIN NA ITO: this.physics.add.collider(this.player, collisionLayer);

    this.cameras.main.startFollow(this.player, true);
  }

  update() {
    this.player.update();
  }
}