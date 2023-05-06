<script setup lang="ts">
import { games } from "./services/zelda";
import { GameList } from "./types";
import { computed, ref } from "vue";
import Particles from "./components/Particles.vue";
import Footer from "./components/Footer.vue";

const listGames = computed(() => {
  games.sort((a, b) => a.year - b.year);

  let prevYear = games[0].year - 1;
  let even = true;
  const response: GameList = {};

  for (let i = 0; i < games.length; i++) {
    const actualYear = games[i].year;
    let count = actualYear - prevYear;
    if (count > 1) {
      while (count > 0) {
        response[actualYear - count + 1] = { games: [], even: false };
        count--;
      }
    }
    if (actualYear !== prevYear) {
      response[actualYear] = { games: [], even: even };
      even = !even;
    }
    response[actualYear].games.push(games[i]);
    prevYear = actualYear;
  }

  return response;
});
const handleImageLoad = (event: any) => {
  event.currentTarget.classList.remove("image-init");
  event.currentTarget.classList.add("image-end");
};

const pepe = () => {
  console.log("pepe");
};
</script>

<template>
  <div class="loading"><img src="./assets/zelda.svg" /></div>
  <Particles></Particles>
  <header>
    <div @click="pepe" class="level-up"></div>
    <h1 style="color: #cb6">Zelda videogames timeline</h1>
  </header>
  <div class="content">
    <div class="timeline">
      <div v-for="(years, i) of listGames" :key="i">
        <div
          v-if="years.games.length"
          :class="['timeline-entry', years.even ? 'even' : 'odd']"
        >
          <div class="game">
            <img
              v-for="(game, j) of years.games"
              :key="j"
              :src="game.src"
              class="image-init"
              loading="lazy"
              @load="handleImageLoad"
            />
          </div>
          <div
            v-if="years.games.length"
            :class="['divider', years.even ? 'even' : 'odd']"
          ></div>
          <div v-if="years.games.length" class="year">{{ i }}</div>
        </div>
        <div v-else class="timeline-entry empty"></div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.active {
  border: 10px solid blue;
}
.non-active {
  border: 5px solid blueviolet;
}
::-webkit-scrollbar {
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: #a94;
  border-radius: var(--soft);
  width: 20px;
}
.content {
  align-items: center;
  display: flex;
  height: fit-content;
  overflow-x: scroll;
  width: 100vw;
}
.divider {
  background-color: #e4e4e4;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  z-index: 1;
}
.divider.even {
  transform: translateY(-45%);
}
.divider.odd {
  transform: translateY(55%);
}
.game {
  align-items: center;
  border-radius: var(--soft);
  display: flex;
  gap: 5%;
  height: 50%;
  justify-content: center;
  position: relative;
}

.game img {
  border-radius: var(--soft);
  transition: 1s;
  z-index: 1;
}
.image-init {
  max-height: 0%;
  max-width: 0%;
}
.image-end {
  max-height: 75%;
  max-width: 100%;
}
.level-up {
  background-image: url("https://mystickermania.com/cdn/stickers/games/super-mario-1-up-mushroom-512x512.png");
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  height: 50px;
  opacity: 0.9;
  position: absolute;
  right: 30px;
  top: 30px;
  transition: 0.4s;
  width: 50px;
}
.level-up:hover {
  transform: rotate(360deg);
}
.loading {
  align-items: center;
  animation: loading 4s ease-out forwards;
  background-color: black;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 1;
  position: fixed;
  top: 0;
  visibility: visible;
  width: 100%;
  z-index: 6;
}
.loading img {
  height: 18vh;
}
.timeline {
  display: flex;
  margin: 0 10% 5% 10%;
  position: relative;
  height: 360px;
}
.timeline::after {
  content: "";
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  height: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  position: absolute;
}
.timeline-entry {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 200px;
  height: 100%;
}

.timeline-entry.odd {
  flex-direction: column-reverse;
}
.timeline-entry.empty {
  width: 40px;
}
.year {
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 0 8px black;
  z-index: 2;
}

@keyframes loading {
  30%,
  50% {
    background-color: #978339;
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes loading-icon {
  100% {
    transform: scale(1.2);
  }
}
</style>
