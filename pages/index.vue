<template>
  <c-box
    v-bind="mainStyles[colorMode]"
    d="flex"
    w="100vw"
    h="100vh"
    flex-dir="column"
    align-items="center"
    justify-content="center"
  >
    <div id="particles" />
    <c-heading id="typed-text" as="h1" display="none" h="60px"
      ><span>dom bavetta</span></c-heading
    >
    <c-box id="content">
      <c-heading
        ref="heading"
        as="h1"
        text-align="center"
        mb="8"
        pb="4"
        font-size="5xl"
        class="underline"
        aria-hidden="true"
      >
        <span id="dombavetta"></span>
      </c-heading>
      <c-stack
        id="dev-tooling"
        direction="row"
        spacing="8"
        align="center"
        justify="center"
      >
        <c-box
          id="dotnet"
          ref="dotnetImg"
          class="dev-logo"
          @mouseenter="ondevtoolMouseEnter('dotnet')"
          @mouseleave="ondevtoolMouseLeave()"
        >
          <img
            src="~/assets/images/logos/net_core_logo.svg"
            alt="Dotnet Core logo"
          />
        </c-box>
        <c-box
          id="vue"
          ref="vueImg"
          class="dev-logo"
          @mouseenter="ondevtoolMouseEnter('vue')"
          @mouseleave="ondevtoolMouseLeave()"
        >
          <img
            src="~/assets/images/logos/vue_logo.svg"
            alt="Vue.Js core logo"
          />
        </c-box>
        <c-box
          id="ts"
          ref="tsImg"
          class="dev-logo"
          @mouseenter="ondevtoolMouseEnter('ts')"
          @mouseleave="ondevtoolMouseLeave()"
        >
          <img src="~/assets/images/logos/ts_logo.svg" alt="Typescript logo" />
        </c-box>
      </c-stack>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import { Container, RecursivePartial, tsParticles } from 'tsparticles';
import { IShape } from 'tsparticles/dist/Options/Interfaces/Particles/Shape/IShape';
import Typed from 'typed.js';
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@nuxtjs/composition-api';
import { useColorMode } from '~/app/composables/color-mode.ts';
import { sleep } from '~/app/utils/async';

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

    const heading = ref<Vue>();
    const dotnetImg = ref<HTMLDivElement>();
    const vueImg = ref<HTMLDivElement>();
    const tsImg = ref<HTMLDivElement>();

    const tempalteRefs = {
      heading,
      dotnetImg,
      vueImg,
      tsImg,
    };

    const particlesRef = ref<Container>();

    const baseShapes: RecursivePartial<IShape> = {
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
    };

    const ondevtoolMouseEnter = (tool: 'dotnet' | 'vue' | 'ts') => {
      if (!particlesRef.value) return;

      const dotnetShapes: RecursivePartial<IShape> = {
        type: 'image',
        image: { src: '/logos/net_core_logo.svg' },
      };

      const vueShapes: RecursivePartial<IShape> = {
        type: 'image',
        image: { src: '/logos/vue_logo.svg' },
      };

      const tsShapes: RecursivePartial<IShape> = {
        type: 'image',
        image: { src: '/logos/ts_logo.svg' },
      };

      if (tool === 'dotnet')
        particlesRef.value.options.particles.shape.load(dotnetShapes);

      if (tool === 'vue')
        particlesRef.value.options.particles.shape.load(vueShapes);

      if (tool === 'ts')
        particlesRef.value.options.particles.shape.load(tsShapes);

      console.log('using ', tool);
      particlesRef.value.refresh();
    };

    const ondevtoolMouseLeave = () => {
      if (!particlesRef.value) return;
      particlesRef.value.options.particles.shape.load(baseShapes);
      particlesRef.value.refresh();
    };

    onMounted(async () => {
      await root.$nextTick();
      const typed = new Typed('#dombavetta', {
        stringsElement: '#typed-text',
        typeSpeed: 75,
        startDelay: 500,
        onComplete: async () => {
          const headingEl = heading.value?.$el;
          const cursorEl = headingEl?.querySelector('.typed-cursor');

          if (headingEl && cursorEl) {
            const cursor = cursorEl as HTMLElement;
            cursor.style.transition = 'opacity 0.2s ease';
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';

            await sleep(200);
            headingEl.removeChild(cursorEl);
          }
        },
      });

      typed.start();

      const particles = await tsParticles.load('particles', {
        fpsLimit: 60,
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          shape: baseShapes,
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

      particlesRef.value = particles;
    });

    return {
      ...tempalteRefs,
      showModal,
      mainStyles,
      colorMode: computed(() => colorMode()),
      toggleColorMode: computed(() => toggleColorMode()),
      ondevtoolMouseEnter,
      ondevtoolMouseLeave,
    };
  },
});
</script>

<style lang="scss" scoped>
#particles {
  position: absolute;
  width: 100%;
  height: 100%;
  animation-name: fade;
  animation-duration: 1s;
  animation-timing-function: ease-in;
  animation-direction: normal;
  animation-fill-mode: both;

  canvas {
    display: block;
  }
}

#content {
  position: relative;
  padding-bottom: 80px;

  h1 {
    font-family: basic-sans, sans-serif;
    font-weight: 400;
    font-style: italic;

    &.underline {
      background: linear-gradient(
          to left,
          rgba(128, 255, 114, 0.5) 0%,
          rgba(126, 232, 250, 0.5) 100%
        )
        left bottom transparent no-repeat;
      background-size: 100% 2px; /* if linear-gradient, we need to resize it */
    }
  }

  #dev-tooling {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .dev-logo {
    transition: 0.15s ease;
    display: grid;
    place-items: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: saturate(150%) blur(5px);
    border-radius: 5px;

    img {
      transition: 0.2s ease;
      min-width: 35px;
      min-height: 35px;
      animation-name: pop;
      animation-duration: 0.15s;
      animation-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.75);
      animation-direction: normal;
      animation-fill-mode: both;
      will-change: transform;
    }

    &#dotnet {
      &:hover {
        box-shadow: 0 0 0 4px rgba(#5c2d91, 0.8);
      }

      img {
        animation-delay: 1.5s;
      }
    }

    &#vue {
      &:hover {
        box-shadow: 0 0 0 4px rgba(#41b883, 0.8);
      }

      img {
        animation-delay: 1.6s;
      }
    }

    &#ts {
      &:hover {
        box-shadow: 0 0 0 4px rgba(#3178c6, 0.8);
      }

      img {
        animation-delay: 1.7s;
      }
    }
  }
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

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
