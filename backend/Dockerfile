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

# Build the application (tsc-alias will resolve the @ paths)
RUN yarn build

# Remove .d.ts files that might cause conflicts
RUN find dist -name "*.d.ts" -type f -delete
RUN find dist -name "*.d.ts.map" -type f -delete
RUN ls -la dist/ && find dist -name "*.d.ts" || echo "No .d.ts files found"

# Verify build output
RUN ls -la dist/

# Expose the application port
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

# Use the experimental specifier resolution for imports without extensions
CMD ["node", "--experimental-specifier-resolution=node", "dist/server.js"]