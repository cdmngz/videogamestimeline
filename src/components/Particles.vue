<script setup lang="ts">
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

const options = {
  background: {
    color: {
      value: "#111",
    },
  },
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "attract",
      },
      resize: true,
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 60,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
};

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};
</script>

<template>
  <div>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
    />
  </div>
</template>
