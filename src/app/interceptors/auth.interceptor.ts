import { HttpClient, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  // console.log("Auth Interceptor: token =", token);

  // Skip auth for login or public URLs
  if (req.url.includes('login')||req.url.includes('accessToken')) {
    return next(req);
  }

  if (!token || isTokenExpired(token)) {
    if (!refreshToken) {
      localStorage.setItem('isLoggedIn', 'false');
      router.navigate(['/signin']);
      return EMPTY;
    }
   const refreshHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Refresh token call
    return http.post<any>(
      'http://localhost:8000/accessToken',
      { refreshToken },
      { headers: refreshHeaders }
    ).pipe(
      switchMap((response) => {
        const newAccessToken = response.accessToken;

        // Save new tokens
        localStorage.setItem('accessToken', newAccessToken);
        

        // Retry the original request with new token
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newAccessToken}`
          }
        });

        return next(clonedReq);
      }),
      catchError(() => {
        // Refresh failed
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.navigate(['/signin']);
        return EMPTY;
      })
    );
  }

  // If token is valid, attach it to request
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};


function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    const expiry = decoded.exp;
    return (Math.floor(Date.now() / 1000) >= expiry);
  } catch (e) {
    return true; // Treat malformed token as expired
  }
}