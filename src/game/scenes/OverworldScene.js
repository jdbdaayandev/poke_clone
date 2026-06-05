// src/game/scenes/OverworldScene.js
import { Scene } from 'phaser';
import Player from '../entities/Player'; 

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
    // BAGONG CAMERA SETUP: I-lock sa dulo ng map
    // ==========================================
    
    // Kunin ang total size ng mapa (i-multiply sa 2 dahil nag-setScale(2) tayo)
    const mapWidth = map.widthInPixels * 2;
    const mapHeight = map.heightInPixels * 2;

    // I-set ang boundaries ng camera bago i-follow ang player
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

    // Set boundaries din para sa mismong laro para hindi makalabas ang player sa screen (optional pero maganda)
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // Ngayon, i-follow ang player
    this.cameras.main.startFollow(this.player, true);

    // ==========================================
    // 3. IN-GAME "START" MENU SETUP
    // ==========================================
    this.isMenuOpen = false;
    this.menuSelection = 0;
    this.menuOptions = ['POKéDEX', 'POKéMON', 'BAG', 'PROFILE', 'SAVE', 'OPTION', 'EXIT'];
    
    // I-draw ang UI box ng menu
    this.setupInGameMenu();

    // ==========================================
    // 4. MENU KEYBOARD CONTROLS
    // ==========================================
    // ENTER KEY: Bubuksan ang menu, o pipili ng option kung bukas na
    this.input.keyboard.on('keydown-ENTER', () => {
      if (!this.isMenuOpen) {
        this.toggleMenu(); // Buksan kung nakasara
      } else {
        this.executeMenuAction(); // Pumili ng option kung nakabukas na
      }
    });

    // Z KEY: Parehas lang sa ENTER (Action button)
    this.input.keyboard.on('keydown-Z', () => {
      if (this.isMenuOpen) {
        this.executeMenuAction();
      }
    });

    // X KEY: Para i-cancel o isara ang menu (B-button sa Gameboy)
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
    // I-lock ang player kapag nakabukas ang menu para hindi siya makalakad
    if (this.isMenuOpen) return; 

    // Kung nakasara ang menu, tsaka pa lang babasahin ang movement controls niya
    if (this.player) {
      this.player.update();
    }
  }

  // ==========================================
  // MGA METHOD PARA SA MENU LOGIC
  // ==========================================

  setupInGameMenu() {
    // 1. Siguraduhing nandito ang listahan ng options
    this.menuOptions = ['POKéDEX', 'POKéMON', 'BAG', 'PROFILE', 'SAVE', 'OPTION', 'EXIT'];

    // 2. Setup ng Container (20, 20 muna para makita sa gilid)
    this.menuContainer = this.add.container(20, 20);
    this.menuContainer.setScrollFactor(0); 
    this.menuContainer.setDepth(100); // Super taas na depth para sure na nasa ibabaw
    this.menuContainer.setVisible(false); 

    // 3. I-drawing ang Menu Box
    const bgGraphics = this.add.graphics();
    bgGraphics.fillStyle(0xffffff, 1); 
    bgGraphics.fillRoundedRect(0, 0, 140, 260, 8);
    bgGraphics.fillStyle(0x3e5f7a, 1); 
    bgGraphics.fillRoundedRect(4, 4, 132, 252, 4);
    
    // IMPORTANT: I-add agad ang box sa container bago ang text!
    this.menuContainer.add(bgGraphics);

    // 4. Text Style
    const textStyle = {
      fontSize: '18px',
      color: '#ffffff', // Puting text
      fontFamily: '"Courier New", Courier, monospace',
      shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 0, fill: true }
    };

    this.menuTexts = [];
    
    // 5. I-loop at i-add ang mga Menu Options
    this.menuOptions.forEach((option, index) => {
      // Mag-print sa console para makita kung gumagana ang loop
      console.log("Naglalagay ng menu option:", option); 

      let txt = this.add.text(35, 15 + (index * 32), option, textStyle);
      this.menuContainer.add(txt);
      this.menuTexts.push(txt);
    });

    // 6. I-add ang Cursor (▶)
    this.menuCursor = this.add.text(10, 15, '▶', { ...textStyle, color: '#ffcc00' });
    this.menuContainer.add(this.menuCursor);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuContainer.setVisible(this.isMenuOpen);
    
    if (this.isMenuOpen) {
      this.menuSelection = 0; // Reset sa unang option kapag binuksan
      this.updateMenuCursor();
      // I-stop ang movement at animation ng player
      if (this.player) this.player.stopAndIdle();
    }
  }

  updateMenuCursor() {
    // Ilipat ang cursor sa tapat ng current selection (32 ang spacing)
    this.menuCursor.y = 15 + (this.menuSelection * 32);
  }

  executeMenuAction() {
    const selectedOption = this.menuOptions[this.menuSelection];
    console.log("Pinili mo ang:", selectedOption);

    // Dito natin ikakabit ang mga susunod mong features
    if (selectedOption === 'EXIT') {
      this.toggleMenu(); // Isara ang menu
    } 
    else if (selectedOption === 'SAVE') {
      console.log("Game Saved!"); 
    } 
    else if (selectedOption === 'POKéMON') {
      console.log("Opening Party Scene..."); 
    }
  }
}