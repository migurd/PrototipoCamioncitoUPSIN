import { Component } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {


  constructor(
    private authService: AuthService,
  ){}

  get user(): User | undefined {
    return this.authService.currentUser;
  }
}
