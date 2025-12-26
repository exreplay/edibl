module.exports = {
  projects: {
    app: {
      schema: 'http://localhost:4000/graphql',
      documents: ['packages/app/**/*.graphql', 'packages/app/**/*.ts', 'packages/app/**/*.vue']
    }
  }
};
