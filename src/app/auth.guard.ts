import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EventDataService } from './shared/services/http-common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: EventDataService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
