FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
CMD ["node", "src/index.tsx"]
EXPOSE 3000