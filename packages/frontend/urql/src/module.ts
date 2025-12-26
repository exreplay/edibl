import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit";
import type { NuxtModule } from "@nuxt/schema";

export default defineNuxtModule({
  meta: {
    name: "urql",
    configKey: "urql",
  },
  setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addComponent({
      name: "UrqlProvider",
      filePath: resolve("./runtime/UrqlProvider.vue"),
    });

    nuxt.options.build.transpile.push("@urql/vue");
  },
}) as never as NuxtModule;
