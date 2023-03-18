FROM node:18

# Create app directory
WORKDIR /usr/src/api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Build for production, note --omit=dev supercedes --only=production
# If you encounter errors where the server crashes, ensure that dependencies
# are in the correct section. Cors must not be a dev dependency.
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Open port 3000 because that's where the server connects...
EXPOSE 3000

# Run the API
CMD [ "node", "server.js" ]