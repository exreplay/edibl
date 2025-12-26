import { defineStore } from 'pinia';
import type { RouteLocationRaw } from 'vue-router';

export const useTitleBarStore = defineStore('titleBar', {
  state: () => {
    return {
      back: null as RouteLocationRaw | null,
      backTo: null as string | null,
      title: null as string | null,
      scrollTrigger: null as HTMLElement | null
    };
  }
});
