import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {

  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'gender', 'isDischarged', 'totalAmount'];
  invoiceList = [];
  dataSource = new MatTableDataSource<any>(this.invoiceList);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private patientService: PatientService) { }

  ngOnInit(): void {

    this.patientService.getAllInvoices().subscribe({
      next: (data: any) => {

        console.log(data);

        this.invoiceList = data.invoices;
        this.dataSource.data=this.invoiceList;


      },
      error: (err) => {
        console.error(err.message);
        alert(err.message);
      }
    })


  }




}
