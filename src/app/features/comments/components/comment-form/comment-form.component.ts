import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit{
  @Input() submitLabel!: string;
  @Input() hasCancelButton = false;
  @Input() initialText: string = '';

  @Output() handleSubmit = new EventEmitter<string>()
  @Output() handleCancel = new EventEmitter<void>()
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      input: [this.initialText, Validators.required]
    })
  }

  onSubmit(){
    console.log(this.form.value.input);
    this.handleSubmit.emit(this.form.value.input);
  }
}
