import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload } from '../models/model';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpHeaders: HttpHeaders;
  private userPayloadSubject$ = new BehaviorSubject<JwtPayload | null>(null);
  userPayload$ = this.userPayloadSubject$.asObservable();

  constructor(private http: HttpClient, private router: Router) {

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  set userPayloadSubject(payload: any) {
    this.userPayloadSubject$.next(payload);

  }

  signin(userCredentials: { email: string, password: string }) {
    return this.http.post('http://localhost:8000/login', userCredentials, { headers: this.httpHeaders });
  }

  loginSuccessful(accessToken: string, refreshToken: string) {
    console.log("Login successful");
    localStorage.setItem('isLoggedIn', true.toString());
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken); // Assuming you don't have a refresh token for now

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    this.router.navigate(['/home']);
  }

  getPayload(): JwtPayload | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

}
