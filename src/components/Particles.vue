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
      enable: false,
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
      limit: 100,
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
  emitters: {
    rate: {
      quantity: 1,
      delay: 7,
    },
    particles: {
      shape: {
        type: "images",
        options: {
          images: {
            src: "https://upload.wikimedia.org/wikipedia/en/0/04/Navi_%28The_Legend_of_Zelda%29.png",
            width: 308,
            height: 323,
          },
        },
      },
      size: {
        value: 40,
      },
      move: {
        speed: 1,
        outModes: {
          default: "none",
          right: "destroy",
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 5,
          sync: true,
        },
      },
    },
  },
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
