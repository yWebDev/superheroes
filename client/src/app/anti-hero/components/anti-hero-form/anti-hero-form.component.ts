import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anti-hero-form',
  templateUrl: './anti-hero-form.component.html',
  styleUrls: ['./anti-hero-form.component.scss']
})
export class AntiHeroFormComponent implements OnInit {
  @Input() selectedId: string | null = null;
  @Input() actionButtonLabel = 'Create';

  @Output() action = new EventEmitter();

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
    if(this.selectedId) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues () {
    //this will be implemented in the future (for update feature)
    // this.form.patchValue();
  }

  emitAction() {
    this.action.emit({value: this.form.value, action: this.actionButtonLabel})
  }

  clear() {
    this.form.reset();
  }
}
