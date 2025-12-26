import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["../frontend/app/**/*.vue"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "../frontend/app/app/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
    "../frontend/app/app/graphql/introspection.json": {
      plugins: ["urql-introspection"],
    },
    "../frontend/app/app/graphql/schema.ts": {
      plugins: ["typescript", "typescript-urql-graphcache"],
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
