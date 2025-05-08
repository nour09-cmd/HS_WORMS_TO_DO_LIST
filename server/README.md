# 🚀 Backend-Server einrichten

## 📁 Projektstruktur anlegen

Erstelle einen neuen Ordner mit dem Namen **`server`** für dein Backend. Dieser Ordner wird später alle Dateien für deinen Server enthalten.

## 🚀 Projekt initialisieren

Um dein Backend-Projekt zu starten, öffne ein Terminal und navigiere in den `server`-Ordner. Führe dann diesen Befehl aus:
 `npm init`

## 📁 Projektstruktur für das Backend

Um dein Backend übersichtlich zu organisieren, solltest du folgende Ordnerstruktur anlegen:

![Projektstruktur](../Diagramms/image-2.png)

Diese Struktur hilft dir dabei:
- Den Code übersichtlich zu organisieren
- Änderungen leichter zu finden
- Das Projekt besser zu warten
- Die Zusammenarbeit im Team zu erleichtern

## 📄 Konfiguration der `package.json` für die Entwicklung

**Warum brauchen wir diese Konfiguration?**
- Der Server startet automatisch neu, wenn du Änderungen am Code vornimmst
- Du musst den Server nicht jedes Mal manuell neu starten
- Das macht die Entwicklung viel angenehmer

**Was bringt dir das?**
- Du siehst deine Änderungen sofort im POSTMAN
- Der Server überwacht deine Dateien automatisch
- Du sparst Zeit beim Entwickeln

**Funktion:**

- `nodemon` überwacht alle Dateien
- Bei Änderungen: Server wird automatisch reloaded
- Fehler werden im Terminal angezeigt

``"start": "nodemon ./src/server.ts"``
  
   ```json
    {
    "name": "server",
    "version": "1.0.0",
    "main": "server.ts",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon ./src/server.ts" 
    },
    "author": "",
    "license": "ISC",
    "description": ""
    }
   ```

## ⚙️  TypeScript-Konfiguration (`tsconfig.json`)

### Wichtige Einstellungen

1. **Compiler-Optionen**:
   - `"target": "ES6"` - Kompiliert zu modernem JavaScript
   - `"module": "commonjs"` - Für Node.js-Kompatibilität
   - `"outDir": "dist/src"` - Ausgabeordner für kompilierte Dateien

2. **Entwicklungsfeatures**:
   - `"sourceMap": true` - Ermöglicht Debugging
   - `"esModuleInterop": true` - Bessere Modul-Handhabung
   - `"experimentalDecorators": true` - Unterstützung für Decorators

3. **Optimierungen**:
   - `"incremental": true` - Schnellere Kompilierung
   - `"skipLibCheck": true` - Überspringt Bibliothekschecks
   - `"strictNullChecks": true` - Striktere Null-Prüfungen

Erstelle im ``server``-Ordner eine Datei mit dem Namen ``tsconfig.json`` und folgendem Inhalt:

   ```json
    {
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES6",
        "moduleResolution": "node",
        "outDir": "dist/src",
        "esModuleInterop": true,
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "useDefineForClassFields": false,
        "incremental": true,
        "skipLibCheck": true,
        "declaration": false,
        "removeComments": true,
        "strictNullChecks": true,
        "allowSyntheticDefaultImports": true,
        "resolveJsonModule": true,
        "baseUrl": "./",
        "typeRoots": ["node_modules/@types"],
        "types": ["jest", "node"]
    },
    "lib": ["es2015"],
    "exclude": ["node_modules"]
    }
   ```

## ✅ Express-Server einrichten (`src/server.ts`)

### Übersicht
In dieser Datei richten wir einen Express-Server ein. Der Server ist die zentrale Komponente unseres Backends und verarbeitet alle eingehenden Anfragen.

### Hauptkomponenten

1. **Basis-Konfiguration**
   - Erstellung einer Express-Anwendung
   - Aktivierung der JSON-Datenverarbeitung
   - Einrichtung von CORS für Webseiten-Zugriffe

2. **Test-Endpunkt**
   - Einrichtung einer Test-Route unter `/`
   - Rückgabe der Nachricht "Hello, From our backend"
   - Dient als Server-Gesundheitscheck

3. **Server-Initialisierung**
   - Start des Servers auf dem konfigurierten Port ****
   - Konsolenausgabe der Server-URL

### Erforderliche Module
- `express`: Web-Framework für die Server-Entwicklung
- `cors`: Ermöglicht Zugriffe von verschiedenen Webseiten
- `PORT`: Port-Konfiguration aus der ``utils/config.ts``

### Code-Implementierung

Erstelle die Datei `src/server.ts` mit folgendem Code:

   ```ts
        import express, { Request, Response } from "express";
        import { PORT } from "../utils/conifg"; # ->../utils/conifg.ts muss auch eingefügt werden 

        const cors = require("cors");

        const app = express();

        app.use(express.json());
        app.use(cors());


        app.get("/", (req: Request, res: Response) => {
            res.send("Hello, From our backend");
        });


        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
   ```

## ⚙️ Konfigurationsdatei erstellen

### Schritt 1: Datei anlegen

Erstelle einen neuen Ordner `utils` und darin die Datei `config.ts`.

Füge folgenden Code in die Datei ein, um den Server-Port festzulegen:

```ts
export const PORT = 4545;
```

## ⚙️  Paketinstallation

### Wichtige Bibliotheken

1. **Express.js** (`express`)
   - Web-Framework für Node.js
   - Ermöglicht Routing und Middlewares

2. **Datenbank** (`mongoose`)
   - MongoDB-ODM (Object Data Modeling)
   - Vereinfacht Datenbankinteraktionen

3. **Sicherheit** (`cors`, `bcryptjs`, `jsonwebtoken`)
   - `cors`: Cross-Origin Resource Sharing
   - `bcryptjs`: Passwort-Hashing
   - `jsonwebtoken`: Authentifizierungstokens

4. **TypeScript** (`ts-node`)
   - Direkte Ausführung von TypeScript
   - Keine manuelle Kompilierung nötig

Führe im Terminal folgenden Befehl aus, um die benötigten Pakete zu installieren:

```bash
npm install cors express mongoose ts-node bcryptjs jsonwebtoken 
```

## 📌 Nodemon Installation

<div style="background-color: #f8d7da; border-left: 5px solid #f44336; padding: 10px; color: #721c24;">
  <strong>Hinweis:</strong><br>
  - Wenn du <strong>nodemon</strong> noch nicht installiert hast, kannst du es global installieren mit:<br>

```bash
npm install -g nodemon 
```

</div>

## 🧪  Server starten

Öffne dein Terminal und navigiere in das Verzeichnis ``server``. Starte den Backend-Server mit:

```bash
npm start
```

## ``config.ts``

```ts
import { Response } from "express";

export const PORT = 4545;

export const DB_URIMONGODB = "mongodb://localhost:27017/";
// export const DB_URIMONGODB = "mongodb://mongodb:27017/test";

export const SECRET_KEY = "tRuBEf1A0l8Heth3qAgO";

const HttpStatus: Record<number, string> = {
    200: "OK",
    201: "Created",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    503: "Service Unavailable",
    409: "already exists",
  };
  
  export function sendResponse(
    res: Response,
    statusCode: number,
    data: any = ""
  ) {
    if (statusCode == 200) {
      return res.status(statusCode).json({
        ...data,
      });
    } else {
      return res.status(statusCode).json({
        status: statusCode,
        message: HttpStatus[statusCode],
        err: data,
      });
    }
  }
```

## 📦 MongoDB-Verbindung einrichten

Die Datei `utils/mongoDBconnection.ts` ermöglicht die Verbindung zwischen deiner Anwendung und der MongoDB-Datenbank.

### 🛠 So funktioniert's

1. **Datenbankverbindung herstellen**:
   - Die `DatabaseConnection`-Klasse verwaltet die Verbindung zur MongoDB
   - Sie nutzt die Verbindungs-URL aus der Konfigurationsdatei (`DB_URIMONGODB`)

2. **Verfügbare Funktionen**:
   - `connect()`: Baut die Verbindung zur Datenbank auf
   - `disconnect()`: Beendet die Datenbankverbindung

3. **Fehlerbehandlung**:
   - Bei Problemen (z.B. falsche Verbindungsdaten) wird eine Fehlermeldung angezeigt
   - Die Anwendung wird sicher beendet

Erstelle die Datei `utils/mongoDBconnection.ts` mit folgendem Code:

```ts
    import mongoose from "mongoose";
    import { DB_URIMONGODB } from "./conifg"; # ->../utils/conifg.ts muss auch eingefügt werden

    export class DatabaseConnection {
    private dbUri: string;

    constructor() {
        this.dbUri = DB_URIMONGODB || "";
        if (!this.dbUri) {
        console.error("Database URI not found in environment variables");
        process.exit(1);
        }
    }

    public async connect(): Promise<void> {
        try {
        const conn = await mongoose.connect(this.dbUri);

        console.log(`Database Connected: ${conn.connection.host}`);
        } catch (err) {
        console.error(`Database Error: ${(err as Error).message}`);
        process.exit(1);
        }
    }
    public async disconnect(): Promise<void> {
        try {
        await mongoose.disconnect();
        console.log(`Database disconnect`);
        } catch (err) {
        console.error(`Database Error: ${(err as Error).message}`);
        process.exit(1);
        }
    }
    }

    export default DatabaseConnection;
```

### 🔧 Konfiguration

Die MongoDB-URI wird in `utils/config.ts` festgelegt: ``DB_URIMONGODB``

```ts
export const DB_URIMONGODB = "mongodb://localhost:27017/";
```

## 📦 Einbindung der Interface-Submodule

![Vorschau der Interfaces](../Diagramms/image-1.png)

**Hinweis:** Die hier beschriebene Lösung ist ein möglicher Ansatz. Es existieren verschiedene alternative Implementierungsmöglichkeiten.

### Einrichtung

1. Forken Sie das Projekt in Ihren eigenen GitHub-Account
2. Fügen Sie die Abhängigkeit in Ihrer `package.json` hinzu:

```bash
"@fullstack/to_do_list": "git+https://github.com/nour09-cmd/TO_DO_Interface.git"
```

cmd

```bash
npm install 
```

## 📦 Models

### 1. Aufgaben-Schema (`Tasks.schema.ts`)

- Definiert das Mongoose-Schema für Aufgaben
- Importiert das `ITasks` Interface
- Enthält Felder:
  - `title` (String, pflicht)
  - `description` (String, pflicht)
  - `dueDate` (String, pflicht)
  - `isCompleted` (Boolean, pflicht)

```ts
import { Schema } from "mongoose";
import {ITasks} from '@fullstack/to_do_list';


export const TasksSchema = new Schema<ITasks>({
    title: { type: String, required: true },
    discription: { type: String, required: true },
    dueDate: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  });
```

### 2. User Schema (`User.schema.ts`)

- Definiert das Mongoose-Schema für Benutzer
- Importiert das `IUser` Interface und `TasksSchema`
- Enthält Felder:
  - `name` (String, pflicht)
  - `email` (String, pflicht)
  - `password` (String, pflicht)
  - `tasks` (Array von Tasks, optional)

```ts
import { Schema } from "mongoose";
import {IUser} from '@fullstack/to_do_list';
import {TasksSchema} from  "./Tasks.schema";

export const UsersSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: { type: [TasksSchema], required: false },
  });
```

### 3. User-Tasks Model (`User_Tasks.model.ts`)

- Implementiert CRUD-Operationen
- Aufbau:
  - **Klassenstruktur**:
    - Privates `model` (Mongoose Model)
    - Privates `conn` (Datenbankverbindung)
    - Constructor initialisiert Model

  - **Methoden**:
    - `createUser()`: Erstellt neuen Benutzer
    - `getUserByEmail()`: Findet Benutzer per E-Mail
    - `createTaskForUser()`: Fügt Task hinzu
    - `updateTaskForUser()`: Aktualisiert Task
    - `deleteTaskForUser()`: Löscht Task
    - `getTasksForUser()`: Holt alle Tasks eines Users
    - `getTaskByIdForUser()`: Holt spezifischen Task

- **Datenbankhandling**:
  - Jede Methode verbindet/trennt Verbindung
  - Nutzt Mongoose-Operationen:
    - `findOne`
    - `findOneAndUpdate`
    - `$push`, `$set`, `$pull` Operatoren
    - `lean()` für bessere Performance

```ts
import mongoose, { Schema, Model } from "mongoose";
import DatabaseConnection from "../utils/mongoDBconnection";
import { ITasks, IUser } from "@fullstack/to_do_list";
import { UsersSchema } from "./Users.schema";

export class User_Tasks_Model {
  private model: Model<IUser>;
  private conn: DatabaseConnection;

  constructor() {
    this.conn = new DatabaseConnection();
    this.model =
      (mongoose.models.UserProfile as Model<IUser>) ||
      mongoose.model<IUser>("UserProfile", UsersSchema);
  }

  async createUser(userData: Omit<IUser, "tasks">): Promise<IUser> {
    await this.conn.connect();
    const user = new this.model({ ...userData, tasks: [] });
    await this.conn.disconnect();

    return (await user.save()).toObject();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    await this.conn.connect();
    const data = this.model.findOne({ email }).lean().exec();
    await this.conn.disconnect();
    return data;
  }

  async createTaskForUser(
    email: string,
    taskData: ITasks
  ): Promise<IUser | null> {
    await this.conn.connect();
    const data = this.model
      .findOneAndUpdate(
        { email },
        { $push: { tasks: taskData } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();

    return data;
  }

  async updateTaskForUser(
    email: string,
    taskId: string,
    updates: Partial<ITasks>
  ): Promise<IUser | null> {
    await this.conn.connect();
    const data = this.model
      .findOneAndUpdate(
        { email, "tasks._id": taskId },
        { $set: { "tasks.$": updates } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }

  async deleteTaskForUser(
    email: string,
    taskId: string
  ): Promise<IUser | null> {
    await this.conn.connect();
    const data = this.model
      .findOneAndUpdate(
        { email },
        { $pull: { tasks: { _id: taskId } } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();

    return data;
  }

  async getTasksForUser(email: string): Promise<ITasks[] | null> {
    await this.conn.connect();
    const user = await this.model
      .findOne({ email })
      .select("tasks")
      .lean()
      .exec();
    await this.conn.disconnect();

    return user?.tasks || null;
  }

  async getTaskByIdForUser(
    email: string,
    taskId: string
  ): Promise<ITasks | null> {
    await this.conn.connect();
    const user = await this.model
      .findOne({ email })
      .select("tasks")
      .lean()
      .exec();
    await this.conn.disconnect();
    return user?.tasks.find((task) => task._id?.toString() === taskId) || null;
  }
}
```

## 📦 Controllers

### 1. UserRegisterController (`UserRegister.controller.ts`)

- Handelt Benutzerregistrierung
- **Methoden**:
  - `createToken()`: Generiert JWT Token
  - `signUp()`: 
    - Validiert Eingabedaten
    - Prüft ob Benutzer existiert
    - Hasht Passwort (bcrypt)
    - Erstellt neuen Benutzer
    - Generiert Token

```ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY, sendResponse } from "../utils/conifg";
import { User_Tasks_Model } from "../models/User_Tasks.model";

export class UserRegisterController {
    private userModel: User_Tasks_Model;

    constructor() {
        this.userModel = new User_Tasks_Model();
    }

    private createToken(email: string, name: string): string {
        return jwt.sign({ name, email }, SECRET_KEY, {
            expiresIn: "5h",
        });
    }

    async signUp(req: Request, res: Response) {
        try {

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return sendResponse(res, 400, { error: "Name, email and password are required" });
            }
            const existingUser = await this.userModel.getUserByEmail(email);
            if (existingUser) {
                return sendResponse(res, 409, { error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await this.userModel.createUser({
                name,
                email,
                password: hashedPassword
            });

            const token = this.createToken(newUser.email, newUser.name);

            return sendResponse(res, 201, {
                token,
                user: {
                    name: newUser.name,
                    email: newUser.email
                }
            });
        } catch (error) {
            console.error("Signup error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }
}

export default UserRegisterController;
```

### 2. UserLoginController (`UserLogin.controller.ts`)

- Handelt Benutzeranmeldung
- **Methoden**:
  - `createToken()`: Generiert JWT Token
  - `login()`:
    - Validiert Eingabedaten
    - Prüft Benutzer existenz
    - Vergleicht Passwort-Hashes
    - Generiert Token bei Erfolg

```ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY, sendResponse } from "../utils/conifg";
import { User_Tasks_Model } from "../models/User_Tasks.model"; 

export class UserLoginController {
    private userModel: User_Tasks_Model;

    constructor() {
        this.userModel = new User_Tasks_Model();
    }

    private createToken(email: string, name: string): string {
        return jwt.sign({ name, email }, SECRET_KEY, {
            expiresIn: "5h",
        });
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return sendResponse(res, 400, { error: "Email and password are required" });
            }

            const user = await this.userModel.getUserByEmail(email);
            if (!user) {
                return sendResponse(res, 401, { error: "Invalid credentials" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return sendResponse(res, 401, { error: "Invalid credentials" });
            }

            const token = this.createToken(user.email, user.name);
            
            return sendResponse(res, 201, {
                token,
                user: {
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("Login error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async isValidToken(req: Request, res: Response){
        return sendResponse(res, 200,{status:true});
    }
}

export default UserLoginController;
```

### 3. TasksController (`Tasks.controller.ts`)

- Handelt Task-Operationen
- **Hilfsmethode**:
  - `isDuplicateTask()`: Prüft auf doppelte Tasks

- **Task-Methoden**:
  - `createTask()`:
    - Validiert Eingaben
    - Prüft auf Duplikate
    - Erstellt Task mit ID
  - `getAllTasks()`:
    - Holt alle Tasks eines Benutzers
  - `getTaskById()`:
    - Holt spezifischen Task
  - `updateTask()`:
    - Aktualisiert Task-Daten
  - `deleteTask()`:
    - Löscht Task

- **Allgemein**:
  - Nutzt `sendResponse` für konsistente Antworten
  - Fehlerbehandlung mit try-catch
  - Statuscodes für verschiedene Szenarien

```ts
import { Request, Response } from "express";
import { sendResponse } from "../utils/conifg";
import { User_Tasks_Model } from "../models/User_Tasks.model";
import mongoose from "mongoose";

export class TasksController {
    private userModel: User_Tasks_Model;

    constructor() {
        this.userModel = new User_Tasks_Model();
    }

    private isDuplicateTask(tasks: any[], newTask: any): boolean {
        return tasks.some(task => 
            task.title === newTask.title && 
            task.description === newTask.description &&
            new Date(task.dueDate).getTime() === new Date(newTask.dueDate).getTime()
        );
    }

    async createTask(req: Request, res: Response) {
        try {
            const { email } =   req["user"];
            const taskData = req.body;

            if (!email || !taskData.title) {
                return sendResponse(res, 400, { error: "Email and task title are required" });
            }

            const user = await this.userModel.getUserByEmail(email);
            if (!user) {
                return sendResponse(res, 404, { error: "User not found" });
            }

            if (this.isDuplicateTask(user.tasks, taskData)) {
                return sendResponse(res, 409, { error: "Task already exists" });
            }

            const taskWithId = {
                ...taskData,
                _id: new mongoose.Types.ObjectId(),
                dueDate: taskData.dueDate || new Date(),
                isCompleted: taskData.isCompleted || false
            };

            const updatedUser = await this.userModel.createTaskForUser(email, taskWithId);

            return sendResponse(res, 201, {
                task: taskWithId
            });
        } catch (error) {
            console.error("Create task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async getAllTasks(req: Request, res: Response) {
        try {
            const { email } =  req["user"];
            
            if (!email) {
                return sendResponse(res, 400, { error: "Email is required" });
            }

            const tasks = await this.userModel.getTasksForUser(email);

            return sendResponse(res, 200, {
                tasks
            });
        } catch (error) {
            console.error("Get tasks error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async getTaskById(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const { email } =  req["user"];

            if (!email || !taskId) {
                return sendResponse(res, 400, { error: "Email and task ID are required" });
            }

            const task = await this.userModel.getTaskByIdForUser(email, taskId);

            if (!task) {
                return sendResponse(res, 404, { error: "Task not found" });
            }

            return sendResponse(res, 200, {
                task
            });
        } catch (error) {
            console.error("Get task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const {  taskId } = req.params;
            const { email } =  req["user"];

            const updates = req.body;

            if (!email || !taskId) {
                return sendResponse(res, 400, { error: "Email and task ID are required" });
            }

            const existingTask = await this.userModel.getTaskByIdForUser(email, taskId);
            if (!existingTask) {
                return sendResponse(res, 404, { error: "Task not found" });
            }

            const updatedUser = await this.userModel.updateTaskForUser(
                email,
                taskId,
                {
                    ...existingTask,
                    ...updates,
                    dueDate: updates.dueDate || existingTask.dueDate
                }
            );

            if (!updatedUser) {
                return sendResponse(res, 404, { error: "User not found" });
            }

            const updatedTask = updatedUser.tasks.find(t => t._id?.toString() === taskId);

            return sendResponse(res, 200, {
                task: updatedTask
            });
        } catch (error) {
            console.error("Update task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const {  taskId } = req.params;
            const { email } =  req["user"];
            if (!email || !taskId) {
                return sendResponse(res, 400, { error: "Email and task ID are required" });
            }

            const existingTask = await this.userModel.getTaskByIdForUser(email, taskId);
            if (!existingTask) {
                return sendResponse(res, 404, { error: "Task not found" });
            }

            const updatedUser = await this.userModel.deleteTaskForUser(email, taskId);

            return sendResponse(res, 200, {
                message: "Task deleted successfully"
            });
        } catch (error) {
            console.error("Delete task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }
}

export default TasksController;
```

## 📦 Routes

### 1. Authentifizierungs-Route (`Auth.route.ts`)

Diese Route verwaltet alle Authentifizierungs-Endpunkte der Anwendung.

#### Aufbau der Route
- Ein Express Router wird initialisiert
- Controller-Instanzen werden erstellt:
  - `UserLoginController` für Login-Funktionen
  - `UserRegisterController` für Registrierungs-Funktionen
  - `UserAuth` für Token-Validierung

#### Verfügbare Endpunkte

1. **Registrierung** (`POST /register`)
   - Verarbeitet neue Benutzerregistrierungen
   - Leitet an `registerController.signUp()` weiter
   - Bei Fehlern: 500 Statuscode

2. **Login** (`POST /login`)
   - Verarbeitet Benutzeranmeldungen
   - Leitet an `loginController.login()` weiter
   - Bei Fehlern: 500 Statuscode

```ts
import { Request, Response, Router } from "express";
import UserLoginController from "../controller/UserLogin.controller";
import UserRegisterController from "../controller/UserRegister.controller";
import { sendResponse } from "../utils/conifg";
import { UserAuth } from "../middleware/User.moddlewares";

const router = Router();

const loginController = new UserLoginController();
const registerController = new UserRegisterController();
const userAuth = new UserAuth();

router.route("/register").post(async (req: Request, res: Response) => {
  try {
    registerController.signUp(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/login").post(async (req: Request, res: Response) => {
  try {
    loginController.login(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/isValidToken").get( userAuth.authenticateToken.bind(userAuth),async (req: Request, res: Response) => {
  try {
    loginController.isValidToken(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
module.exports = router;
```

### 2. Tasks Route (`Tasks.route.ts`)

Diese Datei definiert alle API-Endpunkte für die Aufgabenverwaltung.

#### Aufbau der Routen

1. **Grundlegende Einrichtung**
   - Erstellt einen Express Router
   - Initialisiert den TasksController für die Aufgabenverwaltung
   - Initialisiert die Benutzerauthentifizierung

2. **Verfügbare Endpunkte**

   a) **Neue Aufgabe erstellen** (`POST /task`)
   - Erfordert Benutzerauthentifizierung
   - Leitet an `tasksController.createTask()` weiter
   - Bei Fehlern: 500 Statuscode

   b) **Alle Aufgaben abrufen** (`GET /task`)
   - Erfordert Benutzerauthentifizierung
   - Leitet an `tasksController.getAllTasks()` weiter
   - Bei Fehlern: 500 Statuscode

   c) **Einzelne Aufgabe abrufen** (`GET /task/:taskId`)
   - Erfordert Benutzerauthentifizierung
   - Leitet an `tasksController.getTaskById()` weiter
   - Bei Fehlern: 500 Statuscode

   d) **Aufgabe aktualisieren** (`POST /task/:taskId`)
   - Erfordert Benutzerauthentifizierung
   - Leitet an `tasksController.updateTask()` weiter
   - Bei Fehlern: 500 Statuscode

   e) **Aufgabe löschen** (`DELETE /task/:taskId`)
   - Erfordert Benutzerauthentifizierung
   - Leitet an `tasksController.deleteTask()` weiter
   - Bei Fehlern: 500 Statuscode

#### Technische Details
- Verwendet `sendResponse` für einheitliche API-Antworten
- Implementiert Fehlerbehandlung mit Try-Catch
- Exportiert den Router für die Server-Integration
```ts
import { Router } from "express";
import TasksController from "../controller/Tasks.controller";
import { sendResponse } from "../utils/conifg";
import { UserAuth } from "../middleware/User.moddlewares";

const router = Router();

const tasksController = new TasksController();
const userAuth = new UserAuth();
router
  .route("/task")
  .post(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.createTask(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task")
  .get(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.getAllTasks(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task/:taskId")
  .get(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.getTaskById(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task/:taskId")
  .post(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.updateTask(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task/:taskId")
  .delete(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.deleteTask(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );

module.exports = router;

```

## 📦 Server-Konfiguration (`server.ts`) - Routen-Integration

### Zweck
Die Hauptserver-Datei verbindet die einzelnen Routen-Module mit dem Express-Server, um die API-Endpunkte zugänglich zu machen.

### Komponenten

- **Authentifizierungs-Routen** (`Auth.route.ts`)
  - Verwaltet Login und Registrierung
- **Aufgaben-Routen** (`Tasks.route.ts`) 
  - Steuert alle aufgabenbezogenen Operationen

### Wichtige Merkmale

1. **Import-Methode**
   - Verwendet CommonJS `require()` Syntax
   - Relative Pfade ausgehend vom Server-Standort

2. **Variablen-Zuweisung**
   - `userRoute`: Speichert den Authentifizierungs-Router
   - `tasksRoute`: Speichert den Aufgaben-Router

3. **Hinweis**
   - Kennzeichnet die neuen API-Endpunkte

### Implementierungsablauf

### Implementation Flow

Die Router werden wie folgt eingebunden:
1. Unter spezifischen Basis-Pfaden gemountet (`/api/auth`, `/api/tasks`)
2. Mit der Express-Anwendung verbunden
3. Machen Controller-Methoden über HTTP-Anfragen zugänglich

```ts
import express, { Request, Response } from "express";
import { PORT } from "../utils/conifg";

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req: Request, res: Response) => {
    res.send("Hello, From our backend");
});

// routes
const userRoute = require("../route/Auth.route"); // -> die neue route (api links)
const tasksRoute = require("../route/Tasks.route");

app.use("/api/auth", userRoute);
app.use("/api/tasks", tasksRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
```

## 🔐 Authentifizierungs-Middleware

### Was macht diese Middleware?

Diese Middleware schützt deine API-Routen durch Überprüfung von JWT-Tokens. Sie stellt sicher, dass nur berechtigte Benutzer auf geschützte Routen zugreifen können.

### Wie funktioniert die Middleware?

Die Middleware führt folgende Schritte aus:

1. **Token-Überprüfung**:
   - Liest den `Authorization`-Header aus
   - Prüft, ob der Token gültig ist
   - Extrahiert die Benutzerdaten (E-Mail und Name)

2. **Benutzer-Validierung**:
   - Sucht den Benutzer in der Datenbank
   - Speichert die Benutzerdaten für spätere Verwendung

3. **Fehlerbehandlung**:
   - Zeigt Fehlermeldung bei fehlendem Token (401)
   - Zeigt Fehlermeldung bei ungültigem Token (400)

### Schritt-für-Schritt Ablauf

1. Token aus dem Header lesen
2. Token auf Gültigkeit prüfen
3. Benutzer in der Datenbank suchen
4. Bei Erfolg: Zugriff erlauben
5. Bei Fehler: Zugriff verweigern

### Benötigte Pakete

- `jsonwebtoken` für die Token-Verwaltung
- `User_Tasks_Model` für Datenbankzugriff
- `SECRET_KEY` aus der Konfigurationsdatei
  
```ts
import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../utils/conifg";
import jwt from "jsonwebtoken";
import { User_Tasks_Model } from "../models/User_Tasks.model";


export class UserAuth{
     private userModel: User_Tasks_Model;
    
        constructor() {
            this.userModel = new User_Tasks_Model();
        }

      async authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.header("Authorization");
        const token = authHeader;
    
        if (!token)
          return res
            .status(401)
            .send({ message: "Access denied. No token provided." });
    
        try {
          const decoded = jwt.verify(token, SECRET_KEY);
          const { name, email } = decoded;
          const user = await this.userModel.getUserByEmail(email);
          if (!user)
            return res
              .status(401)
              .send({ message: "Access denied. Invalid token." });
    
          req["user"] = { name, email };
    
          next();
        } catch (error) {
          return res.status(400).send({ message: "Invalid token" });
        }
      }

}
```

## 📦 Einbindung der Authentifizierungs-Middleware

### Grundlagen der Middleware-Integration

Die Authentifizierungs-Middleware wird in drei einfachen Schritten eingebunden:

1. **Erstellung der Middleware-Instanz**:
   - Eine neue Instanz der `UserAuth`-Klasse wird erstellt
   - Diese Instanz verwaltet die Token-Überprüfung

2. **Integration in die Route**:
   - Die Middleware wird als erster Parameter der Route hinzugefügt
   - Die `bind()`-Methode stellt sicher, dass der `this`-Kontext korrekt gesetzt ist

3. **Ablauf der Authentifizierung**:
   - Die Middleware prüft den Token vor der eigentlichen Route
   - Bei gültigem Token wird der Controller ausgeführt
   - Bei ungültigem Token wird die Anfrage abgebrochen

### Praktisches Beispiel

Hier sehen Sie, wie ein geschützter Endpunkt für die Task-Erstellung implementiert wird:

```ts
const userAuth = new UserAuth(); // class abrufen
router.route("/:email/tasks").post(  
userAuth.authenticateToken.bind(userAuth), // her einfügen 
async (req: Request, res: Response) => {
  try {
    tasksController.createTask(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
```
