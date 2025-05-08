# 📌 Implementiern sie interface classes

## 📁 Schritt 1: Projektstruktur für TypeScript-Interfaces

1. Erstelle einen Ordner namens **`Interface`**.
2. Führe im `Interface`-Ordner den folgenden Befehl aus, um ein neues Node.js-Projekt zu initialisieren:

   ```bash
       npm init
   ```

3. Erstelle im Interface-Ordner eine Datei ``Interface/tsconfig.json`` mit folgendem Inhalt

   ```json
   {
     "compilerOptions": {
       "declaration": true,
       "module": "CommonJS",
       "target": "ES2020",
       "outDir": "./dist",
       "strict": true
     },
     "include": ["lib/**/*"],
     "exclude": ["dist"]
   }
   ```

4. Erstelle nun einen Unterordner namens `Interface/lib`, in dem die Interfaces definiert werden.
5. Interface-Dateien erstellen `Interface/lib/Tasks.interface.ts`

   ```ts
   export interface ITasks {
     _id?: any;  // ? = ist soll geben!
     title: string;
     discription: string;
     dueDate: string;
     isCompleted: boolean;
   }
   ```

6. Interface-Dateien erstellen `Interface/lib/User.interface.ts`

   ```ts
   import { ITasks } from "./Tasks.interface";

   export interface IUser {
     name: string;
     email: string;
     password: string;
     tasks: ITasks[];
   }
   ```

7. Interface-Dateien erstellen `Interface/index.ts`

   ```ts
   export * from "./lib/User.interface";
   export * from "./lib/Tasks.interface";
   ```
