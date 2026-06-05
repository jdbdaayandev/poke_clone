// src/game/entities/Player.js
import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, collisionLayer) {
    // Tawagin natin yung 'hero' na in-load natin sa BootScene
    super(scene, x, y, 'hero');

    // Idagdag ang sprite sa scene para lumabas sa screen
    scene.add.existing(this);
    
    // I-save ang reference ng collisionLayer para magamit sa tile checking
    this.collisionLayer = collisionLayer;
    
    // Z-index: Nasa ibabaw ng ground (0) at collision (1), pero nasa ilalim ng overhead (3)
    this.setDepth(2); 

    this.setScale(2);

    // I-setup ang keyboard controls
    this.cursors = scene.input.keyboard.createCursorKeys();
    
    // Movement configurations
    this.tileSize = 32;     // Sukat ng bawat tile/grid
    this.isMoving = false;  // Flag para maiwasan ang double-input habang naglalakad
    this.moveSpeed = 250;   // Bilis ng paglipat sa kabilang tile (in milliseconds)

    // --- ANIMATIONS ---
    scene.anims.create({
      key: 'walk-down',
      frames: scene.anims.generateFrameNumbers('hero', { start: 0, end: 3 }), // Row 1
      frameRate: 8, // Bilis ng padyak
      repeat: -1
    });
    scene.anims.create({
      key: 'walk-up',
      frames: scene.anims.generateFrameNumbers('hero', { start: 4, end: 7 }), // Row 2
      frameRate: 8,
      repeat: -1
    });
    scene.anims.create({
      key: 'walk-left',
      frames: scene.anims.generateFrameNumbers('hero', { start: 12, end: 15 }), // Row 3
      frameRate: 8,
      repeat: -1
    });
    scene.anims.create({
      key: 'walk-right',
      frames: scene.anims.generateFrameNumbers('hero', { start: 8, end: 11 }), // Row 4
      frameRate: 8,
      repeat: -1
    });

    this.stopAndIdle();
  }

  update() {
    // Kung naglalakad pa siya sa kabilang grid, wag muna tumanggap ng bagong arrow key input
    if (this.isMoving) return;

    if (this.cursors.left.isDown) {
      this.play('walk-left', true); // Ang 'true' ay para hindi mag-restart ang animation kung nagpe-play na
      this.tryMoveTo(this.x - this.tileSize, this.y);
    } 
    else if (this.cursors.right.isDown) {
      this.play('walk-right', true);
      this.tryMoveTo(this.x + this.tileSize, this.y);
    } 
    else if (this.cursors.up.isDown) {
      this.play('walk-up', true);
      this.tryMoveTo(this.x, this.y - this.tileSize);
    } 
    else if (this.cursors.down.isDown) {
      this.play('walk-down', true);
      this.tryMoveTo(this.x, this.y + this.tileSize);
    } 
    else {
      // Kung walang pinipindot na arrow keys, i-stop ang animation para hindi siya naglalakad sa pwesto
      this.stopAndIdle();
    }
  }

  // Titingnan muna kung pwedeng pumunta bago mag-start ang animation
  tryMoveTo(targetX, targetY) {
    if (!this.collisionLayer || this.canMoveTo(targetX, targetY)) {
        this.moveTo(targetX, targetY);
    } else {
        // Kung solid ang tile (pader/bahay), titigil din ang animation
        this.anims.stop();
    }
  }

  // Tinitingnan kung may naka-drawing sa collision layer o kung lalagpas sa mapa
  canMoveTo(targetX, targetY) {
    const tile = this.collisionLayer.getTileAtWorldXY(targetX, targetY, true);
    
    // Null = labas na ng map, false = bawal dumaan
    if (tile === null) return false; 
    
    // Index -1 = blangkong tile (safe dumaan)
    if (tile.index === -1) return true; 
    
    // Any other index = may pader/bahay
    return false;
  }

  // Gagamit ng Tween para magmukhang naglalakad (snap-to-grid) imbes na nagta-teleport
  moveTo(targetX, targetY) {
    this.isMoving = true;

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: this.moveSpeed,
      onComplete: () => {
        // I-unlock ang controls kapag nakatapak na sa susunod na tile
        this.isMoving = false;
        
        // I-check kung binitiwan na ang keyboard para itigil ang padyak
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && 
            !this.cursors.up.isDown && !this.cursors.down.isDown) {
             this.anims.stop();
        }
      }
    });
  }

  stopAndIdle() {
    this.anims.stop(); // Tigilin ang animation
    
    // I-check kung aling animation ang huling nag-play, at ibalik sa "standing" frame
    if (this.anims.currentAnim) {
      if (this.anims.currentAnim.key === 'walk-down') this.setFrame(0);
      else if (this.anims.currentAnim.key === 'walk-up') this.setFrame(4);
      else if (this.anims.currentAnim.key === 'walk-left') this.setFrame(12);
      else if (this.anims.currentAnim.key === 'walk-right') this.setFrame(8);
    }
  }
}