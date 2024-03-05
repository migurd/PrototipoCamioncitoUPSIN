import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  public loginForm = new FormGroup({
    usuario:    new FormControl<string>(''),
    contraseña: new FormControl<string>(''),
  });

  constructor(
    private authService: AuthService,
  ){

  }

  onLogin(): void{
    this.authService.login
  }
}
