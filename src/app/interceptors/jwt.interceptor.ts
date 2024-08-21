import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from '../services/state.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(StateService);
  const modifiedReq = state.$token() !== null ? req.clone({ 
    headers: req.headers.set('Authorization', `Bearer ${state.$token()}`),
  }) : req;
  return next(modifiedReq);
};
