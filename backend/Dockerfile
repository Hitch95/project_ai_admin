FROM node:24.0.1-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.6.0 --activate
COPY package.json yarn.lock* ./

RUN corepack prepare yarn@4.6.0 --activate
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["yarn", "start"]