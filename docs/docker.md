# ⚙️ Dockerfile Konfiguration

## Server-Dockerfile (`server/Dockerfile`)

### Funktionen im Überblick

1. **Basis-Image**
   - Verwendet Node.js Version 20
   - Stellt die notwendige Laufzeitumgebung bereit

2. **Arbeitsverzeichnis**
   - Setzt `/app` als Hauptverzeichnis

3. **Dateien einbinden**
   - Überträgt alle Projektdateien in den Container

4. **Abhängigkeiten installieren**
   - Führt die Installation der npm-Pakete durch
   - `--force` löst mögliche Paketkonflikte

5. **Netzwerk-Konfiguration**
   - Öffnet Port 4545 für externe Zugriffe

6. **Startbefehl**:
   - Führt `npm start` beim Containerstart aus

```DockerFile
FROM node:20
WORKDIR /app
COPY . ./
RUN npm install --force
EXPOSE 4545
CMD [ "npm", "start" ]
```

### ``docker-compose.yml``

## Frontend-Dockerfile (`frontend/Dockerfile`)

### Was macht dieses Dockerfile?

Dieses Dockerfile erstellt eine Produktionsumgebung für eine Angular-Anwendung. Es besteht aus zwei Hauptphasen:

1. **Build-Phase**
   - **Grundlage**: Node.js 20 als Basis
   - **Arbeitsbereich**: `/app` Verzeichnis
   - **Installation**:
     - Angular CLI (Version 17.3.2) wird global installiert
     - Projektabhängigkeiten werden mit `npm ci` installiert
   - **Erstellung**:
     - Projektdateien werden in den Container kopiert
     - Produktionsversion wird erstellt
     - Output-Hashing wird deaktiviert

2. **Produktions-Phase**
   - **Grundlage**: Nginx als Webserver
   - **Einrichtung**:
     - Nginx-Konfiguration wird für Single-Page-Application eingerichtet
     - Gebaute Frontend-Dateien werden in Nginx-Verzeichnis kopiert
   - **Netzwerk**:
     - Port 80 wird für HTTP-Anfragen geöffnet

### Beispiel-Konfiguration

```DockerFile
FROM node:20 as build

WORKDIR /app
COPY package*.json ./

RUN npm install -g @angular/cli@17.3.2
RUN npm ci
COPY . .

RUN ng build --configuration production --output-hashing none

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/client/browser /usr/share/nginx/html

EXPOSE 80
```

``frontend/nginx.conf``

```conf
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Services

1. **MongoDB Service**:
   - Verwendet das offizielle MongoDB-Docker-Image
   - Erreichbar über Port 27017
   - Teil des internen Netzwerks `app-network`
   - Bridge-Netzwerk ermöglicht isolierte Kommunikation zwischen Containern

2. **Backend Service**:
   - Wird aus dem `./server`-Verzeichnis gebaut
   - API ist über Port 4545 erreichbar
   - Startet automatisch nach dem MongoDB-Service
   - Nutzt Bridge-Netzwerk für sichere Container-Kommunikation

3. **Frontend Service**:
   - Wird aus dem `./frontend`-Verzeichnis gebaut
   - Webanwendung ist über Port 80 erreichbar
   - Startet automatisch nach dem Backend-Service
   - Nutzt Bridge-Netzwerk für sichere Container-Kommunikation

## Netzwerkkonfiguration

### Bridge-Netzwerk

Das Projekt verwendet ein Bridge-Netzwerk namens `app-network`. Dieses Netzwerk:

- Verbindet alle Container miteinander
- Schützt die Container vor anderen Docker-Netzwerken
- Ermöglicht eine sichere Kommunikation zwischen den Diensten

### Docker Compose Konfiguration

Die folgende Konfiguration zeigt, wie die Dienste im Netzwerk verbunden sind:

```yml
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    networks:
      - app-network
  backend:
    build: ./server
    ports:
      - "4545:4545"
    depends_on:
      - mongodb
    networks:
      - app-network
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network
networks:
  app-network:
    driver: bridge
```
