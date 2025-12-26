FROM node:16-alpine

COPY ./packages/frontend/app/.output /usr/src/app

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
WORKDIR /usr/src/app
ENTRYPOINT ["node", "server/index.mjs"]
