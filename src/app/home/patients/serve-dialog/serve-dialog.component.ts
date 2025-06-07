import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { PatientService } from '../services/patient.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-serve-dialog',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatCardModule,
    MatNativeDateModule, CommonModule],
  templateUrl: './serve-dialog.component.html',
  styleUrl: './serve-dialog.component.scss'
})
export class ServeDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ServeDialogComponent>);
  patientForm!: FormGroup;
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  beds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      bedNumber: [''],
      patientId: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      priority: [{ value: '' }],
      dateOfBirth: [{ value: '', disabled: true }],
      bloodGroup: [{ value: '', disabled: true }],
      emergencyContact: [{ value: '', disabled: true }],
      medicalHistory: [{ value: '', disabled: true }],
      initialSymptoms: [{ value: '', disabled: true }],
      remark: ['', Validators.required],
      remarks: this.fb.array([])     // array of form groups

    });

  }

  ngOnInit(): void {

    this.patientService.getPriorityPatient().subscribe({
      next: (data: any) => {
        console.log(data, "priority Patient");
        this.patientForm.patchValue({
          bedNumber: data.patient.bedNumber,
          patientId: data.patient.patientId,
          firstName: data.patient.firstName,
          lastName: data.patient.lastName,
          priority: data.patient.priority,
          dateOfBirth: data.patient.dateOfBirth,
          bloodGroup: data.patient.bloodGroup,
          emergencyContact: data.patient.emergencyContact,
          medicalHistory: data.patient.medicalHistory,
          initialSymptoms: data.patient.initialSymptoms,


        })
        const remarksArray = this.patientForm.get('remarks') as FormArray;
        data.patient.remarks.forEach((remark: any) => {
          remarksArray.push(this.createRemark(remark));
        });

        console.log("patient form inside serve", this.patientForm.value)

      },
      error: (err) => {
        console.error(err.message);
      },
    })

    this.patientForm.get('bedNumber')?.valueChanges.subscribe(bedNumber => {
      this.patientService.getPatientByBed(bedNumber).subscribe({
        next: (data: any) => {
          this.patientForm.patchValue({
            patientId: data.patient.patientId,
            firstName: data.patient.firstName,
            lastName: data.patient.lastName,
            priority: data.patient.priority,
            dateOfBirth: data.patient.dateOfBirth,
            bloodGroup: data.patient.bloodGroup,
            emergencyContact: data.patient.emergencyContact,
            medicalHistory: data.patient.medicalHistory,
            initialSymptoms: data.patient.initialSymptoms,

          });

          const remarksArray = this.patientForm.get('remarks') as FormArray;
          data.patient.remarks.forEach((remark: any) => {
            remarksArray.push(this.createRemark(remark));
          });
          console.log(this.patientForm.value, " After changing bed number");

        },
        error: (err) => {
          console.error(err.message);
        }
      })


    }
    )
  }

  createRemark(remark: any) {
    return this.fb.group({
      note: [{ value: remark.note || '', disabled: true }],
      servedAt: [remark.servedAt || ''],
      servedBy: [remark.servedBy || '']
    });
  }

  get remarks(): FormArray {
    return this.patientForm.get('remarks') as FormArray;
  }
  cancel(): void {
    this.dialogRef.close('cancel');
  }

}
