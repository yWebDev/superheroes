import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() loggedIn = false;
  @Output() actionEmitter = new EventEmitter();

  submit(action: string) {
    this.actionEmitter.emit(action);
  }
}
