import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { formGuard } from '../core/guards/form.guard';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'form',
    children: [
      {
        path: '',
        component: FormComponent,
        canDeactivate: [formGuard]
      },
      {
        path: ':id',
        component: FormComponent,
        canDeactivate: [formGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntiHeroRoutingModule {
}
