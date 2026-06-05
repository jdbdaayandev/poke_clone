<template>
  <div v-if="store.currentGameState === 'INTRO'" class="intro-container" @pointerdown="skipIntro">
    <div class="intro-content">
      
      <div class="star-animation">✦</div>

      <h2 v-if="currentPhase === 1" class="intro-text fade-in-out">
        JDBD GAMES PRESENTS
      </h2>

      <h2 v-if="currentPhase === 2" class="intro-text fade-in">
        GAME FREAK
      </h2>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameStore } from '../../stores/gameStore';

const store = useGameStore();
const currentPhase = ref(1); // 1 = JDBD Games, 2 = Game Freak

const skipIntro = () => {
  store.goToStartScreen();
};

onMounted(() => {
  // Makinig sa kahit anong keyboard press para ma-skip agad ang buong intro
  const handleSkip = () => {
    window.removeEventListener('keydown', handleSkip);
    skipIntro();
  };
  window.addEventListener('keydown', handleSkip);

  // TIMING CONTROL:
  // Pagkatapos ng 2 segundo, lipat tayo sa Phase 2 (GAME FREAK)
  setTimeout(() => {
    if (store.currentGameState === 'INTRO') {
      currentPhase.value = 2;
    }
  }, 2000);

  // Pagkatapos ng 4.5 segundo, automatic nang papasok sa Pokémon Vue Title Screen
  setTimeout(() => {
    window.removeEventListener('keydown', handleSkip);
    if (store.currentGameState === 'INTRO') {
      skipIntro();
    }
  }, 4500);
});
</script>

<style scoped>
.intro-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* Puting background gaya ng original GBA */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  cursor: pointer;
  user-select: none;
}

.intro-content {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
}

.intro-text {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 4px;
  color: #000000;
  margin: 0;
}

/* --- MGA SIMPLENG CSS ANIMATIONS --- */

/* Text 1: Papasok tapos mawawala mag-isa */
.fade-in-out {
  animation: fadeInOutAnim 1.8s ease-in-out forwards;
}

/* Text 2: Papasok at mananatili hanggang matapos ang intro */
.fade-in {
  opacity: 0;
  animation: fadeInAnim 1s ease-in forwards;
}

/* GBA Star Asset */
.star-animation {
  font-size: 32px;
  color: #ffcc00;
  position: absolute;
  top: -100px;
  left: 45%;
  animation: shootingStar 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes shootingStar {
  0% { top: -100px; left: -20%; transform: scale(0.5); opacity: 1; }
  70% { top: -40px; left: 45%; transform: scale(1.5) rotate(180deg); opacity: 1; }
  100% { top: -40px; left: 45%; transform: scale(0); opacity: 0; }
}

@keyframes fadeInOutAnim {
  0% { opacity: 0; transform: scale(0.95); }
  15%, 85% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.02); }
}

@keyframes fadeInAnim {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>