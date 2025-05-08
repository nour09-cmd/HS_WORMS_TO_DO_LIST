import { Routes } from '@angular/router';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { TasksPageComponent } from './Pages/tasks-page/tasks-page.component';
import { NoAuthGuard, TaskAuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: TasksPageComponent ,canActivate: [TaskAuthGuard]},
  { path: 'login', component: LoginPageComponent ,canActivate: [NoAuthGuard]},
  { path: 'register', component: RegisterPageComponent ,canActivate: [NoAuthGuard]},
  { path: '**', redirectTo: '' }
];
