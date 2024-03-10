import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AntiHero, TableActions } from '../../models/anti-hero.interface';

@Component({
  selector: 'app-anti-hero-list',
  templateUrl: './anti-hero-list.component.html',
  styleUrls: ['./anti-hero-list.component.scss']
})
export class AntiHeroListComponent implements OnInit {
  @Input() headers: Array<{ headerName: string, fieldName: keyof AntiHero }> = [];
  @Input() antiHeroes: Array<AntiHero> = [];
  @Output() antiHero = new EventEmitter<{ antiHero: AntiHero, action: TableActions }>();
  headersFields: string[] = [];

  constructor() {
  }

  ngOnInit() {
    this.getHeadersFields();
  }

  selectAntiHero(antiHero: AntiHero, action: TableActions) {
    this.antiHero.emit({ antiHero, action });
  }

  private getHeadersFields() {
    this.headersFields = this.headers.map(data => data.fieldName);
    this.headersFields.push('actions');
  }
}
