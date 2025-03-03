FROM node:18-alpine

WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package.json package-lock.json ./

# Installiere Abhängigkeiten
RUN npm install

# Kopiere den Rest des Projekts ins Arbeitsverzeichnis
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]