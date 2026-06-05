// src/game/entities/Player.js
import Phaser from 'phaser';
import { useGameStore } from '../../stores/gameStore';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, collisionLayer) {
    super(scene, x, y, 'hero');

    scene.add.existing(this);
    
    this.collisionLayer = collisionLayer;
    this.setDepth(2); 
    this.setScale(2);
    this.setOrigin(0.5, 0.8);

    // --- KEYBOARD INPUTS ---
    this.cursors = scene.input.keyboard.createCursorKeys(); // Arrow Keys
    
    // DAGDAG: WASD Keys support
    this.wasd = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    
    this.tileSize = 32;
    this.isMoving = false;
    this.moveSpeed = 250;

    // --- VARIABLES PARA SA TURN DELAY ---
    this.currentDirection = 'down'; // Default na nakaharap pababa
    this.moveDelayTimer = 0;        // Timer para sa delay bago maglakad
    this.turnDelay = 120;           // 100 milliseconds delay bago gumalaw (adjust mo kung kailangan)

    this.continuousWalk = false;

    // --- ANIMATIONS ---
    scene.anims.create({
      key: 'walk-down',
      frames: scene.anims.generateFrameNumbers('hero', { start: 0, end: 3 }), 
      frameRate: 8, 
      repeat: -1
    });
    scene.anims.create({
      key: 'walk-up',
      frames: scene.anims.generateFrameNumbers('hero', { start: 4, end: 7 }), 
      frameRate: 8,
      repeat: -1
    });
    scene.anims.create({
      key: 'walk-left',
      frames: scene.anims.generateFrameNumbers('hero', { start: 12, end: 15 }), 
      frameRate: 8,
      repeat: -1
    });
    scene.anims.create({
      key: 'walk-right',
      frames: scene.anims.generateFrameNumbers('hero', { start: 8, end: 11 }), 
      frameRate: 8,
      repeat: -1
    });

    this.faceDirection(this.currentDirection);
  }

  update() {
    if (this.isMoving) return;

    const store = useGameStore();

    let intendedDirection = null;
    let targetX = this.x;
    let targetY = this.y;

    if (this.cursors.left.isDown || this.wasd.left.isDown || store.keys.left) intendedDirection = 'left';
    else if (this.cursors.right.isDown || this.wasd.right.isDown || store.keys.right) intendedDirection = 'right';
    else if (this.cursors.up.isDown || this.wasd.up.isDown || store.keys.up) intendedDirection = 'up';
    else if (this.cursors.down.isDown || this.wasd.down.isDown || store.keys.down) intendedDirection = 'down';

    if (intendedDirection === 'left') targetX -= this.tileSize;
    else if (intendedDirection === 'right') targetX += this.tileSize;
    else if (intendedDirection === 'up') targetY -= this.tileSize;
    else if (intendedDirection === 'down') targetY += this.tileSize;

    if (intendedDirection) {
      if (this.currentDirection !== intendedDirection) {
        this.currentDirection = intendedDirection;
        this.faceDirection(this.currentDirection); 
        
        // KUNG HINDI PA NAGLALAKAD, LAGYAN NG DELAY (Para sa '1-click tap to turn')
        if (!this.continuousWalk) {
          this.moveDelayTimer = this.scene.time.now + this.turnDelay;
        }
      } 
      
      // KUNG TAPOS NA ANG DELAY, o TULOY-TULOY NA ANG LAKAD, GO!
      if (this.scene.time.now >= this.moveDelayTimer || this.continuousWalk) {
        this.continuousWalk = true; // Markahan na naglalakad na
        this.play(`walk-${this.currentDirection}`, true);
        this.tryMoveTo(targetX, targetY);
      }
    } else {
      // Kapag binitawan lahat ng keys, huminto at i-reset
      this.continuousWalk = false;
      this.stopAndIdle();
    }
  }

  tryMoveTo(targetX, targetY) {
    if (!this.collisionLayer || this.canMoveTo(targetX, targetY)) {
        this.moveTo(targetX, targetY);
    } else {
        this.anims.stop();
        this.faceDirection(this.currentDirection); // Make sure nakaharap pa rin kahit may pader
    }
  }

  canMoveTo(targetX, targetY) {
    const tile = this.collisionLayer.getTileAtWorldXY(targetX, targetY, true);
    if (tile === null) return false; 
    if (tile.index === -1) return true; 
    return false;
  }

  moveTo(targetX, targetY) {
    this.isMoving = true;
    const store = useGameStore(); 

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: this.moveSpeed,
      onComplete: () => {
        this.isMoving = false;
        
        const isLeftPressed = this.cursors.left.isDown || this.wasd.left.isDown || store.keys.left;
        const isRightPressed = this.cursors.right.isDown || this.wasd.right.isDown || store.keys.right;
        const isUpPressed = this.cursors.up.isDown || this.wasd.up.isDown || store.keys.up;
        const isDownPressed = this.cursors.down.isDown || this.wasd.down.isDown || store.keys.down;

        if (!isLeftPressed && !isRightPressed && !isUpPressed && !isDownPressed) {
             this.continuousWalk = false; // I-reset ang state
             this.stopAndIdle();
        }
      }
    });
  }

  faceDirection(direction) {
    this.anims.stop();
    if (direction === 'down') this.setFrame(0);
    else if (direction === 'up') this.setFrame(4);
    else if (direction === 'left') this.setFrame(12);
    else if (direction === 'right') this.setFrame(8);
  }

  stopAndIdle() {
    this.faceDirection(this.currentDirection);
  }
}