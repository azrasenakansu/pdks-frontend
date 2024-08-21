import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const popupService = inject(PopupService);
  const auth = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      let navigateTo : string | null = null;
      let silent = false;
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Client Error: ${error.error.message}`;
      } else if (error.status === 401) {
        // no auth -redirect to login and clear tokens etc.
        auth.logout();
        navigateTo = 'login';
        errorMsg = `Giriş yapmanız gerekiyor.`;
        silent = true;
      } else if (error.status === 403) {
        // forbidden - no permission
        errorMsg = 'Bu işlem için yetkiniz yok.';
      } else {
        errorMsg = `Server Error: ${error.status} - ${JSON.stringify(error.error)} `;
      }
      if (!silent) {
        popupService.errror(errorMsg);
      }
      if (navigateTo !== null){
        router.navigateByUrl(navigateTo, {replaceUrl: true});
      }
      return throwError(() => new Error(errorMsg));
    }),
  );
};
