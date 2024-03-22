import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticateService } from './core/services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'superheroes';
  url = '';

  constructor(private authService: AuthenticateService, private router: Router) {
    this.getRoute();
  }

  submit(action: string): void {
    switch (action) {
      case 'logout':
        this.authService.doLogout();
        break;
      default:
        break;
    }
  }

  getRoute(): void {
    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.url = data.url;
      }
    })
  }
}
