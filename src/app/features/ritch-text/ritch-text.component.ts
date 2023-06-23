import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ritch-text',
  template: `
    <form [formGroup]="control">
      <quill-editor [styles]="{'min-height': '120px', 'width': '70vw'}" formControlName="editor"></quill-editor>
      <button class="btn btn-secondary btn-sm mt-2" (click)="submit()">Invia</button>
    </form>
  `,
  styles: [
    `
     
    `
  ]
})
export class RitchTextComponent implements OnInit {
  control: FormGroup;
  editorVals: any;

  constructor(private formBuilder: FormBuilder) {
    this.control = formBuilder.group({
      editor: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.control.controls['editor']);
  }

}
