import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdmitFormDialogComponent } from './admit-form-dialog/admit-form-dialog.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule,
    MatProgressBarModule, MatToolbarModule,
    MatIconModule, MatButtonModule, RouterLink, RouterOutlet,
    FormsModule,
    MatButtonModule,
   ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {

  readonly dialog = inject(MatDialog);


  constructor(public router: Router) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdmitFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }





}
