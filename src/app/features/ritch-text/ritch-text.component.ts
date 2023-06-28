import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-ritch-text',
  template: `
    <div class="container-fluid">
      <form [formGroup]="form">
        <div class="row">
          <p-editor formControlName="titolo" [style]="{'min-height': '60px'}"></p-editor>
        </div>
        <div class="row my-2">
          <p-editor formControlName="corpo" [style]="{'min-height': '120px'}" [modules]="configModuleBody"></p-editor>
        </div>
        <button class="btn btn-secondary btm-sm" (click)="send()">Send</button>
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
      corpo: new FormControl()
    });
    this.event = new EventEmitter();
  }

  send() {
    this.event.emit(this.form);
  }
}
