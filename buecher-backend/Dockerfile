# Verwende Node.js als Basis-Image
FROM node:18

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Code in das Arbeitsverzeichnis
COPY . .

# Setze die Umgebungsvariablen für die Datenbank
ENV DB_HOST=mysql
ENV DB_USER=user
ENV DB_PASSWORD=password
ENV DB_NAME=buechersammlung
ENV DB_PORT=3307

# Exponiere den Port, auf dem der Server läuft
EXPOSE 5000

# Starte die Anwendung
CMD ["npm", "server.js"]
