import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-ritch-text',
  template: `
    <div class="d-flex align-items-center justify-content-left mt-5 ms-5">
      <form [formGroup]="form">
        <div class="row">
          <p-editor formControlName="titolo" [style]="{'min-height': '60px'}" placeholder="Titolo..."></p-editor>
        </div>
        <div class="row my-2">
          <p-editor formControlName="corpo" [style]="{'min-height': '120px'}" [modules]="configModuleBody" placeholder="Testo..."></p-editor>
        </div>
        <div class="row mb-2">
          <p-editor formControlName="tags" [style]="{'min-height': '75px'}" placeholder="Inserisci tags..."></p-editor>
        </div>
        <button class="btn btn-secondary btm-sm" (click)="send()">Invia</button>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class RitchTextComponent {
  form: FormGroup;
  @Output() event: EventEmitter<FormGroup>;
  configModuleBody: any = {
    blotFormatter: { }
  }

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      titolo: new FormControl(),
      corpo: new FormControl(),
      tags: new FormControl()
    });
    this.event = new EventEmitter();
  }

  send() {
    this.event.emit(this.form);
  }
}
