import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-ritch-text',
  template: `
    <div class="container-fluid d-flex align-items-center">
      <form [formGroup]="form" class="form-control p-2 m-2">
        <div class="row">
          <p-editor formControlName="titolo" [style]="{'min-height': '60px'}" placeholder="Titolo...">
            <ng-template pTemplate="header">
              <select class="ql-size">
                <option selected></option>
                <option value="large"></option>
                <option value="huge"></option>
              </select>
              <span class="ql-formats">
                <button type="button" class="ql-bold" aria-label="Bold"></button>
                <button type="button" class="ql-italic" aria-label="Italic"></button>
                <button type="button" class="ql-underline" aria-label="Underline"></button>
              </span>
            </ng-template>
          </p-editor>
        </div>
        <div class="row my-4">
          <p-editor formControlName="corpo" [style]="{'min-height': '120px'}" [modules]="configModuleBody" placeholder="Testo..."></p-editor>
        </div>
        <div class="row mb-4">
          <p-editor formControlName="tags" [style]="{'min-height': '75px'}" placeholder="Inserisci tags separati da virgola...">
            <ng-template pTemplate="header">
              <select class="ql-size">
                <option selected></option>>
              </select>
            </ng-template>
          </p-editor>
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
