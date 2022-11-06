import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        tap(() => {}),
        catchError( error => {
            if(error.status === 401) { //Unauthorized
                localStorage.clear();
                location.reload(); // When the guard checks that there is no token, It redirects to login
            }
            return throwError(error.message)
        })
    );
  }
}