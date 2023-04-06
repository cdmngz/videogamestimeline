<script setup lang="ts">
import { games } from "./services/zelda";
import { GameList } from "./types";
import { computed, ref } from "vue";
import Particles from "./components/Particles.vue";
import Footer from "./components/Footer.vue";

const active = ref(false);
const listGames = computed(() => {
  games.sort((a, b) => a.year - b.year);

  let prevYear = games[0].year - 1;
  let even = true;
  const response = {} as GameList;

  for (let i = 0; i < games.length; i++) {
    const actualYear = games[i].year;
    if (actualYear - prevYear > 1) {
      let count = actualYear - prevYear;
      while (count > 0) {
        response[actualYear - count + 1] = { data: [], even: null };
        count--;
      }
    }
    if (actualYear !== prevYear) {
      response[actualYear] = { data: [], even: even };
      even = !even;
    }
    response[actualYear].data.push(games[i]);
    prevYear = actualYear;
  }

  return response;
});
const hangleImageLoad = () => {
  // console.log(value);
  //active.value = false;
};
</script>

<template>
  <div class="loading"><img src="./assets/zelda.svg" /></div>
  <Particles></Particles>
  <h1 style="color: #cb6">Zelda videogames during the time</h1>
  <div class="content">
    <div class="timeline">
      <div
        :class="[
          'timeline-entry',
          item.even ? 'even' : item.even === false ? 'odd' : 'empty',
        ]"
        v-for="(item, index) of listGames"
        :key="index"
      >
        <div v-if="item.data.length" class="game">
          <img
            v-for="image of item.data"
            :key="image.name"
            :src="image.src"
            loading="lazy"
            :class="['image', active ? 'image-init' : 'image-end']"
            @load="hangleImageLoad()"
          />
        </div>
        <div
          v-if="item.data.length"
          :class="['divider', item.even ? 'even' : 'odd']"
        ></div>
        <div v-if="item.data.length" class="year">{{ index }}</div>
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
  background-color: #fff;
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

.image {
  border-radius: var(--soft);
  transition: 0.3s;
  z-index: 1;
}
.image-init {
  max-height: 0%;
  max-width: 0%;
}
.image-end {
  max-height: 80%;
  max-width: 100%;
}
.image:hover {
  box-shadow: 0 0 22px rgba(255, 255, 255, 0.5);
  cursor: pointer;
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
  background: linear-gradient(
    90deg,
    rgb(170, 153, 68) 0%,
    rgb(255, 255, 255) 100%
  );
  border-radius: 2px;
  height: 2px;
  top: 50%;
  width: 100%;
  position: absolute;
  transform: translateX(-200%);
  animation: moveX 8s linear forwards;
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
  width: 60px;
}
.year {
  color: white;
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

@keyframes moveX {
  100% {
    transform: translateX(0);
  }
}
</style>
