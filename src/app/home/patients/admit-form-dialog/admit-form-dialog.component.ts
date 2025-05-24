import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';





@Component({
  selector: 'app-admit-form-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatCardModule,
    MatNativeDateModule],
  templateUrl: './admit-form-dialog.component.html',
  styleUrl: './admit-form-dialog.component.scss'
})
export class AdmitFormDialogComponent {

  readonly dialogRef = inject(MatDialogRef<AdmitFormDialogComponent>);
  patientForm!: FormGroup;
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];



  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],
      address: [''],
      bloodGroup: [''],
      emergencyContact: ['', Validators.pattern(/^[0-9]{10}$/)],
      medicalHistory: ['']
    });

  }
  cancel(): void {
    this.dialogRef.close('cancel');
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;
      console.log('Admitted Patient:', patientData);
      // Send patientData to a service or backend here
    } else {
      this.patientForm.markAllAsTouched();
    }
  }



}
