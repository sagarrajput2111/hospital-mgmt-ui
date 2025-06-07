import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Patient, PatientDTO } from '../../models/model';
import { PatientService } from '../services/patient.service';
// import {patients} from '../../models/patients'


@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {

  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'gender', 'bedNumber', 'priority'];


  patientList: PatientDTO[] = [];
  dataSource = new MatTableDataSource<PatientDTO>(this.patientList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patientService: PatientService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.patientService.getAllPatients().subscribe({
      next: (response: any) => {
        console.log("Patient list fetched successfully", response);
        this.patientList = response.patients;
        this.dataSource.data = this.patientList;
      },
      error: (error) => {
        console.error("Error fetching patient list", error);
        alert("Error fetching patient list, please try again.");
      }
    });
  }

  patientDetails(patientId: string) {
    // Navigate to the patient details page
    console.log("Navigating to patient details for ID:", patientId);
    this.patientService.getPatientById(patientId).subscribe({
      next: (response: any) => {
        console.log("Patient details fetched successfully", response);
        // You can navigate to a details page here, passing the patient data
        // For example, using Angular Router:
        // this.router.navigate(['/patient-details', patientId], { state: { patient: response.patient } });
      },
      error: (error) => {
        console.error("Error fetching patient details", error);
        alert("Error fetching patient details, please try again.");
      }
    });
    // Implement navigation logic here, e.g., using Angular Router
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
