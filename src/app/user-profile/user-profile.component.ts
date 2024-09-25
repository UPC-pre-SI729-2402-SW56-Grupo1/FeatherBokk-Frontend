import { Component } from '@angular/core';
import {HeaderComponent} from "../public/components/header/header.component";
import {FooterComponent} from "../public/components/footer/footer.component";

@Component({
  selector: 'app-user-profile', // Asegúrate de que el selector sea 'app-user-profile'
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  standalone: true
})
export class UserProfileComponent {}
