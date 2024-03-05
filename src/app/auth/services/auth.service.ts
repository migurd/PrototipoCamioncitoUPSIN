import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiData = 'http://localhost:3000/usuarios';
  private apiSMS = 'https://rest.clicksend.com/v3/';
  private apiSMSKey = '3C408D16-DB9C-650E-A322-FB4E5EC2E348';

  private user?: User;

  constructor(
    private http: HttpClient,
  ){}

  get currentUser(): User | undefined {
    if(!this.user) return undefined;
    return this.user;
  }

  login(usuario: string, password: string): Observable<User[]> | undefined {
    return this.http.get<User[]>(`${this.apiData}?usuario=${usuario}&contraseña=${password}`).
      pipe(
        tap(users =>{
          if(users.length > 0){
            this.user = users[0];
            localStorage.setItem('token', JSON.stringify(this.user.id));
          }
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

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiData, user)
      .pipe(
        tap(newUser => {
          this.user = newUser;
          localStorage.setItem('token', JSON.stringify(newUser.id));
        })
      );
  }


}
