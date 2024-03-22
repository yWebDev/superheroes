import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../core/guards/form.guard';
import { AntiHero } from '../../models/anti-hero.interface';
import { addAntiHeroApi, modifyAntiHeroApi, modifyAntiHeroState } from '../../state/anti-hero.actions';
import { selectAntiHero } from '../../state/anti-hero.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements CanComponentDeactivate {
  antiHero$: Observable<AntiHero | undefined>;

  constructor(private route: ActivatedRoute, private store: Store) {
    const id = this.route.snapshot.paramMap.get('id');
    this.antiHero$ = this.store.select(selectAntiHero(id!));
  }

  formAction(data: { value: AntiHero, action: string }) {
    switch (data.action) {
      case 'Create': {
        this.store.dispatch(addAntiHeroApi({ antiHero: data.value }));
        return;
      }
      case 'Update': {
        this.store.dispatch(modifyAntiHeroApi({ antiHero: data.value }));
        return;
      }
      default:
        return;
    }
  }

  canDeactivate() {
    const confirmation = window.confirm('Are you sure');
    return confirmation;
  }
}
