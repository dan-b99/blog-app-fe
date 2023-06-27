import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ritch-text',
  template: `
  <div class="container pt-2">
    <form [formGroup]="control">
      <quill-editor class="mb-3" [styles]="{'min-height': '50px', 'width': '70vw'}" formControlName="title" [modules]="quillConfigurationTitle"></quill-editor>
      <quill-editor [styles]="{'min-height': '120px', 'width': '70vw'}" formControlName="body" [modules]="quillConfigurationBody"></quill-editor>
      <button class="btn btn-secondary btn-sm mt-2" (click)="submit()">Invia</button>
    </form>
  </div>
  `,
  styles: [
    ` 
    `
  ]
})
export class RitchTextComponent implements OnInit {
  control: FormGroup;
  @Output() subEvent: EventEmitter<any>;
  quillConfigurationBody = {
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
  quillConfigurationTitle = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ]
  }

  constructor(private formBuilder: FormBuilder) {
    this.control = formBuilder.group({
      title: new FormControl(),
      body: new FormControl()
    });
    this.subEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  submit() {
    this.subEvent.emit(this.control);
  }
}
