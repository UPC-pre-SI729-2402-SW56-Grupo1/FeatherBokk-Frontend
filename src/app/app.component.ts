import { Component } from '@angular/core';
import { RouterModule, Router  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "./public/components/header/header.component";
import { FooterComponent } from "./public/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FeatherBook-Frontend';

  constructor(private router: Router) {}

  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
