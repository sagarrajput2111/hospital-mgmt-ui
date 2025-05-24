import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Patient } from '../../models/model';
import {patients} from '../../models/patients'


@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {

  displayedColumns: string[] = ['registrationId', 'fullName', 'age', 'admitDate', 'dischargeDate', 'address'];


  patientList: Patient[] = patients;
  dataSource = new MatTableDataSource<Patient>(this.patientList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
