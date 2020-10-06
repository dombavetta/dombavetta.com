import { inject } from '@nuxtjs/composition-api';

type ColorMode = 'light' | 'dark';

export function useColorMode(options?: { default: ColorMode }) {
  const colorMode =
    inject<() => ColorMode>('$chakraColorMode') ||
    (() => options?.default || 'dark');

  const toggleColorMode = inject<Function>('$toggleColorMode') || (() => {});

  return { colorMode, toggleColorMode };
}
