import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./public/components/header/header.component";
import { FooterComponent } from "./public/components/footer/footer.component";
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,SubscriptionPlansComponent],  // Importa el componente aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FeatherBook-Frontend';
}
