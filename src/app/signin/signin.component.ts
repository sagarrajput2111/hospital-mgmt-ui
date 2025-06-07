import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatFormField, MatLabel, RouterLink, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  loginForm: FormGroup;

  constructor(formbuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = formbuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]

    })

  }

    submit() {
      if (this.loginForm.valid) {
        this.authService.signin(this.loginForm.value).subscribe({
          next: (response:any) => {
            console.log("Login successful", response);

            this.authService.loginSuccessful(response.accessToken,response.refreshToken);

            // Handle successful login, e.g., redirect to dashboard
          },
          error: (error) => {

            console.error("Login failed", error);
            alert("Login failed, please check your credentials and try again.");
            // Handle login error, e.g., show an error message
          }
        });
      }
      else{
      this.loginForm.markAllAsTouched();
      alert("Please fill in all required fields correctly.");
      }

    }

   
  
}
