<template>
  <div v-if="store.currentGameState === 'EXPLORING' || store.currentGameState === 'DIALOG'" class="gamepad-container">
    
    <div class="d-pad">
      <div class="d-row">
        <button class="d-btn up" 
          @touchstart.prevent="pressDir('up')" @mousedown.prevent="pressDir('up')" 
          @touchend.prevent="releaseDir('up')" @touchcancel.prevent="releaseDir('up')" 
          @mouseup.prevent="releaseDir('up')" @mouseleave.prevent="releaseDir('up')">
        </button>
      </div>
      <div class="d-row middle-row">
        <button class="d-btn left" 
          @touchstart.prevent="pressDir('left')" @mousedown.prevent="pressDir('left')" 
          @touchend.prevent="releaseDir('left')" @touchcancel.prevent="releaseDir('left')" 
          @mouseup.prevent="releaseDir('left')" @mouseleave.prevent="releaseDir('left')">
        </button>
        <div class="d-center">
          <div class="d-center-circle"></div>
        </div>
        <button class="d-btn right" 
          @touchstart.prevent="pressDir('right')" @mousedown.prevent="pressDir('right')" 
          @touchend.prevent="releaseDir('right')" @touchcancel.prevent="releaseDir('right')" 
          @mouseup.prevent="releaseDir('right')" @mouseleave.prevent="releaseDir('right')">
        </button>
      </div>
      <div class="d-row">
        <button class="d-btn down" 
          @touchstart.prevent="pressDir('down')" @mousedown.prevent="pressDir('down')" 
          @touchend.prevent="releaseDir('down')" @touchcancel.prevent="releaseDir('down')" 
          @mouseup.prevent="releaseDir('down')" @mouseleave.prevent="releaseDir('down')">
        </button>
      </div>
    </div>

    <div class="action-buttons">
      <div class="start-btn-container">
        <button class="start-btn" 
          @touchstart.prevent="triggerKey('Enter')" 
          @mousedown.prevent="triggerKey('Enter')">START</button>
      </div>
      <div class="ab-container">
        <button class="round-btn b-btn" 
          @touchstart.prevent="triggerKey('x')" 
          @mousedown.prevent="triggerKey('x')">B</button>
        <button class="round-btn a-btn" 
          @touchstart.prevent="triggerKey('z')" 
          @mousedown.prevent="triggerKey('z')">A</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();

const pressDir = (dir) => store.setKey(dir, true);
const releaseDir = (dir) => store.setKey(dir, false);

const triggerKey = (keyName) => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: keyName }));
};
</script>

<style scoped>
/* DEFAULT: Nakatago sa PC */
.gamepad-container {
  display: none; 
  position: absolute; 
  bottom: 40px; 
  left: 0; 
  width: 100%; 
  justify-content: space-between; 
  align-items: flex-end;
  padding: 0 30px; 
  box-sizing: border-box; 
  pointer-events: none; 
  z-index: 5000; 
  
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

button { 
  pointer-events: auto; 
  touch-action: none; 
  outline: none; 
  border: none; 
  font-family: 'Verdana', sans-serif;
  cursor: pointer;
}

/* --- D-PAD STYLING --- */
.d-pad { display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0px 6px 4px rgba(0,0,0,0.4)); }
.d-row { display: flex; }
.middle-row { margin: 0; }
.d-btn { width: 55px; height: 55px; background: linear-gradient(135deg, rgba(60,60,60,0.85), rgba(30,30,30,0.85)); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; box-shadow: inset 0px 2px 2px rgba(255,255,255,0.2), inset 0px -2px 5px rgba(0,0,0,0.5); transition: background 0.05s ease; position: relative; }
.d-btn.up { border-radius: 12px 12px 0 0; }
.d-btn.down { border-radius: 0 0 12px 12px; }
.d-btn.left { border-radius: 12px 0 0 12px; }
.d-btn.right { border-radius: 0 12px 12px 0; }
.d-btn::after { content: ''; display: block; border-style: solid; }
.d-btn.up::after { border-width: 0 8px 12px 8px; border-color: transparent transparent rgba(255,255,255,0.6) transparent; margin-bottom: 5px; }
.d-btn.down::after { border-width: 12px 8px 0 8px; border-color: rgba(255,255,255,0.6) transparent transparent transparent; margin-top: 5px; }
.d-btn.left::after { border-width: 8px 12px 8px 0; border-color: transparent rgba(255,255,255,0.6) transparent transparent; margin-right: 5px; }
.d-btn.right::after { border-width: 8px 0 8px 12px; border-color: transparent transparent transparent rgba(255,255,255,0.6); margin-left: 5px; }
.d-btn:active { background: rgba(100, 100, 100, 0.95); }
.d-center { width: 55px; height: 55px; background: rgba(45,45,45,0.85); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; }
.d-center-circle { width: 16px; height: 16px; border-radius: 50%; background: rgba(0,0,0,0.3); box-shadow: inset 0px 2px 3px rgba(0,0,0,0.5), 0px 1px 1px rgba(255,255,255,0.1); }
.action-buttons { display: flex; flex-direction: column; align-items: flex-end; gap: 35px; }
.ab-container { display: flex; gap: 20px; transform: rotate(-15deg); margin-right: 15px; }
.round-btn { width: 65px; height: 65px; border-radius: 50%; color: #ffffff; font-weight: 900; font-size: 26px; text-shadow: 1px 2px 2px rgba(0,0,0,0.4); box-shadow: 0 6px 0px rgba(0,0,0,0.5), inset 0px 4px 6px rgba(255,255,255,0.4), inset 0px -4px 6px rgba(0,0,0,0.2); transition: transform 0.05s ease, box-shadow 0.05s ease; }
.b-btn { background: radial-gradient(circle at 30% 30%, #ff6b6b, #c0392b); margin-top: 25px; }
.a-btn { background: radial-gradient(circle at 30% 30%, #4facfe, #2980b9); }
.round-btn:active { transform: translateY(6px); box-shadow: 0 0px 0px rgba(0,0,0,0.5), inset 0px 2px 4px rgba(0,0,0,0.6); }
.start-btn-container { margin-right: 40px; }
.start-btn { padding: 10px 22px; border-radius: 20px; background: linear-gradient(180deg, #666, #333); color: #ccc; font-weight: bold; font-size: 13px; letter-spacing: 2px; box-shadow: 0 4px 0 rgba(0,0,0,0.6), inset 0px 2px 2px rgba(255,255,255,0.2); transition: transform 0.05s ease, box-shadow 0.05s ease, color 0.05s; }
.start-btn:active { transform: translateY(4px); box-shadow: 0 0px 0 rgba(0,0,0,0.6), inset 0px 2px 4px rgba(0,0,0,0.6); color: #fff; }

/* MEDIA QUERY: Ipapakita lang kapag ang screen ay maliit */
@media (max-width: 768px) {
  .gamepad-container {
    display: flex;
  }
}
</style>