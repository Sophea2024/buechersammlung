# Verwende Node.js als Basis-Image
FROM node:18

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Code ins Arbeitsverzeichnis
COPY . .

# Build des Frontends (optional, falls du React nutzt)
RUN npm run build

# Exponiere den Port, auf dem der Server läuft
EXPOSE 3000

# Starte die Anwendung
CMD ["npm", "start"]
