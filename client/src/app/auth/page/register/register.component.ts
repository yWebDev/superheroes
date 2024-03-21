import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../core/services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  error: string = '';

  constructor(private authService: AuthenticateService, private router: Router) {
  }

  submit(data: User) {
    this.authService.register(data).subscribe(data => {
      this.router.navigate(['/']);
    })
  }

}
