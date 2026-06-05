// src/game/scenes/MainMenuScene.js
import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    // Ito ang key na gagamitin natin para tawagin ang scene na ito
    super('MainMenuScene'); 
  }

  create() {
    // 1. Maglagay ng background color (Halimbawa: Dark Blue/Gray)
    this.cameras.main.setBackgroundColor('#2d3436');

    // Makuha ang gitna ng screen
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // 2. Ilagay ang Title ng Laro mo
    this.add.text(centerX, centerY - 50, 'MY POKÉMON CLONE', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'Arial'
    }).setOrigin(0.5); // I-center ang text

    // 3. Ilagay ang "Start" instructions
    const startText = this.add.text(centerX, centerY + 50, 'Press ENTER or Click to Start', {
      fontSize: '18px',
      color: '#ffcc00',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // 4. Lagyan ng "Blinking" effect yung start text para astig
    this.tweens.add({
      targets: startText,
      alpha: 0, // Magiging invisible
      duration: 800, // Bilis ng pag-blink
      yoyo: true, // Babalik sa pagiging visible
      repeat: -1 // Infinite loop
    });

    // 5. Logic para mag-start ang laro
    // Kapag kinlick ang mouse:
    this.input.on('pointerdown', () => {
      this.startGame();
    });

    // Kapag pinindot ang ENTER key:
    this.input.keyboard.once('keydown-ENTER', () => {
      this.startGame();
    });
  }

  startGame() {
    // Lilipat na tayo sa mapa mo!
    // Kung iba ang pangalan ng overworld scene key mo, palitan mo ito:
    this.scene.start('OverworldScene'); 
  }
}