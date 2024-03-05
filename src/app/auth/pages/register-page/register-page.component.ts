import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})

export class RegisterPageComponent {

  public registerForm =  new FormGroup({
    nombre:              new FormControl<string>(''),
    usuario:             new FormControl<string>(''),
    numeroTelefonico:    new FormControl<string>(''),
    contraseña:          new FormControl<string>(''),
    confirmarContraseña: new FormControl<string>(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ){}

  onRegisterUser(): void {
    if (this.registerForm.valid) {
      const { contraseña, confirmarContraseña } = this.registerForm.value;
      if(contraseña !== confirmarContraseña){
        this.registerForm.patchValue({
          contraseña: '',
          confirmarContraseña: '',
        });
        this.snackBar.open('Las contraseñas no coinciden', 'ok', {
          duration: 2500,
        });
      }
      else{
        const {nombre, usuario, numeroTelefonico, contraseña} = this.registerForm.value;
        if(nombre && usuario && numeroTelefonico && contraseña){
          const newUser:User = {
            nombre,
            usuario,
            contraseña,
            numeroTelefonico,
          }
          this.authService.registerUser(newUser).subscribe(
            (user) => {
              console.log('Usuario registrado exitosamente:', user);
              this.snackBar.open('Te haz registrado exitosamente', 'ok', {
                duration: 2500,
              });
              this.router.navigateByUrl('/alumnos');
            },
            (error) => {
              console.error('Error al registrar usuario:', error);
              this.snackBar.open('Hubo un error al registrarte', 'ok', {
                duration: 2500,
              });
            }
          );
        }
      }
    } else {
      console.error('Formulario no válido. Revise los campos.');
    }
  }
}

