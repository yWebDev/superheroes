import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) {}

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
}
