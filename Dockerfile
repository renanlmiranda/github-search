FROM node:lts-alpine

RUN mkdir -p /home/node/frontend/node_modules && chown -R node:node /home/node/frontend

WORKDIR /home/node/frontend

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

CMD ["yarn", "start"]
