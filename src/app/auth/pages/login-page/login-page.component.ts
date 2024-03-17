import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  // public loginForm = new FormGroup({
  //   usuario:    new FormControl<string>(''),
  //   contraseña: new FormControl<string>(''),
  // });

  public loginForm = this.fb.group({
    usuario: ['', Validators.required],
    contraseña: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ){}

  onLogin(): void{
    const { usuario, contraseña } = this.loginForm.value;
    if( usuario?.trim() && contraseña?.trim() ){
      this.authService.login(usuario!, contraseña!)
        ?.subscribe( users => {
          if(users.length > 0){
            this.router.navigateByUrl('/alumnos');
            this.snackBar.open('Haz ingresado correctamente', 'ok', {
              duration: 2500,
            });
          }else{
            this.snackBar.open('Cuenta inexsistente', undefined, {
              duration: 2500,
            });
            this.loginForm.reset({
              usuario: this.loginForm.value.usuario,
              contraseña: '',
            });
          }
        });
    }else{
      this.snackBar.open('Debes ingresar tus datos', undefined, {
        duration: 2500,
      });
    }
  }
}
