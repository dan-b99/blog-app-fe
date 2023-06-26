import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ritch-text',
  template: `
    <form [formGroup]="control">
      <quill-editor [styles]="{'min-height': '120px', 'width': '70vw'}" formControlName="editor" [modules]="quillConfiguration"></quill-editor>
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
  @Output() subEvent: EventEmitter<string>;
  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ]
  }

  constructor(private formBuilder: FormBuilder) {
    this.control = formBuilder.group({
      editor: new FormControl()
    });
    this.subEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.control.controls['editor'].value);
    this.subEvent.emit(this.control.controls['editor'].value);
  }
}
