// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService); // Inyecta el servicio usando inject()
  const token = tokenService.getToken();

  if (token) {
    // Clona la solicitud y añade el encabezado de autorización
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Continúa con la solicitud modificada
    return next(authReq);
  }

  // Si no hay token, continúa con la solicitud original
  return next(req);
};
