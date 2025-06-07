import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hospital-mgmt-ui';

  constructor(private authService: AuthService) { }
  ngOnInit(): void {

    console.log("This is the jwt payload", this.authService.getPayload())
    this.authService.userPayloadSubject=this.authService.getPayload();


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
