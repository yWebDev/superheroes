import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {}

  login(data: { email: string, password: string }) : Observable<any> {
    return this.http.post<any>(`${environment.authURL}/authenticate`, data).pipe(
      tap(() => data),
      catchError(err => throwError(() => err))
    )
  }

  register(data: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${environment.authURL}/register`, data).pipe(
      tap(() => data),
      catchError(err => throwError(() => err))
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  doLogout(): void {
    let removeToken = localStorage.removeItem('token');
    if (removeToken === null) {
      this.router.navigate(['login']);
    }
  }
}
