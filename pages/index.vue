<template>
  <div class="container">
    <c-box
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      align="center"
      justify-content="center"
    >
      <div id="particles"></div>
      <c-heading id="typed-text" as="h1" display="none" h="60px"
        ><span>dom bavetta</span></c-heading
      >
      <c-heading as="h1" text-align="center" mb="8" font-size="5xl">
        <span id="dombavetta"></span>
      </c-heading>
      <!-- <c-heading as="h2" font-size="lg" text-align="center" mb="4">
        *coming soon*
      </c-heading> -->
      <c-stack direction="row" spacing="8" align="center" justify="center">
        <c-box class="dev-logo-container">
          <img
            id="dotnet"
            src="~/assets/images/logos/net_core_logo.svg"
            alt="Dotnet Core logo"
            class="dev-logo"
          />
        </c-box>
        <c-box class="dev-logo-container">
          <img
            id="vue"
            src="~/assets/images/logos/vue_logo.svg"
            alt="Vue.Js core logo"
            class="dev-logo"
          />
        </c-box>
        <c-box class="dev-logo-container">
          <img
            id="ts"
            src="~/assets/images/logos/ts_logo.svg"
            alt="Typescript logo"
            class="dev-logo"
          />
        </c-box>
      </c-stack>
      <c-heading as="h2" text-align="center" mt="8" font-size="2xl">
        Full stack web developer
      </c-heading>
    </c-box>
  </div>
</template>

<script lang="ts">
import { tsParticles } from 'tsparticles';
import Typed from 'typed.js';
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@nuxtjs/composition-api';
import { useColorMode } from '~/app/composables/color-mode.ts';

export default defineComponent({
  name: 'HomePage',
  setup(props, { root }) {
    const showModal = ref(false);

    const mainStyles = {
      dark: {
        bg: 'gray.700',
        color: 'whiteAlpha.900',
      },
      light: {
        // bg: 'white',
        // color: 'gray.900',
        bg: 'gray.700',
        color: 'whiteAlpha.900',
      },
    };

    const { colorMode, toggleColorMode } = useColorMode();

    onMounted(async () => {
      await root.$nextTick();
      const typed = new Typed('#dombavetta', {
        stringsElement: '#typed-text',
        typeSpeed: 75,
        startDelay: 500,
      });

      typed.start();

      tsParticles.load('particles', {
        /* options here */
        fpsLimit: 60,
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          shape: {
            type: 'image',
            images: [
              {
                src: '/logos/vue_logo.svg',
              },
              {
                src: '/logos/net_core_logo.svg',
              },
              {
                src: '/logos/ts_logo.svg',
              },
            ],
          },
          opacity: {
            value: 0.7,
          },
          size: {
            value: 6,
            random: {
              enable: true,
              minimumValue: 3,
            },
            animation: {
              enable: true,
              speed: 5,
              minimumValue: 3,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            warp: true,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            resize: true,
            onhover: {
              enable: true,
              mode: 'repulse',
            },
          },
          modes: {
            repulse: {
              distance: 200,
              duration: 0.2,
              speed: 0.2,
            },
          },
        },
        retina_detect: true,
      });
    });

    return {
      showModal,
      mainStyles,
      colorMode: computed(() => colorMode()),
      toggleColorMode: computed(() => toggleColorMode()),
    };
  },
});
</script>

<style lang="css" scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;1,300&display=swap'); */
#particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
  vertical-align: bottom;
}

h1,
h2 {
  font-family: basic-sans, sans-serif;
  font-weight: 400;
  font-style: italic;
  margin-left: 18px;
}

.dev-logo {
  transition: 0.2s ease;
  width: 40px;
  height: auto;
  animation-name: pop;
  animation-duration: 0.15s;
  animation-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.75);
  animation-direction: normal;
  animation-fill-mode: both;
  will-change: transform;
}

.dev-logo-container {
  perspective: 40px;
}

.dev-logo#dotnet {
  animation-delay: 1.5s;
}
.dev-logo#vue {
  animation-delay: 1.6s;
}
.dev-logo#ts {
  animation-delay: 1.7s;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
