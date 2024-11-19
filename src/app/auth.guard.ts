import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserDataService } from './shared/services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserDataService) {}

  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
