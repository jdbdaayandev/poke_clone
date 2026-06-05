<!-- src/components/ui/DialogBox.vue -->
<template>
  <!-- @pointerdown para pwede ring i-tap sa screen para mag-next -->
  <div class="dialog-container" @pointerdown="closeBox">
    <div class="dialog-box">
      <p class="dialog-text">{{ store.dialogText }}</p>
      <span class="blink-arrow">▼</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();

const closeBox = () => {
  if (store.currentGameState === 'DIALOG') {
    store.closeDialog();
  }
};

const handleKey = (e) => {
  if (store.currentGameState !== 'DIALOG') return;
  // Isara ang dialog kapag pinindot ang Z, Enter, o Space
  if (e.key === 'z' || e.key === 'Z' || e.key === 'x' || e.key === 'X' || e.key === 'Enter') {
    closeBox();
  }
};

onMounted(() => window.addEventListener('keydown', handleKey));
onUnmounted(() => window.removeEventListener('keydown', handleKey));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.dialog-container {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Nakadikit sa baba */
  padding-bottom: 20px;
  z-index: 4000;
  pointer-events: auto !important;
}

.dialog-box {
  width: 90%;
  max-width: 600px;
  min-height: 100px;
  background-color: #f8f8f8;
  border: 4px solid #4a4a4a;
  border-radius: 8px;
  box-shadow: inset 0 0 0 4px #a0a0a0, 6px 6px 0px rgba(0,0,0,0.3);
  padding: 20px;
  position: relative;
}

.dialog-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  margin: 0;
  text-transform: uppercase;
}

/* Kukurap-kurap na arrow sa kanang ibaba */
.blink-arrow {
  position: absolute;
  bottom: 10px;
  right: 15px;
  color: #ff6600;
  font-size: 16px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; transform: translateY(0); }
  50% { opacity: 0; transform: translateY(2px); }
}
</style>