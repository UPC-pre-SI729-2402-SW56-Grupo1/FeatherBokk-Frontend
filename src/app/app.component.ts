import { Component } from '@angular/core';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SubscriptionPlansComponent],  // Importa el componente aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mi-aplicacion';
}
