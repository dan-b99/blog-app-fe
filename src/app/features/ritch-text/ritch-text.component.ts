import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ritch-text',
  template: `
    <div class="container-fluid">
      <form [formGroup]="form">
        <div class="row">
          <p-editor formControlName="titolo" [style]="{'height': '50px'}"></p-editor>
        </div>
        <div class="row my-2">
          <p-editor formControlName="corpo" [style]="{'height': '120px'}"></p-editor>
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
