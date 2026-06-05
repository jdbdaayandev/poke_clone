<!-- src/components/ui/StartScreen.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const gameStore = useGameStore();
const hasSaveFile = ref(false);

// Track natin kung anong part ng intro ang ipapakita
// Mga posibleng value: 'logo' -> 'title' -> 'menu'
const currentStep = ref('logo');

onMounted(() => {
  // Pagka-load ng page, ipapakita ang logo ng 2.5 seconds, 
  // tapos automatic na lilipat sa Title Screen
  setTimeout(() => {
    currentStep.value = 'title';
  }, 2500);
});

// Kapag kinlick ang screen habang nasa 'title', ilalabas ang menu
const screenClicked = () => {
  if (currentStep.value === 'title') {
    currentStep.value = 'menu';
  }
};

const startNewGame = () => {
  gameStore.startGame();
};

const continueGame = () => {
  gameStore.startGame(); 
};
</script>

<template>
  <!-- Nilagyan natin ng @click para ma-detect kung pinindot ng user ang screen -->
  <div class="start-screen-container" @click="screenClicked">

    <!-- PHASE 1: STUDIO LOGO -->
    <!-- Ginagamit natin ang <Transition> ng Vue para mag-fade in/out nang smooth -->
    <Transition name="fade">
      <div v-if="currentStep === 'logo'" class="intro-logo">
        <h2 class="star-icon">⭐</h2>
        <h2 class="studio-name">INDIE DEV STUDIO</h2>
        <p class="presents-text">PRESENTS</p>
      </div>
    </Transition>

    <!-- PHASE 2: TITLE SCREEN -->
    <Transition name="fade">
      <div v-if="currentStep === 'title'" class="title-section">
        <h1 class="game-title">POKÉMON VUE</h1>
        <p class="subtitle">Press Start (Click Screen)</p>
      </div>
    </Transition>

    <!-- PHASE 3: EMERALD MENU BOX -->
    <Transition name="fade">
      <div v-if="currentStep === 'menu'" class="emerald-menu-box">
        <ul class="menu-list">
          <li v-if="hasSaveFile" class="menu-item" @click.stop="continueGame">
            <span class="cursor">▶</span> CONTINUE
          </li>
          
          <li class="menu-item" @click.stop="startNewGame">
            <span class="cursor" v-if="!hasSaveFile">▶</span>
            <span class="cursor" v-else>&nbsp;&nbsp;</span>
            NEW GAME
          </li>
          
          <li class="menu-item">
            <span class="cursor">&nbsp;&nbsp;</span> OPTION
          </li>
        </ul>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.start-screen-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2d3436; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  cursor: pointer; /* Para magmukhang clickable ang buong screen */
}

/* -------------------------------- */
/* SMOOTH FADE ANIMATION (Vue)      */
/* -------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
  position: absolute; /* Para hindi magtulakan ang elements habang nagfe-fade */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* -------------------------------- */
/* PHASE 1: LOGO STYLES             */
/* -------------------------------- */
.intro-logo {
  text-align: center;
  color: white;
}

.star-icon {
  font-size: 3rem;
  margin: 0;
  animation: dropIn 1s ease-out;
}

.studio-name {
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 3px;
  font-size: 2rem;
  margin: 10px 0;
}

.presents-text {
  font-family: 'Arial', sans-serif;
  letter-spacing: 5px;
  font-size: 1rem;
  color: #a8c0d8;
}

@keyframes dropIn {
  0% { transform: translateY(-50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* -------------------------------- */
/* PHASE 2 & 3: TITLE AT MENU       */
/* (Pareho lang ng ginawa natin!)   */
/* -------------------------------- */
.title-section {
  text-align: center;
}

.game-title {
  color: #ffcc00;
  font-family: 'Courier New', Courier, monospace;
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: 5px;
  text-shadow: 3px 3px 0 #3b4cca;
  margin: 0;
}

.subtitle {
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  margin-top: 10px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.emerald-menu-box {
  background-color: #f8f8f8;
  border: 4px solid #506888;
  border-radius: 8px;
  padding: 20px 40px 20px 20px;
  box-shadow: inset 0 0 0 2px #a8c0d8, 4px 4px 0px rgba(0,0,0,0.3);
  min-width: 250px;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  color: #404040;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.menu-item:hover {
  color: #d03030;
}

.cursor {
  color: #d03030;
  margin-right: 10px;
  opacity: 0;
}

.menu-item:hover .cursor {
  opacity: 1;
}

.menu-item .cursor[v-if] {
  opacity: 1;
}
</style>