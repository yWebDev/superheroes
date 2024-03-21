import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../core/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthenticateService, private router: Router) {
  }

  submit(data: { email: string, password: string }) {
    this.authService.login(data).subscribe((data) => {
      this.router.navigate(['anti-heroes']);
      localStorage.setItem('token', data.token);
    });
  }
}
