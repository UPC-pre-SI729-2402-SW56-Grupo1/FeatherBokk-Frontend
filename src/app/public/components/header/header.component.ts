import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventDataService, User } from '../../../shared/services/http-common.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, TranslateModule],
})
export class HeaderComponent implements OnInit {
  menuOpen: boolean = false;
  isAuthenticated: boolean = false;
  username: string | null = null;

  constructor(private authService: EventDataService, private router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  checkAuthentication() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.authService.getAuthenticatedUser().subscribe((user: User | null) => {
        this.username = user?.username || 'Usuario';
      });
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.username = null;
    this.router.navigate(['/login']);
  }
}
