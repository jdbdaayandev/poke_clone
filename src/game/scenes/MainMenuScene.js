// src/game/scenes/MainMenuScene.js
import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene'); 
  }

  create() {
    // 1. Pokémon Emerald Background Color (Dark Green/Teal)
    this.cameras.main.setBackgroundColor('#1d7a5b');

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // --- MAIN TITLE ---
    this.add.text(centerX, centerY - 100, 'POKÉMON CLONE', {
      fontSize: '40px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: '"Courier New", Courier, monospace',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 0, fill: true }
    }).setOrigin(0.5);


    // --- TIME UI BOX (TOP LEFT) ---
    const timeBoxX = 20;
    const timeBoxY = 20;
    const timeBoxWidth = 160;
    const timeBoxHeight = 60;

    const timeGraphics = this.add.graphics();
    // White Border
    timeGraphics.fillStyle(0xffffff, 1);
    timeGraphics.fillRoundedRect(timeBoxX, timeBoxY, timeBoxWidth, timeBoxHeight, 8);
    // Dark Inner Box
    timeGraphics.fillStyle(0x3e5f7a, 1); 
    timeGraphics.fillRoundedRect(timeBoxX + 4, timeBoxY + 4, timeBoxWidth - 8, timeBoxHeight - 8, 4);

    // Static Text "TIME"
    this.add.text(timeBoxX + 15, timeBoxY + 10, 'TIME:', {
      fontSize: '18px',
      color: '#a4c6e8', // Light blue text para sa label
      fontFamily: '"Courier New", Courier, monospace',
      shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 0, fill: true }
    });

    // Dynamic Text para sa Oras (I-uupdate natin ito sa update() method)
    this.timeDisplay = this.add.text(timeBoxX + 35, timeBoxY + 30, '00:00 AM', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: '"Courier New", Courier, monospace',
      shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 0, fill: true }
    });


    // --- MAIN MENU BOX (CENTER) ---
    const boxWidth = 220;
    const boxHeight = 120;
    const boxX = centerX - boxWidth / 2;
    const boxY = centerY - 20;

    const menuGraphics = this.add.graphics();
    // White Border
    menuGraphics.fillStyle(0xffffff, 1);
    menuGraphics.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 8);
    // Dark Inner Box
    menuGraphics.fillStyle(0x3e5f7a, 1); 
    menuGraphics.fillRoundedRect(boxX + 4, boxY + 4, boxWidth - 8, boxHeight - 8, 4);

    // --- SETUP MENU OPTIONS ---
    this.menuOptions = ['NEW GAME', 'LOAD GAME'];
    this.currentSelection = 0; 

    const menuTextStyle = {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: '"Courier New", Courier, monospace',
      shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 0, fill: true }
    };

    const startY = boxY + 25;
    const spacing = 45;

    this.menuOptions.forEach((option, index) => {
      this.add.text(boxX + 50, startY + (index * spacing), option, menuTextStyle);
    });

    // Cursor (▶)
    this.cursor = this.add.text(boxX + 20, startY, '▶', menuTextStyle);

    // --- KEYBOARD CONTROLS ---
    this.input.keyboard.on('keydown-UP', () => {
      this.currentSelection--;
      if (this.currentSelection < 0) this.currentSelection = this.menuOptions.length - 1;
      this.updateCursorPosition(startY, spacing);
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      this.currentSelection++;
      if (this.currentSelection > this.menuOptions.length - 1) this.currentSelection = 0;
      this.updateCursorPosition(startY, spacing);
    });

    this.input.keyboard.on('keydown-ENTER', () => this.selectMenuOption());
    this.input.keyboard.on('keydown-SPACE', () => this.selectMenuOption());
    this.input.keyboard.on('keydown-Z', () => this.selectMenuOption());
  }

  // Tumutakbo bawat frame (60 frames per second)
  update() {
    this.updateClock();
  }

  // --- BAGONG METHOD: Update Real-time Clock ---
  updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // I-convert ang 24-hour format sa 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Ang '0' ay magiging '12'
    
    // Maglagay ng '0' sa unahan ng minutes kung single digit (e.g., 09)
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    // I-set ang text sa screen
    this.timeDisplay.setText(`${hours}:${minutes} ${ampm}`);
  }

  updateCursorPosition(startY, spacing) {
    this.cursor.y = startY + (this.currentSelection * spacing);
  }

  selectMenuOption() {
    if (this.currentSelection === 0) {
      console.log('Starting a NEW GAME...');
      this.scene.start('OverworldScene', { loadSave: false }); 
    } 
    else if (this.currentSelection === 1) {
      console.log('LOADING GAME...');
      this.scene.start('OverworldScene', { loadSave: true });
    }
  }
}