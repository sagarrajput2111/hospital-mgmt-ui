import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    MatSidenavModule, MatListModule,
    RouterLink,CommonModule
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  selected = '';
  menuOpen = false;
  userPayload!:Observable<any>;
  constructor(public router:Router,public authService:AuthService){}
  
  ngOnInit(): void {
    
    this.userPayload=this.authService.userPayload$;
  }


  selectOption(option: string) {
    this.selected = option;
    this.menuOpen = false; // Close menu on selection
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
