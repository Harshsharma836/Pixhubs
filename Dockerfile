# Stage 1 - Build the React client
FROM node:14 as client-build
WORKDIR /app
COPY pixhub-client/package*.json ./
RUN npm install
COPY pixhub-client .
RUN npm run build

# Stage 2 - Build the Node.js server
FROM node:14 as server-build
WORKDIR /app
COPY pixhub-server/package*.json ./
RUN npm install
COPY pixhub-server .
RUN npm run build

# Production stage
FROM node:14
WORKDIR /app
COPY --from=server-build /app .
COPY --from=client-build /app/build ./client/build
EXPOSE 3000
CMD ["npm", "start"]
