// src/game/entities/Player.js
import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, collisionLayer) {
    super(scene, x, y, 'hero');

    scene.add.existing(this);
    
    this.collisionLayer = collisionLayer;
    this.setDepth(2); 
    this.setScale(2);
    this.setOrigin(0.5, 0.8);

    this.cursors = scene.input.keyboard.createCursorKeys();
    
    this.tileSize = 32;
    this.isMoving = false;
    this.moveSpeed = 250;

    // --- BAGONG VARIABLES PARA SA TURN DELAY ---
    this.currentDirection = 'down'; // Default na nakaharap pababa
    this.moveDelayTimer = 0;        // Timer para sa delay bago maglakad
    this.turnDelay = 100;           // 100 milliseconds delay bago gumalaw (adjust mo kung kailangan)

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
    // Kung naglalakad pa, i-ignore ang inputs
    if (this.isMoving) return;

    let intendedDirection = null;
    let targetX = this.x;
    let targetY = this.y;

    // Kunin kung aling key ang pinindot at i-set ang target grid
    if (this.cursors.left.isDown) { 
      intendedDirection = 'left'; 
      targetX -= this.tileSize; 
    } 
    else if (this.cursors.right.isDown) { 
      intendedDirection = 'right'; 
      targetX += this.tileSize; 
    } 
    else if (this.cursors.up.isDown) { 
      intendedDirection = 'up'; 
      targetY -= this.tileSize; 
    } 
    else if (this.cursors.down.isDown) { 
      intendedDirection = 'down'; 
      targetY += this.tileSize; 
    }

    // Kapag may pinindot na arrow key
    if (intendedDirection) {
      // Kapag iba yung pinindot mo sa kasalukuyang direksyon (Turning phase)
      if (this.currentDirection !== intendedDirection) {
        this.currentDirection = intendedDirection;
        this.faceDirection(this.currentDirection); // Haharap lang, walang lakad
        
        // I-set ang timer bago siya payagan maglakad
        this.moveDelayTimer = this.scene.time.now + this.turnDelay;
      } 
      // Kapag nakaharap na siya sa tamang direksyon (Walking phase)
      else {
        // I-check kung tapos na yung delay
        if (this.scene.time.now >= this.moveDelayTimer) {
          this.play(`walk-${this.currentDirection}`, true);
          this.tryMoveTo(targetX, targetY);
        }
      }
    } else {
      // Kapag binitiwan ang controls
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

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: this.moveSpeed,
      onComplete: () => {
        this.isMoving = false;
        
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && 
            !this.cursors.up.isDown && !this.cursors.down.isDown) {
             this.stopAndIdle();
        }
      }
    });
  }

  // --- BAGONG HELPER METHOD: Para i-set ang tamang idle frame ---
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