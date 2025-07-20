FROM node:24.4.1-alpine

WORKDIR /app

# Enable Corepack and prepare Yarn
RUN corepack enable && corepack prepare yarn@4.6.0 --activate
# Copy package files and Yarn configuration
COPY package.json yarn.lock* .yarnrc.yml* ./
# Install dependencies using Yarn
RUN yarn install --immutable

# Copy all the source code
COPY . .

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
CMD ["yarn", "start"]