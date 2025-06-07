import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  admitPatient(patientData: any) {
    return this.http.post('http://localhost:8000/patient/admit', patientData, { headers: this.httpHeaders });
  }

  cleanObject(obj: any): any {
    const result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== null && value !== '' && value !== undefined) {
          result[key] = value;
        }
      }
    }
    return result;
  }

  getAllPatients() {
    return this.http.get('http://localhost:8000/patient/all-patients', { headers: this.httpHeaders });
  }

  getPatientById(patientId: string) {
    return this.http.get(`http://localhost:8000/patient/${patientId}`, { headers: this.httpHeaders });
  }

  getAllInvoices() {
    return this.http.get('http://localhost:8000/patient/invoices', { headers: this.httpHeaders });
  }

  getPriorityPatient() {
    return this.http.get('http://localhost:8000/patient/priority-patient', { headers: this.httpHeaders });
  }

  getPatientByBed(bedNumber: string) {
    return this.http.get(`http://localhost:8000/patient/patientByBed?bedNumber=${bedNumber}`, { headers: this.httpHeaders });


  }
}
