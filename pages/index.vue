<template>
  <div class="container">
    <c-box
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      justify-content="center"
    >
      <c-heading id="typed-text" as="h1" display="none"
        ><span>dom bavetta</span></c-heading
      >
      <c-heading as="h1" text-align="center" mb="4">
        <span id="dombavetta"></span>
      </c-heading>
      <c-heading as="h2" font-size="lg" text-align="center" mb="4">
        *coming soon*
      </c-heading>
    </c-box>
  </div>
</template>

<script lang="ts">
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
        bg: 'white',
        color: 'gray.900',
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
