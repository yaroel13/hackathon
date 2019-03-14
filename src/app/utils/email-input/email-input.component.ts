import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'esc-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EmailInputComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  public form: FormGroup;

  ngOnInit() {
    this.initForm();
    this.patchForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9@._]*$/)]]
    });
  }

  patchForm() {
    this.form.patchValue({
      email: (this.data.email && this.data.email != 'null') ? this.data.email : ''
    })
  }

}
