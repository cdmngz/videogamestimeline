<script setup lang="ts">
import { games } from "./services/zelda";
import { GameList } from "./types";
import { computed } from "vue";

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

  console.log(response);
  return response;
});
</script>

<template>
  <div class="loading"><img src="./assets/zelda.svg" /></div>
  <video autoplay loop muted>
    <source src="./assets/space.mp4" type="video/mp4" />
  </video>
  <h1 style="color: #cb6">Zelda video games during the time</h1>
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
            class="image"
            :src="image.src"
            loading="lazy"
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
  <footer>
    <p>
      Inspired from
      <a href="https://www.youtube.com/@SuperMetaFun"
        ><img src="./assets/youtube.svg" /> SuperMetaFun</a
      >
      in his video
      <a href="https://www.youtube.com/watch?v=fHhYoJRm7nU&t=173s"
        >The Innovative Design of Majora's Mask | Retrospective| Legend of Zelda
        | Nintendo 64
      </a>
      <br />
      All the info and dates from
      <a href="https://retrododo.com/legend-of-zelda-games-in-order/">
        Retrododo.com
      </a>
      <br />
      Made with ❤️ by
      <a href="https://github.com/cdmngz">cdmngz</a>
    </p>
    <h5>© {{ new Date().getFullYear() }}</h5>
  </footer>
</template>

<style scoped>
.content {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  padding: 0 3%;
  margin: 0;
}
.divider.even {
  transform: translateY(-45%);
}
.divider.odd {
  transform: translateY(55%);
}
.game {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-radius: var(--soft);
  height: 200px;
  position: relative;
}
.image {
  max-width: 100%;
  max-height: 80%;
  border-radius: var(--soft);
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
  z-index: 5;
}
.loading img {
  height: 20vh;
}
.timeline {
  display: flex;
  position: relative;
  height: 400px;
  overflow: hidden;
}
.timeline::after {
  content: "";
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  height: 2px;
  top: 50%;
  width: 100%;
  position: absolute;
  transform: translateX(-200%);
  animation: moveX 3s 0.5s linear forwards;
}
.divider {
  background-color: #fff;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  z-index: 1;
}
.timeline-entry {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timeline-entry.odd,
.timeline-entry.even {
  width: 200px;
  height: 100%;
}
.timeline-entry.odd {
  flex-direction: column-reverse;
}
.timeline-entry.empty {
  width: 60px;
  height: 100%;
}
.year {
  color: white;
}

@keyframes loading {
  50% {
    background-color: #978339;
  }
  40% {
    opacity: 1;
  }
  100% {
    background-color: black;
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
