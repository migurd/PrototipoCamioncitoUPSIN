import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiData = 'http://localhost:3000/usuarios';
  private apiSMS = 'https://api.labsmobile.com/json/send';

  private user?: User;

  constructor(
    private http: HttpClient
  ){}

  get currentUser(): User | undefined {
    if(!this.user) return undefined;
    return this.user;
  }

  login(usuario: string, password: string): Observable<User> | undefined {
    return this.http.get<User>(`${this.apiData}?usuario=${usuario}&contraseña=${password}`).
      pipe(
        tap(user =>{
          this.user = user;
          localStorage.setItem('token', JSON.stringify(user.id));
        }),
      );
  }

  checkAuthStatus(): Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.apiData}/${token}`).
      pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(error => of(false)),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.user = undefined;
  }

  getUserByUserName(usuario: string): Observable<User> {
    return this.http.get<User>(`${this.apiData}?usuario=${usuario}`);
  }

  sendSMS(numero: string, mensaje: string): Observable<any> {
    const body = {
      'message': mensaje,
      'tpoa': 'CamioncitoUPSIN',
      'recipient': numero
    };
    return this.http.post<any>(this.apiSMS, body);
  }
}
