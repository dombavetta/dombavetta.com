<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider>
        <CBox font-family="body" as="main">
          <CReset />
          <Nuxt />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
