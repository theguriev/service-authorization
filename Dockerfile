# Specify the base image
FROM therealguriev/pnpm-node:16.20.1-alpine-4

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json pnpm-lock.yaml ./

# Bundle app source
COPY . .

# Install app dependencies
RUN pnpm install

# build app
RUN pnpm run build

# Define the command to run the app
CMD [ "node", ".output/server/index.mjs" ]
