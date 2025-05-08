import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginPageService } from './Pages/login-page/login-page..service';

@Injectable({
  providedIn: 'root'
})
export class TaskAuthGuard implements CanActivate {
  constructor(private loginPageService:LoginPageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const token = (await this.loginPageService.isValidToken()).data;
      if (token.status) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

@Injectable({
  providedIn: 'root'
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

      this.router.navigate(['/']);
      return false;

    } catch (error) {
      return !token;
    }
  }
}
