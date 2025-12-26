/* eslint-disable @typescript-eslint/no-empty-interface */
import 'vue-router';

interface Meta {
  title?: string;
  icon?: keyof typeof import('./utils/navigationBarIcons');
  hideNavigationBar?: boolean;
  hideTitleBar?: boolean;
  order?: number;
}

declare module 'vue-router' {
  interface RouteMeta extends Meta {}
}

declare module '#app' {
  interface PageMeta extends Meta {}
}
