import Vue, { VNode } from 'vue';

export function useToast(options: {
  title: string;
  description: string;
  status?: 'success' | 'error' | 'warning' | 'info';
  variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent';
  position?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  duration?: number;
  isClosable?: boolean;
  onClose?: Function;
  render?: (props: { onClose: () => void; id: string }) => VNode;
}) {
  Vue.prototype.$toast(options);
}
