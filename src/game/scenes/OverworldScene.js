// src/game/scenes/OverworldScene.js
import { Scene } from 'phaser';
import Player from '../entities/Player';
import interactables from '../data/interactions.json';
import { useGameStore } from '../../stores/gameStore'; 

export default class OverworldScene extends Scene {
  constructor() { 
    super('OverworldScene'); 
  }

  create() {
    // 1. MAPA AT TILESET SETUP
    const map = this.make.tilemap({ key: 'pallet_town' });
    const tileset = map.addTilesetImage('pokemon_exterior', 'pokemon_tiles'); 

    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const collisionLayer = map.createLayer('Collission', tileset, 0, 0); 
    const overheadLayer = map.createLayer('Overhead', tileset, 0, 0);

    groundLayer?.setScale(2).setDepth(0);
    collisionLayer.setScale(2).setDepth(1).setVisible(false);
    overheadLayer?.setScale(2).setDepth(3);

    this.player = new Player(this, 144, 144, collisionLayer); 

    // ==========================================
    // 2. CAMERA SETUP
    // ==========================================
    const mapWidth = map.widthInPixels * 2;
    const mapHeight = map.heightInPixels * 2;

    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.player, true);

    // ==========================================
    // 3. IN-GAME "START" MENU SETUP
    // ==========================================
    this.isMenuOpen = false;
    this.menuSelection = 0;
    this.menuOptions = ['POKéDEX', 'POKéMON', 'BAG', 'PROFILE', 'SAVE', 'OPTION', 'EXIT'];
    
    this.setupInGameMenu();

    // ==========================================
    // 4. KEYBOARD CONTROLS (Updated for Interactions)
    // ==========================================
    
    // ENTER KEY: Magbubukas ng menu, o pipili kung bukas na
    this.input.keyboard.on('keydown-ENTER', () => {
      const store = useGameStore();
      if (store.currentGameState === 'DIALOG') return; // Bawal mag-menu pag may kausap

      if (!this.isMenuOpen) {
        this.toggleMenu(); 
      } else {
        this.executeMenuAction(); 
      }
    });

    // Z KEY: Action Button (A)
    this.input.keyboard.on('keydown-Z', () => {
      const store = useGameStore();
      if (store.currentGameState === 'DIALOG') return; // Hayaan ang Vue component magsara ng dialog

      if (this.isMenuOpen) {
        this.executeMenuAction(); // Kung naka-menu, i-select ang option
      } else {
        this.checkForInteraction(); // Kung naglalakad, i-check kung may karatula/NPC sa harap
      }
    });

    // X KEY: Cancel Button (B)
    this.input.keyboard.on('keydown-X', () => {
      if (this.isMenuOpen) {
        this.toggleMenu();
      }
    });

    // UP KEY
    this.input.keyboard.on('keydown-UP', () => {
      if (this.isMenuOpen) {
        this.menuSelection--;
        if (this.menuSelection < 0) this.menuSelection = this.menuOptions.length - 1;
        this.updateMenuCursor();
      }
    });

    // DOWN KEY
    this.input.keyboard.on('keydown-DOWN', () => {
      if (this.isMenuOpen) {
        this.menuSelection++;
        if (this.menuSelection > this.menuOptions.length - 1) this.menuSelection = 0;
        this.updateMenuCursor();
      }
    });
  }

  update() {
    const store = useGameStore();

    // I-lock ang player kapag nakabukas ang menu O may binabasang dialog
    if (this.isMenuOpen || store.currentGameState === 'DIALOG') return; 

    if (this.player) {
      this.player.update();
    }
  }

  // ==========================================
  // BAGONG METHOD: INTERACTION LOGIC (JSON)
  // ==========================================
  checkForInteraction() {
    const store = useGameStore();

    // 1. Kunin ang kasalukuyang Tile ng player
    // Palitan ang '32' depende sa tileSize at scale mo. Kung naka-scale(2) ang 16px tile mo, 32 ito.
    //let targetTileX = Math.round(this.player.x / 32); 
    //let targetTileY = Math.round(this.player.y / 32);
    let targetTileX = Math.floor(this.player.x / 32); 
    let targetTileY = Math.floor(this.player.y / 32);

    // 2. Tumingin sa tile na nasa harap niya
    if (this.player.currentDirection === 'up') targetTileY -= 1;
    else if (this.player.currentDirection === 'down') targetTileY += 1;
    else if (this.player.currentDirection === 'left') targetTileX -= 1;
    else if (this.player.currentDirection === 'right') targetTileX += 1;

    // 3. Hanapin sa data ng interactions.json
    const foundItem = interactables.find(item => item.tileX === targetTileX && item.tileY === targetTileY);

    if (foundItem) {
      store.openDialog(foundItem.dialog); // Ipasa ang text sa Vue Pinia Store
      this.player.stopAndIdle(); 
    }
  }

  // ==========================================
  // MGA METHOD PARA SA MENU LOGIC
  // ==========================================
  setupInGameMenu() {
    this.menuContainer = this.add.container(20, 20);
    this.menuContainer.setScrollFactor(0); // Para laging nasa screen kahit gumalaw ang camera
    this.menuContainer.setDepth(100); 
    this.menuContainer.setVisible(false); 

    const bgGraphics = this.add.graphics();
    bgGraphics.fillStyle(0xffffff, 1); 
    bgGraphics.fillRoundedRect(0, 0, 140, 260, 8);
    bgGraphics.fillStyle(0x3e5f7a, 1); 
    bgGraphics.fillRoundedRect(4, 4, 132, 252, 4);
    
    this.menuContainer.add(bgGraphics);

    const textStyle = {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: '"Courier New", Courier, monospace',
      shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 0, fill: true }
    };

    this.menuTexts = [];
    
    this.menuOptions.forEach((option, index) => {
      let txt = this.add.text(35, 15 + (index * 32), option, textStyle);
      this.menuContainer.add(txt);
      this.menuTexts.push(txt);
    });

    this.menuCursor = this.add.text(10, 15, '▶', { ...textStyle, color: '#ffcc00' });
    this.menuContainer.add(this.menuCursor);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuContainer.setVisible(this.isMenuOpen);
    
    if (this.isMenuOpen) {
      this.menuSelection = 0; 
      this.updateMenuCursor();
      if (this.player) this.player.stopAndIdle();
    }
  }

  updateMenuCursor() {
    this.menuCursor.y = 15 + (this.menuSelection * 32);
  }

  executeMenuAction() {
    const selectedOption = this.menuOptions[this.menuSelection];
    console.log("Pinili mo ang:", selectedOption);

    if (selectedOption === 'EXIT') {
      this.toggleMenu(); 
    } 
    else if (selectedOption === 'SAVE') {
      console.log("Game Saved!"); 
    } 
    else if (selectedOption === 'POKéMON') {
      console.log("Opening Party Scene..."); 
    }
  }
}