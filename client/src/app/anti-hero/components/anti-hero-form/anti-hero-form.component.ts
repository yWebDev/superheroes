import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AntiHero } from '../../models/anti-hero.interface';

@Component({
  selector: 'app-anti-hero-form',
  templateUrl: './anti-hero-form.component.html',
  styleUrls: ['./anti-hero-form.component.scss']
})
export class AntiHeroFormComponent implements OnInit {
  @Input() actionButtonLabel = 'Create';
  @Input() selectedAntiHero?: AntiHero | null = null;

  @Output() action = new EventEmitter<{ value: AntiHero, action: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      house: [''],
      knownAS: ['']
    });
  }

  ngOnInit(): void {
    this.checkAction();
  }

  checkAction() {
    if (this.selectedAntiHero) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues() {
    //this will be implemented in the future (for update feature)
    // this.form.patchValue();
  }

  emitAction() {
    this.action.emit({ value: this.form.value, action: this.actionButtonLabel })
  }

  clear() {
    this.form.reset();
  }
}
