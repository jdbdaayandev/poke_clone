<template>
  <div v-if="store.isMenuOpen && store.currentMenu === 'POKEMON'" class="party-menu-container">
    <div class="party-box">
      <h2>POKéMON PARTY</h2>
      <ul>
        <li v-for="(poke, index) in partyList" :key="index" :class="{ active: selectedIndex === index }">
          <span v-if="selectedIndex === index" class="cursor">▶</span>
          <span v-else class="spacer">&nbsp;&nbsp;</span>
          {{ poke.name }} - Lv.{{ poke.level }} (HP: {{ poke.hp }}/{{ poke.maxHp }})
        </li>
      </ul>
      <div class="footer">Press X to go back</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../stores/gameStore'; // I-adjust ang path kung kailangan

const store = useGameStore();
const selectedIndex = ref(0);

// Hardcoded muna natin ang Pokémon para may makita ka sa UI. 
// Sa susunod, kukunin natin ito sa gameStore mo!
const partyList = [
  { name: 'PIKACHU', level: 5, hp: 20, maxHp: 20 },
  { name: 'CHARMANDER', level: 5, hp: 18, maxHp: 18 },
  { name: 'BULBASAUR', level: 4, hp: 15, maxHp: 15 }
];

const handleKeys = (e) => {
  // Tatakbo lang itong controls na ito kung nakabukas ang Party Menu
  if (!store.isMenuOpen || store.currentMenu !== 'POKEMON') return;

  if (e.key === 'ArrowUp') {
    selectedIndex.value = selectedIndex.value > 0 ? selectedIndex.value - 1 : partyList.length - 1;
  } else if (e.key === 'ArrowDown') {
    selectedIndex.value = selectedIndex.value < partyList.length - 1 ? selectedIndex.value + 1 : 0;
  } else if (e.key === 'x' || e.key === 'X') {
    // Kapag pinindot ang X, babalik tayo sa START menu!
    store.currentMenu = 'START';
  }
};

onMounted(() => window.addEventListener('keydown', handleKeys));
onUnmounted(() => window.removeEventListener('keydown', handleKeys));
</script>

<style scoped>
.party-menu-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Pampadiskarte para medyo umitim yung background game */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Mas mataas sa StartMenu para pumabaw */
}

.party-box {
  background: #1d7a5b; /* Pokémon Emerald Green */
  border: 4px solid #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  height: 80%;
  box-shadow: 4px 4px 0px #000;
  position: relative;
}

h2 {
  color: white;
  font-family: 'Courier New', Courier, monospace;
  margin-top: 0;
  border-bottom: 2px solid white;
  padding-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-size: 24px;
  padding: 10px 0;
  font-weight: bold;
}

.cursor { color: #ffcc00; margin-right: 10px; }
.spacer { display: inline-block; width: 24px; }
.active { color: #ffffff; }

.footer {
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #ffcc00;
  font-family: 'Courier New', Courier, monospace;
  font-size: 18px;
}
</style>