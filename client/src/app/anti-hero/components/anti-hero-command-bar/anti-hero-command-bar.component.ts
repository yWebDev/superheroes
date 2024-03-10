import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandBarActions } from '../../models/anti-hero.interface';

@Component({
  selector: 'app-anti-hero-command-bar',
  templateUrl: './anti-hero-command-bar.component.html',
  styleUrls: ['./anti-hero-command-bar.component.scss']
})
export class AntiHeroCommandBarComponent implements OnInit {
  @Output() action = new EventEmitter<CommandBarActions>();

  constructor() {
  }

  ngOnInit() {
  }

  emitAction(action: CommandBarActions) {
    this.action.emit(action);
  }
}
