import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hidePassword: boolean = true;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const username = (form.querySelector('#username') as HTMLInputElement).value;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const phone = (form.querySelector('#phone') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);

    if (username && email && phone && password) {
      this.router.navigate(['/home']);
    } else {
      console.log('Por favor, completa todos los campos');
    }
  }
}
