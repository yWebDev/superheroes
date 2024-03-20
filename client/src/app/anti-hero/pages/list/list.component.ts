import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AntiHero, CommandBarActions, TableActions } from '../../models/anti-hero.interface';
import {
  getAntiHeroList,
  removeAntiHeroApi,
} from '../../state/anti-hero.actions';
import { selectAntiHeroes } from '../../state/anti-hero.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  antiHeroes: ReadonlyArray<AntiHero> = [
    {
      id: '1',
      firstName: 'Eddie',
      lastName: 'Brock',
      house: 'New York',
      knownAs: 'Venom'
    }
  ];
  headers: { headerName: string, fieldName: keyof AntiHero }[] = [
    { headerName: 'First Name', fieldName: 'firstName' },
    { headerName: 'Last Name', fieldName: 'lastName' },
    { headerName: 'House', fieldName: 'house' },
    { headerName: 'Known As', fieldName: 'knownAs' },
  ];

  antiHeroes$ = this.store.select(selectAntiHeroes());

  constructor(private router: Router, private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(getAntiHeroList());
    this.assignAntiHeroes();
  }

  assignAntiHeroes() {
    this.antiHeroes$.subscribe((data) => this.antiHeroes = data)
  }

  selectAntiHero(data: { antiHero: AntiHero; action: TableActions }) {
    switch (data.action) {
      case TableActions.View:
        this.router.navigate(['anti-heroes', 'form', data.antiHero.id]);
        return;
      case TableActions.Delete:
        this.store.dispatch(removeAntiHeroApi({ antiHeroId: data.antiHero.id }))
        return;
      default:
        return;
    }
  }

  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["anti-heroes", "form"]);
        return;
      }
      case CommandBarActions.DeleteAll: {
        return;

      }
      default:
        ""

    }
  }
}
