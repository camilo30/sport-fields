import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const logged = this.authService.loggedIn();
    if (logged) {

      let user;
      let role;

      if (route.data.role) {
      this.authService.getLogged().subscribe( res => {
        user = res;
        role = user.role.name;
        if (user.role.name !== route.data.role) {
          this.router.navigate(['/signin']);
          return false;
        }
      });
    }

      return true;
    }
    this.router.navigate(['/signin']);
    return false;

  }

}
