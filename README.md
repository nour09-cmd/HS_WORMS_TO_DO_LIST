# 📝 TO-DO-LISTE

Dieses Projekt zeigt, wie man eine einfache TO-DO-Liste als Full-Stack-Anwendung erstellt – von der Planung über die Backend- und Datenbank-Implementierung bis hin zum Einsatz von Docker.

## 🚀 Ziel

Entwicklung einer benutzerfreundlichen Webanwendung, mit der registrierte Benutzer ihre Aufgaben verwalten können.  
Funktionen: Registrierung, Login, Erstellen, Lesen, Aktualisieren und Löschen von TO-DOs (CRUD).

---

## 🧩 Funktionen (User Stories)

- Als **registrierter Benutzer** möchte ich mich einloggen, um Zugriff auf meine TO-DOs zu erhalten.
- Als **angemeldeter Benutzer** möchte ich TO-DOs **erstellen**, um meine Aufgaben zu planen.
- Als **angemeldeter Benutzer** möchte ich TO-DOs **anzeigen**, um meine Aufgaben zu überblicken.
- Als **angemeldeter Benutzer** möchte ich TO-DOs **bearbeiten**, um Änderungen vornehmen zu können.
- Als **angemeldeter Benutzer** möchte ich TO-DOs **löschen**, um abgeschlossene Aufgaben zu entfernen.

---

## 🧪 Projekt lokal testen

### Voraussetzungen

- Docker installiert und gestartet
- Node.js installiert
- Kein laufender MongoDB-Container auf Port 27017

### 🛠️ Setup-Schritte

1. **Datenbank-URL konfigurieren**  
   Sicherstellen, dass `server/utils/config.ts` enthält:

```ts
export const DB_URIMONGODB = "mongodb://localhost:27017/";
```

### MongoDB-Container starten

Im Terminal ausführen:

```bash
   docker run -d -p 27017:27017 --name mongodb -v mongodb_volume:/data/db mongo:latest
```

### Backend-Server starten

Im `server`-Verzeichnis ausführen:

```bash
npm install 
npm start
```

### frontend-Server starten

Im `frontend`-Verzeichnis ausführen:

```bash
npm install 
npm start
```

## 🐳 Projekt auf Docker testen

**Voraussetzungen:**

- Docker installiert
- Ports 27017/4545 frei

**Schritte:**

1. `docker compose up` ausführen
2. DB-URL in `server/utils/config.ts` prüfen

**Hinweis:**

- Backend unter localhost:4545 erreichbar
- Logs bei Fehlern checken
  **Wichtig:**  
  In `server/utils/config.ts` muss folgende DB-URL stehen:

```ts
export const DB_URIMONGODB = "mongodb://mongodb:27017/test";
```

### #Container starten

Im Terminal ausführen:

```bash
docker compose up --build
```

## 🛠️ API-Tests mit Postman

### Einrichtung der Testumgebung

1. Lade die Datei `TODO_LIST.postman_collection.json` in Postman herunter
2. Richte folgende Umgebungsvariablen ein:
   - **URL**: `http://localhost:4545/api` (Backend-Server)
   - **TOKEN**: `!deine_tokenkey` (Wird nach dem Login automatisch gesetzt)

### Verfügbare API-Endpunkte

#### Benutzerauthentifizierung

- `POST {{URL}}/auth/register` - Neuen Benutzer registrieren
- `POST {{URL}}/auth/login` - Anmeldung durchführen
- `GET {{URL}}/auth/isValidToken` - Token-Validität prüfen

#### Aufgabenverwaltung

Für alle Aufgaben-Endpunkte muss der Header `Authorization: {{TOKEN}}` gesetzt werden:

- `POST {{URL}}/tasks/task` - Neue Aufgabe anlegen
- `GET {{URL}}/tasks/task` - Alle Aufgaben abrufen
- `GET {{URL}}/tasks/:taskId` - Einzelne Aufgabe anzeigen
- `POST {{URL}}/tasks/:taskId` - Aufgabe bearbeiten
- `DELETE {{URL}}/tasks/:taskId` - Aufgabe löschen

**Wichtiger Hinweis**: Ersetze die Platzhalter `:taskId` in den URLs durch die tatsächliche ID der Aufgabe.

## 🧠 Schritt 1: Modellierung

### 📌 Use-Case-Diagramm

![Use Case Diagramm](./Diagramms/use_case.svg)

### 📌 ER-Diagramm

![ER Diagramm](./Diagramms/ER.svg)

---

## 🧠 Schritt 2: Setup environment

<div style="background-color: #f8d7da; border-left: 5px solid #f44336; padding: 10px; color: #721c24;">
  <strong>Hinweis:</strong><br>
  - Stellen Sie sicher, dass Node.js auf Ihrem PC installiert ist.<br>
  - Installieren Sie auch Docker auf Ihrem Computer.<br>
  - Wählen Sie einen Texteditor Ihrer Wahl (z. B. VS Code).<br>
  - ( OPTIONAL* ) Installieren Sie Git Bash
</div>

### 📌 Docker-Setup

1. Öffnen Sie Docker.
2. Öffnen Sie das Terminal (CMD) und starten Sie einen MongoDB-Container mit folgendem Befehl:

   ```bash
   docker run -d -p 27017:27017 --name mongo -v mongodb_volume:/data/db mongo:latest
   ```

   **testen**: auf

   ```bash
   http://localhost:27017/
   ```

![alt text](./Diagramms/image3.png)

## 🧠 Schritt 3: Projektstruktur

### 📱 Interface

Weitere Details finden Sie in der [Interface-Dokumentation](./Interface/README.md).

### 🖥️ Server

Der Backend-Server wurde mit Node.js und TypeScript implementiert. 
Detaillierte Informationen zur Server-Architektur finden Sie in der [Server-Dokumentation](./server/README.md).

### 🎨 Frontend

Das Frontend wurde mit Angular entwickelt und bietet eine moderne, responsive Benutzeroberfläche.
Mehr Informationen zur Frontend-Implementierung finden Sie in der [Frontend-Dokumentation](./frontend/README.md).

### 🐳 Docker

Die Containerisierung wurde mit Docker realisiert, um eine konsistente Entwicklungsumgebung zu gewährleisten.
Weitere Details zur Docker-Konfiguration finden Sie in der [Docker-Dokumentation](./docs/docker.md).

## 📚 Offizielle Dokumentationen & Nützliche Tools

### Backend-Entwicklung

| Technologie    | Dokumentation                                       | Beschreibung                                              |
| -------------- | --------------------------------------------------- | --------------------------------------------------------- |
| **Node.js**    | [Offizielle Docs](https://nodejs.org/en/docs/)      | JavaScript-Laufzeitumgebung für Serverseitige Entwicklung |
| **TypeScript** | [TS Handbuch](https://www.typescriptlang.org/docs/) | Typisiertes JavaScript-Superset                           |

### Datenbanken

| Technologie    | Dokumentation                                 | Beschreibung                          |
| -------------- | --------------------------------------------- | ------------------------------------- |
| **MongoDB**    | [MongoDB Docs](https://docs.mongodb.com/)     | Dokumentenorientierte NoSQL-Datenbank |
| **PostgreSQL** | [PostgreSQL Docs](https://node-postgres.com/) | Open-Source RDBMS                     |

### Sicherheit

| Technologie | Dokumentation                                          | Beschreibung                |
| ----------- | ------------------------------------------------------ | --------------------------- |
| **bcrypt**  | [npm bcryptjs](https://www.npmjs.com/package/bcryptjs) | Passwort-Hashing Bibliothek |
| **JWT**     | [jwt.io](https://jwt.io/introduction/)                 | JSON Web Tokens Standard    |

### Infrastruktur

| Technologie | Dokumentation                           | Beschreibung        |
| ----------- | --------------------------------------- | ------------------- |
| **Docker**  | [Docker Docs](https://docs.docker.com/) | Container-Plattform |

### Frontend

| Technologie | Dokumentation                           | Beschreibung              |
| ----------- | --------------------------------------- | ------------------------- |
| **Angular** | [Angular Docs](https://angular.io/docs) | Web Application Framework |

### Projekt-Dokumentation

| Tool          | Dokumentation                                    | Beschreibung                       |
| ------------- | ------------------------------------------------ | ---------------------------------- |
| **README.md** | [Markdown Guide](https://www.markdownguide.org/) | Standard für Projektbeschreibungen |

## 📜 Lizenz

Dieses Projekt ist lizenziert unter der [MIT-Lizenz](LICENSE).
