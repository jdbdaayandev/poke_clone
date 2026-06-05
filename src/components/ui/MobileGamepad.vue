<template>
  <div class="gamepad-container">
    
    <!-- D-PAD (Directional Buttons) -->
    <div class="d-pad">
      <div class="d-row">
        <button class="d-btn up" @pointerdown="pressDir('up')" @pointerup="releaseDir('up')" @pointerout="releaseDir('up')">▲</button>
      </div>
      <div class="d-row middle-row">
        <button class="d-btn left" @pointerdown="pressDir('left')" @pointerup="releaseDir('left')" @pointerout="releaseDir('left')">◀</button>
        <div class="d-center"></div>
        <button class="d-btn right" @pointerdown="pressDir('right')" @pointerup="releaseDir('right')" @pointerout="releaseDir('right')">▶</button>
      </div>
      <div class="d-row">
        <button class="d-btn down" @pointerdown="pressDir('down')" @pointerup="releaseDir('down')" @pointerout="releaseDir('down')">▼</button>
      </div>
    </div>

    <!-- ACTION BUTTONS (A, B, START) -->
    <div class="action-buttons">
      <div class="start-btn-container">
        <button class="start-btn" @pointerdown="triggerKey('Enter')">START</button>
      </div>
      <div class="ab-container">
        <button class="round-btn b-btn" @pointerdown="triggerKey('x')">B</button>
        <button class="round-btn a-btn" @pointerdown="triggerKey('z')">A</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();

// Para sa paglalakad (Sine-set sa Store para mabasa ng Player.js)
const pressDir = (dir) => store.setKey(dir, true);
const releaseDir = (dir) => store.setKey(dir, false);

// Para sa mga menu (Nagpapadala ng pekeng Keyboard Event para gumana ang mga Vue menus mo)
const triggerKey = (keyName) => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: keyName }));
};
</script>

<style scoped>
.gamepad-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  pointer-events: none; /* Para hindi ma-block ang gitna ng screen */
  z-index: 5000;
  user-select: none; /* Bawal i-highlight */
}

/* Lahat ng buttons ay dapat clickable */
button {
  pointer-events: auto; 
  touch-action: none; /* Para hindi mag-zoom o scroll ang screen sa phone */
}

/* --- D-PAD STYLES --- */
.d-pad {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.d-row { display: flex; }
.middle-row { margin: -5px 0; }
.d-btn {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid #333;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
.d-btn:active { background: rgba(200, 200, 200, 0.8); }
.d-center { width: 50px; height: 50px; background: rgba(255, 255, 255, 0.5); }

/* --- ACTION BUTTONS STYLES --- */
.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}
.ab-container {
  display: flex;
  gap: 15px;
  transform: rotate(-15deg); /* Medyo nakatagilid na parang Gameboy */
}
.round-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.6);
  color: white;
  font-weight: bold;
  font-size: 24px;
  border: 3px solid #660000;
}
.b-btn { background: rgba(255, 200, 0, 0.6); border-color: #997a00; margin-top: 20px; }
.round-btn:active { transform: scale(0.9); }

.start-btn {
  padding: 8px 20px;
  border-radius: 20px;
  background: rgba(100, 100, 100, 0.6);
  color: white;
  border: 2px solid #333;
  font-weight: bold;
}
.start-btn:active { background: rgba(50, 50, 50, 0.8); }
</style>