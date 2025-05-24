import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatFormField,MatLabel,RouterLink,ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  loginForm: FormGroup;

  constructor(formbuilder: FormBuilder) {
    this.loginForm = formbuilder.group({
      email: [""],
      password: [""]

    })

  }

  submit() {
    throw new Error('Method not implemented.');
    }

}
