import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    MatSidenavModule, MatListModule,
    RouterLink
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public router:Router){}

  selected = 'Home';
  menuOpen = false;

  selectOption(option: string) {
    this.selected = option;
    this.menuOpen = false; // Close menu on selection
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
