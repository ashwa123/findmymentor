import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../shared/error-matcher';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  RequestmentorForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RequestFormComponent>
  ) { }

  ngOnInit(): void {
    this.requestform()
  }

  requestform() {
    this.RequestmentorForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      occupation: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*')]],
      address: ['',[Validators.required]],
      DOB: ['',[Validators.required]]
    })
  }

  submit() {
    console.log(this.RequestmentorForm.value);
    this.dialogRef.close();
  }

}
