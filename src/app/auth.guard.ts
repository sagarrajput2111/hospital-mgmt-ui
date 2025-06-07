import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  console.log("Auth Guard: isLoggedIn =", isLoggedIn);

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    router.navigate(['/signin']);
    return false;
  }
  return true;
};

export const loginGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  console.log("Login Guard: isLoggedIn =", isLoggedIn);

  if (isLoggedIn) {
    // Redirect to home page if already logged in
    router.navigate(['/home']);
    return false;
  }
  
  return true;
}
