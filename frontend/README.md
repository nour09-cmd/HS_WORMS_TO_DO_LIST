# Frontend

## Frontend Setup

1.  Angular CLI installieren `npm install -g @angular/cli`

2.  Neue Angular-App erstellen `ng new <project name>`

3.  Interface hinzufügen `package.json` In der package.json folgende Dependency eintragen

```json
"@fullstack/to_do_list": "git+https://github.com/nour09-cmd/TO_DO_Interface.git"
```

4. Dependencies installieren `npm install`

5. Bootstrap (optional) `npm install bootstrap bootstrap-icons` und in file `frontend/angular.json` unter styles einfügen: `"node_modules/bootstrap/dist/css/bootstrap.min.css",`

```json

"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.css"
],

```

## Frontend-Komponenten

### Aufbau einer Angular-Komponente

Eine Angular-Komponente setzt sich aus vier Dateien zusammen:

- **`add-task.component.css`**  
  Enthält die Gestaltungsregeln (CSS) für das Aussehen der Komponente

- **`add-task.component.html`**  
  Definiert die Struktur und den Inhalt der Komponente mit HTML und Angular-Befehlen

- **`add-task.component.spec.ts`**  
  Dient zum Testen der Komponente (z.B. mit SWQ\*)

- **`add-task.component.ts`**  
  Enthält die Programmierung der Komponente in TypeScript

## Erstelle die addTask-Komponente (cmd): `ng generate component addTask`

### HTML-Template für das Task-Formular (`add-task.component.html`)

In diesem Abschnitt wird das HTML-Template für das Formular zum Erstellen neuer Aufgaben (Tasks) beschrieben. Das Formular wird als Modal-Fenster (Pop-up) angezeigt und enthält drei Hauptfelder:

1. **Titel** (erforderlich)
   - Ein Pflichtfeld für den Namen der Aufgabe
   - Wird mit einem Sternchen (*) gekennzeichnet

```html
<div class="modal-backdrop show" *ngIf="true"></div>
<div class="modal show d-block" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Neuen Task hinzufügen</h5>
        <button type="button" class="btn-close" (click)="onCancel()"></button>
      </div>
      <div class="modal-body">
        <form (ngSubmit)="onSave()">
          <div class="mb-3">
            <label class="form-label">Titel*</label>
            <input
              type="text"
              class="form-control"
              [(ngModel)]="task.title"
              name="title"
              required
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Beschreibung</label>
            <textarea
              class="form-control"
              [(ngModel)]="task.description"
              name="description"
              rows="2"
            ></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Fälligkeitsdatum</label>
            <input
              type="date"
              class="form-control"
              [(ngModel)]="task.dueDate"
              name="dueDate"
            />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="onCancel()">
          Abbrechen
        </button>
        <button type="button" class="btn btn-primary" (click)="onSave()">
          Speichern
        </button>
      </div>
    </div>
  </div>
</div>
```

### TypeScript-Klasse für die Add-Task-Komponente

Die `add-task.component.ts` ist die Hauptlogik für das Formular zum Erstellen neuer Aufgaben. Hier werden die wichtigsten Funktionen erklärt:

#### Wichtige Eigenschaften:
- `@Output() save`: Sendet die neue Aufgabe an die übergeordnete Komponente
- `@Output() cancel`: Schließt das Formular ohne Änderungen
- `task`: Speichert die eingegebenen Daten der Aufgabe

`onSave()`: Validiert den Titel und emittiert den Task.

`onCancel()`: Schließt das Modal ohne Änderungen.

```ts
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ITasks } from "@fullstack/to_do_list";

@Component({
  selector: "app-add-task",
  imports: [FormsModule, CommonModule],
  templateUrl: "./add-task.component.html",
  styleUrl: "./add-task.component.css",
})
export class AddTaskComponent {
  @Output() save = new EventEmitter<ITasks>();
  @Output() cancel = new EventEmitter<void>();

  task: Partial<ITasks> = {
    title: "",
    description: "",
    dueDate: "",
    isCompleted: false,
  };

  onSave() {
    if (this.task.title) {
      this.save.emit(this.task as ITasks);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
```

#### Verwendung

Die Komponente kann in einer Elternkomponente eingebunden werden, z. B.:

```html
<app-add-task (save)="handleSave($event)" (cancel)="handleCancel()">
</app-add-task>
```

## TaskCard-Komponente erstellen

Mit dem Befehl `ng generate component taskCard` wird eine neue Komponente für die Darstellung einzelner Aufgaben erstellt.

### HTML-Template (task-card.component.html)

Die Komponente zeigt eine Aufgabe als Karte an und bietet folgende Funktionen:

#### Styling und Darstellung
- Dynamische Formatierung: Erledigte Aufgaben werden durchgestrichen und abgedunkelt dargestellt
- Responsive Design: Bootstrap-Klassen für ein ansprechendes Layout
- Klare visuelle Hierarchie: Titel, Beschreibung und Fälligkeitsdatum sind gut strukturiert

#### Interaktive Elemente
- Checkbox zum Markieren erledigter Aufgaben
- Lösch-Button für das Entfernen von Aufgaben
- Eindeutige Verknüpfung zwischen Checkbox und Label durch dynamische IDs

`[id] und [for]` verknüpfen Checkbox mit Label eindeutig.

```html
<div class="card mb-3" [class.completed-task]="task.isCompleted">
  <div class="card-body">
    <div class="form-check form-switch mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        [id]="'taskCheckbox_' + task._id"
        [checked]="task.isCompleted"
        (change)="onToggleComplete()"
      />
      <label
        class="form-check-label task-title fw-bold"
        [class.text-decoration-line-through]="task.isCompleted"
        [class.text-muted]="task.isCompleted"
        [for]="'taskCheckbox_' + task._id"
      >
        {{ task.title }}
      </label>
    </div>

    @if (task.description) {
    <p class="mb-2">{{ task.description }}</p>
    } @if (task.dueDate) {
    <span [class]="dueDateClass">
      📅 {{ task.isCompleted ? 'Erledigt am:' : 'Fällig:' }} {{ task.dueDate }}
    </span>
    }

    <button class="btn btn-sm btn-danger float-end" (click)="onDelete()">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</div>
```

### TaskCard-Komponente (`task-card.component.ts`)

Die TaskCard-Komponente ist für die Darstellung und Verwaltung einzelner Aufgaben zuständig. Sie zeigt eine Aufgabe als Karte an und ermöglicht das Markieren als erledigt sowie das Löschen der Aufgabe.

#### Datenübertragung

- `@Input() task`: Die Komponente erhält die Aufgabendaten von der übergeordneten Komponente
- `@Output() toggleComplete/delete`: Die Komponente informiert die übergeordnete Komponente über Änderungen (z.B. wenn eine Aufgabe als erledigt markiert oder gelöscht wird)

#### Funktionen

- `onToggleComplete()`: Wird aufgerufen, wenn der Status einer Aufgabe geändert wird (durch Anklicken der Checkbox)
- `onDelete()`: Wird aufgerufen, wenn eine Aufgabe gelöscht werden soll
- `get dueDateClass()`: Bestimmt die CSS-Klassen für die Darstellung des Fälligkeitsdatums

#### Struktur

- **Selector**: `app-task-card` (wird als HTML-Tag verwendet)
- **Template/CSS**: Die Darstellung wird in separaten Dateien definiert
- **Interface**: Verwendet das `ITasks`-Interface für eine typsichere Implementierung


```ts
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ITasks } from "@fullstack/to_do_list";
@Component({
  selector: "app-task-card",
  imports: [],
  templateUrl: "./task-card.component.html",
  styleUrl: "./task-card.component.css",
})
export class TaskCardComponent {
  @Input() task!: ITasks;
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onToggleComplete() {
    this.toggleComplete.emit(this.task._id);
  }

  onDelete() {
    this.delete.emit(this.task._id);
  }

  get dueDateClass() {
    return {
      "due-date": true,
      completed: this.task.isCompleted,
    };
  }
}
```

#### Verwendungs

```html
<app-task-card
  [task]="taskData"
  (toggleComplete)="handleToggle($event)"
  (delete)="handleDelete($event)"
>
</app-task-card>
```

## Seiten erstellen

1. Wechsle in das Pages-Verzeichnis:
   ```bash
   cd /frontend/src/app/Pages
   ```
   **Wichtig:** Falls der Ordner noch nicht existiert, musst du ihn zuerst anlegen.

2. Erstelle die benötigten Seiten-Komponenten mit dem Angular CLI:
   ```bash
   ng g c LoginPage
   ng g c RegisterPage
   ng g c TasksPage
   ```
   Diese Befehle generieren automatisch die notwendigen Dateien für die Login-, Registrierungs- und Aufgaben-Seiten.

## Konfigurationsdatei `config.ts` erstellen

In diesem Schritt erstellen wir eine zentrale Konfigurationsdatei für unsere Anwendung. Diese Datei enthält wichtige Einstellungen, die wir an verschiedenen Stellen im Projekt benötigen.

1. Erstelle einen neuen Ordner `utils` im Verzeichnis `/src/app/`, falls dieser noch nicht existiert.

2. Erstelle eine neue Datei `config.ts` im Ordner `utils` mit folgendem Inhalt:

## Service

### 1. Login-Service (`LoginPage.services.ts`)

Der Login-Service ist für die Authentifizierung der Benutzer zuständig. Er enthält folgende Hauptfunktionen:

- `@Injectable`: Diese Dekoration macht den Service in der gesamten Anwendung verfügbar (Dependency Injection).
- `login(...)`: Diese Methode führt die Anmeldung durch. Sie sendet die Benutzerdaten an den Server und speichert den erhaltenen Token.
- `isValidToken()`: Überprüft, ob der gespeicherte Token noch gültig ist.

```ts
import { Injectable } from "@angular/core";
import axios from "axios";
import { BEURL, TOKEN } from "../../utils/config";

@Injectable({
  providedIn: "root",
})
export class LoginPageService {
  constructor() {}
  async login(userData: { email: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${BEURL}/auth/login`, userData);
      localStorage.setItem("token", response.data.err.token);
      // alert(response.data.message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.err.error || "Registration failed");
        throw error.response.data;
      } else {
        alert("An unexpected error occurred during registration");
        throw error;
      }
    }
  }
  async isValidToken() {
    const token = TOKEN();
    const response = await axios.get(`${BEURL}/auth/isValidToken`, token);
    return response;
  }
}
```

### RegisterPage-Service (`RegisterPage.services.ts`)

Der RegisterPage-Service ist für die Benutzerregistrierung zuständig. Er bietet folgende Hauptfunktionen:

- `@Injectable`: Diese Dekoration ermöglicht die Verwendung des Services in der gesamten Anwendung durch Dependency Injection
- `register(...)`: Diese Methode übermittelt die Registrierungsdaten an den Server und speichert den erhaltenen Authentifizierungstoken

#### 2. RegisterPage Service

```ts
import { Injectable } from "@angular/core";
import axios from "axios";
import { BEURL } from "../../utils/config";

@Injectable({
  providedIn: "root",
})
export class RegisterPageService {
  constructor() {}
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const response = await axios.post(`${BEURL}/auth/register`, userData);
      localStorage.setItem("token", response.data.err.token);
      // alert(response.data.message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.err.error || "Registration failed");
        throw error.response.data;
      } else {
        alert("An unexpected error occurred during registration");
        throw error;
      }
    }
  }
}
```

### TasksPage-Service (`TasksPage.services.ts`)

Der TasksPage-Service verwaltet alle Aufgaben-bezogenen Operationen in der Anwendung. Er stellt folgende Hauptfunktionen bereit:

- `@Injectable`: Diese Dekoration macht den Service in der gesamten Anwendung verfügbar
- `TOKEN()`: Ruft das Authentifizierungs-Token ab, um geschützte API-Endpunkte aufzurufen
- `getTasks()`: Lädt alle Aufgaben vom Server
- `createTask(...)`: Erstellt eine neue Aufgabe
- `updateTask(...)`: Aktualisiert eine bestehende Aufgabe
- `deleteTask(...)`: Löscht eine Aufgabe anhand ihrer ID

---

#### 3. TasksPage Service

```ts
import { Injectable } from "@angular/core";
import axios from "axios";
import { BEURL, TOKEN } from "../../utils/config";
import { ITasks } from "@fullstack/to_do_list";

@Injectable({
  providedIn: "root",
})
export class TasksPageService {
  token: any;
  constructor() {
    this.token = TOKEN();
  }

  async getTasks() {
    try {
      const response = await axios.get(`${BEURL}/tasks/task`, this.token);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async createTask(taskData: ITasks) {
    try {
      const response = await axios.post(
        `${BEURL}/tasks/task`,
        taskData,
        this.token
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async updateTask(taskId: string, taskData: ITasks) {
    try {
      const response = await axios.post(
        `${BEURL}/tasks/task/${taskId}`,
        taskData,
        this.token
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const response = await axios.delete(
        `${BEURL}/tasks/task/${taskId}`,
        this.token
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}
```

## Pages `login-page`

- **Reactive Forms**: Das Login-Formular wird mit `FormBuilder` und `FormGroup` aufgebaut. Diese Methode erlaubt präzise Kontrolle über Validierung und Fehlerbehandlung.
- **Formularbindung**: Mit `[formGroup]`, `formControlName` und Angular-Direktiven (`*ngIf`, `[ngClass]`) werden Eingabefelder mit der Logik im TypeScript-Code verknüpft.
- **Validierung**: Angular prüft direkt im Template, ob Felder gültig sind (`Validators.required`, `Validators.email`) und zeigt entsprechende Fehlermeldungen an.
- **Dependency Injection**: Der `LoginPageService` wird über den Konstruktor eingebunden (Angular DI).
- **Routenwechsel & Service-Aufruf**: Beim Absenden wird der Login-Service aufgerufen. Bei Erfolg wird die Seite über `location.reload()` aktualisiert, um den Auth-Status neu zu laden.

---

1. html

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card my-5">
        <div class="card-header bg-primary text-white">
          <h3 class="text-center">Login</h3>
        </div>
        <div class="card-body">
          <form [formGroup]="loginForm" (ngSubmit)="onLoginSubmit()">
            <div class="mb-3">
              <label for="login-email" class="form-label">Email Adresse</label>
              <input
                type="email"
                class="form-control"
                id="login-email"
                formControlName="email"
                name="email"
                [ngClass]="{'is-invalid': loginForm.get('email')?.invalid && (loginForm.get('email')?.dirty || loginForm.get('email')?.touched)}"
              />
              <div
                *ngIf="loginForm.get('email')?.invalid && (loginForm.get('email')?.dirty || loginForm.get('email')?.touched)"
                class="invalid-feedback"
              >
                <div *ngIf="loginForm.get('email')?.errors?.['required']">
                  Email ist erforderlich
                </div>
                <div *ngIf="loginForm.get('email')?.errors?.['email']">
                  Bitte geben Sie eine gültige Email-Adresse ein
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="login-password" class="form-label">Passwort</label>
              <input
                type="password"
                class="form-control"
                id="login-password"
                formControlName="password"
                name="password"
                [ngClass]="{'is-invalid': loginForm.get('password')?.invalid && (loginForm.get('password')?.dirty || loginForm.get('password')?.touched)}"
              />
              <div
                *ngIf="loginForm.get('password')?.invalid && (loginForm.get('password')?.dirty || loginForm.get('password')?.touched)"
                class="invalid-feedback"
              >
                <div *ngIf="loginForm.get('password')?.errors?.['required']">
                  Passwort ist erforderlich
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              [disabled]="!loginForm.valid"
            >
              Login
            </button>
          </form>
          <div class="text-center mt-3">
            <a routerLink="/register">Noch keinen Account? Registrieren</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

2. TypeScript

```TypeScript
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginPageService } from './login-page..service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginPageService: LoginPageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onLoginSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    await this.loginPageService.login(this.loginForm.value);
    location.reload()
  }

  get f() {
    return this.loginForm.controls;
  }
}

```

## Pages `register-page`

- **Reactive Forms**: Das Registrierungsformular verwendet Angulars `ReactiveFormsModule` für präzise Steuerung und Validierung.
- **Cross-Field-Validation**: Über das `FormGroup` wird eine benutzerdefinierte Validierung eingebunden, um z. B. zu prüfen, ob `password` und `confirmPassword` übereinstimmen.
- **Fehlermeldungen im Template**: Mit Angular-Direktiven wie `*ngIf` und `[ngClass]` werden dynamisch Fehlermeldungen angezeigt.
- **Service Layer**: Die Registrierung wird in einem eigenen Angular-Service (`RegisterPageService`) über `axios` ausgeführt – das entkoppelt Logik vom UI.
- **DI (Dependency Injection)**: Der Service wird über den Konstruktor eingebunden – das ist Standard in Angular für testbare und modulare Architektur.

---

1. html

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card my-5">
        <div class="card-header bg-success text-white">
          <h3 class="text-center">Registrieren</h3>
        </div>
        <div class="card-body">
          <form [formGroup]="registerForm" (ngSubmit)="onRegisterSubmit()">
            <div class="mb-3">
              <label for="register-name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="register-name"
                formControlName="name"
                name="name"
                [ngClass]="{'is-invalid': registerForm.get('name')?.invalid && (registerForm.get('name')?.dirty || registerForm.get('name')?.touched || submitted)}"
              />
              <div
                *ngIf="
                  registerForm.get('name')?.invalid &&
                  (registerForm.get('name')?.dirty ||
                    registerForm.get('name')?.touched ||
                    submitted)
                "
                class="invalid-feedback"
              >
                <div *ngIf="registerForm.get('name')?.errors?.['required']">
                  Name ist erforderlich
                </div>
                <div *ngIf="registerForm.get('name')?.errors?.['minlength']">
                  Name muss mindestens 3 Zeichen lang sein
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="register-email" class="form-label"
                >Email Adresse</label
              >
              <input
                type="email"
                class="form-control"
                id="register-email"
                formControlName="email"
                name="email"
                [ngClass]="{
                  'is-invalid':
                    registerForm.get('email')?.invalid &&
                    (registerForm.get('email')?.dirty ||
                      registerForm.get('email')?.touched ||
                      submitted)
                }"
              />
              <div
                *ngIf="
                  registerForm.get('email')?.invalid &&
                  (registerForm.get('email')?.dirty ||
                    registerForm.get('email')?.touched ||
                    submitted)
                "
                class="invalid-feedback"
              >
                <div *ngIf="registerForm.get('email')?.errors?.['required']">
                  Email ist erforderlich
                </div>
                <div *ngIf="registerForm.get('email')?.errors?.['email']">
                  Bitte geben Sie eine gültige Email-Adresse ein
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="register-password" class="form-label">Passwort</label>
              <input
                type="password"
                class="form-control"
                id="register-password"
                formControlName="password"
                name="password"
                [ngClass]="{
                  'is-invalid':
                    registerForm.get('password')?.invalid &&
                    (registerForm.get('password')?.dirty ||
                      registerForm.get('password')?.touched ||
                      submitted)
                }"
              />
              <div
                *ngIf="
                  registerForm.get('password')?.invalid &&
                  (registerForm.get('password')?.dirty ||
                    registerForm.get('password')?.touched ||
                    submitted)
                "
                class="invalid-feedback"
              >
                <div *ngIf="registerForm.get('password')?.errors?.['required']">
                  Passwort ist erforderlich
                </div>
                <div
                  *ngIf="registerForm.get('password')?.errors?.['minlength']"
                >
                  Passwort muss mindestens 6 Zeichen lang sein
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="register-confirm-password" class="form-label"
                >Passwort bestätigen</label
              >
              <input
                type="password"
                class="form-control"
                id="register-confirm-password"
                formControlName="confirmPassword"
                name="confirmPassword"
                [ngClass]="{'is-invalid': (registerForm.get('confirmPassword')?.invalid || registerForm.errors?.['passwordMismatch']) && (registerForm.get('confirmPassword')?.dirty || registerForm.get('confirmPassword')?.touched || submitted)}"
              />
              <div
                *ngIf="(registerForm.get('confirmPassword')?.invalid || registerForm.errors?.['passwordMismatch']) && (registerForm.get('confirmPassword')?.dirty || registerForm.get('confirmPassword')?.touched || submitted)"
                class="invalid-feedback"
              >
                <div
                  *ngIf="registerForm.get('confirmPassword')?.errors?.['required']"
                >
                  Passwortbestätigung ist erforderlich
                </div>
                <div *ngIf="registerForm.errors?.['passwordMismatch']">
                  Passwörter stimmen nicht überein
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-success w-100"
              [disabled]="registerForm.invalid && submitted"
            >
              Registrieren
            </button>
          </form>
          <div class="text-center mt-3">
            <a routerLink="/login">Bereits registriert? Login</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

2. ts

```ts
import { Injectable } from "@angular/core";
import axios from "axios";
import { BEURL } from "../../utils/config";

@Injectable({
  providedIn: "root",
})
export class RegisterPageService {
  constructor() {}
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const response = await axios.post(`${BEURL}/auth/register`, userData);
      localStorage.setItem("token", response.data.err.token);
      // alert(response.data.message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.err.error || "Registration failed");
        throw error.response.data;
      } else {
        alert("An unexpected error occurred during registration");
        throw error;
      }
    }
  }
}
```

## Pages `tasks-page`

### 1. HTML (Template)

Das HTML definiert die Struktur der Seite, einschließlich:

- **Aufgabenanzeige**: Durch `*ngFor` werden die Aufgaben dynamisch angezeigt.
- **Ladezustand**: Zeigt einen Ladeindikator während des Ladens der Aufgaben.
- **Fehlerzustand**: Zeigt eine Fehlermeldung, falls ein Fehler auftritt.
- **Floating Button**: Ein "+"-Button zum Hinzufügen neuer Aufgaben.
- **Dialog**: Ein Formular zum Erstellen einer neuen Aufgabe.

```html
<div class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1>📝 Erweiterte TODO-Liste</h1>
    <button class="btn btn-outline-danger" (click)="logout()">
      <i class="bi bi-box-arrow-right"></i> Logout
    </button>
  </div>
  <div *ngIf="isLoading" class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div *ngIf="error" class="alert alert-danger" role="alert">{{ error }}</div>

  <div *ngIf="!isLoading && !error" class="row" id="taskContainer">
    <div class="col-md-6">
      <h3 class="mb-3 text-danger">⚡ Nicht erledigt</h3>
      <div id="pendingTasks">
        <app-task-card
          *ngFor="let task of pendingTasks"
          [task]="task"
          (toggleComplete)="onToggleComplete(task._id)"
          (delete)="onDeleteTask(task._id)"
        >
        </app-task-card>
      </div>
    </div>

    <div class="col-md-6">
      <h3 class="mb-3 text-success">✅ Erledigt</h3>
      <div id="completedTasks">
        <app-task-card
          *ngFor="let task of completedTasks"
          [task]="task"
          (toggleComplete)="onToggleComplete(task._id)"
          (delete)="onDeleteTask(task._id)"
        >
        </app-task-card>
      </div>
    </div>
  </div>

  <button class="btn btn-primary add-btn" (click)="showAddTaskDialog()">
    <i class="bi bi-plus"></i>
  </button>

  <app-add-task
    *ngIf="showAddDialog"
    (save)="onTaskSaved($event)"
    (cancel)="onAddTaskCanceled()"
  >
  </app-add-task>
</div>
```

### 2. TypeScript (Service)

Der Service `TasksPageService` enthält Methoden für die Interaktion mit dem Backend:

- **getTasks()**: Holt die Aufgaben vom Server.
- **createTask()**: Erstellt eine neue Aufgabe.
- **updateTask()**: Aktualisiert eine bestehende Aufgabe.
- **deleteTask()**: Löscht eine Aufgabe.
- **Axios**: Wird verwendet, um HTTP-Anfragen durchzuführen.

```ts
import { Injectable } from "@angular/core";
import axios from "axios";
import { BEURL, TOKEN } from "../../utils/config";
import { ITasks } from "@fullstack/to_do_list";

@Injectable({
  providedIn: "root",
})
export class TasksPageService {
  token: any;
  constructor() {
    this.token = TOKEN();
  }

  async getTasks() {
    try {
      const response = await axios.get(`${BEURL}/tasks/task`, this.token);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async createTask(taskData: ITasks) {
    try {
      const response = await axios.post(
        `${BEURL}/tasks/task`,
        taskData,
        this.token
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async updateTask(taskId: string, taskData: ITasks) {
    try {
      const response = await axios.post(
        `${BEURL}/tasks/task/${taskId}`,
        taskData,
        this.token
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const response = await axios.delete(
        `${BEURL}/tasks/task/${taskId}`,
        this.token
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}
```

## Authentifizierungs-Guards (`src/app/auth.guard.ts`)

In diesem Teil des Projekts lernst du, wie du den Zugriff auf verschiedene Seiten deiner Angular-Anwendung steuern kannst. Dafür werden sogenannte "Guards" verwendet - das sind spezielle Klassen, die vor dem Laden einer Seite ausgeführt werden.

### 1. TaskAuthGuard - Schutz für eingeloggte Benutzer

Dieser Guard sorgt dafür, dass nur Benutzer mit gültiger Anmeldung auf geschützte Seiten zugreifen können.

**So funktioniert es:**
- Der Guard prüft, ob ein gültiger Login-Token vorhanden ist
- Wenn ja: Die Seite wird angezeigt
- Wenn nein: Der Benutzer wird zur Login-Seite weitergeleitet

### 2. NoAuthGuard - Schutz für nicht angemeldete Benutzer

Dieser Guard verhindert, dass bereits angemeldete Benutzer auf Login- oder Registrierungsseiten zugreifen.

**Funktionsweise:**
- Prüft, ob der Benutzer bereits angemeldet ist
- Bei nicht angemeldeten Benutzern: Zugriff wird gewährt
- Bei angemeldeten Benutzern: Weiterleitung zur Startseite

```ts
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginPageService } from "./Pages/login-page/login-page..service";

@Injectable({
  providedIn: "root",
})
export class TaskAuthGuard implements CanActivate {
  constructor(
    private loginPageService: LoginPageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      const token = (await this.loginPageService.isValidToken()).data;
      if (token.status) {
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    } catch (error) {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private loginPageService: LoginPageService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem("token");

    try {
      const tokenstatus = (await this.loginPageService.isValidToken()).data;

      if (!tokenstatus.status || !token) {
        return true;
      }

      this.router.navigate(["/"]);
      return false;
    } catch (error) {
      return !token;
    }
  }
}
```

## Routing-Konfiguration in `src/app/app.routes.ts`

In diesem Schritt richten wir die Navigation zwischen den verschiedenen Seiten unserer Anwendung ein. Die Routing-Konfiguration legt fest, welche Komponente bei welcher URL angezeigt wird und welche Zugriffsrechte gelten.

```ts
import { Routes } from "@angular/router";
import { LoginPageComponent } from "./Pages/login-page/login-page.component";
import { RegisterPageComponent } from "./Pages/register-page/register-page.component";
import { TasksPageComponent } from "./Pages/tasks-page/tasks-page.component";
import { NoAuthGuard, TaskAuthGuard } from "./auth.guard";

export const routes: Routes = [
  { path: "", component: TasksPageComponent, canActivate: [TaskAuthGuard] },
  { path: "login", component: LoginPageComponent, canActivate: [NoAuthGuard] },
  {
    path: "register",
    component: RegisterPageComponent,
    canActivate: [NoAuthGuard],
  },
  { path: "**", redirectTo: "" },
];
```
