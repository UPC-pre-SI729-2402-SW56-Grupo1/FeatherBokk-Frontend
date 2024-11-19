import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword: boolean = true;

  constructor(private router: Router, private userDataService: UserDataService) {}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    this.userDataService.loginUser({ email, password }).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
