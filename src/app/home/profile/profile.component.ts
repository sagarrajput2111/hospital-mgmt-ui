import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, ReactiveFormsModule, MatCardModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.userForm = formBuilder.group({
      empId: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      dateOfBirth: [{ value: '', disabled: true }],
      contact: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      designation: [{ value: '', disabled: true }]

    })
  }

  ngOnInit(): void {
    this.authService.userPayload$.subscribe({
      next: (data) => {
        console.log(data, "Inside profile")
        this.userForm.patchValue({
          empId: data?.empId,
          firstName: data?.firstName,
          lastName: data?.lastName,
          dateOfBirth: data?.dateOfBirth,
          contact: data?.contact,
          email: data?.email,
          address: data?.address,
          designation: data?.designation,

        })

      },
      error: (err) => {
        console.error(err.message);
      }
    })
  }



}
