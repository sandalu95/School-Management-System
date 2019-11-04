import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-clerks',
  templateUrl: './add-clerks.component.html',
  styleUrls: ['./add-clerks.component.css']
})
export class AddClerksComponent implements OnInit {

  clerkForm: FormGroup;

  fullnametxt:string='';
  nameinitialstxt:string='';
  positiontxt:string='';
  gendertxt:string='';
  dobtxt:string='';
  nictxt:string='';
  addresstxt:string='';
  contacttxt:string='';
  emailtxt:string='';
  firstadmissiontxt:string='';
  scladmissiontxt:string='';

  constructor(private fb: FormBuilder, public router: Router) { 
    this.clerkForm = fb.group({
      'fullname' : [null,Validators.required],
      'nameinitials' : [null,Validators.required],
      'position' : [null,Validators.required],
      'gender' : [null,Validators.required],
      'dob' : [null,Validators.required],
      'nic' : [null,Validators.required],
      'address' : [null,Validators.required],
      'contact' : [null,Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'firstadmission' : [null,Validators.required],
      'scladmission' : [null,Validators.required],
      'file' : [null,null]
    });
  }

  ngOnInit() {
  }

  Save(data){
    this.fullnametxt = data.fullname;
    this.nameinitialstxt = data.nameinitials;
    this.positiontxt = data.position;
    this.gendertxt = data.gender;
    this.dobtxt = data.dob;
    this.nictxt = data.nic;
    this.addresstxt = data.address;
    this.contacttxt = data.contact;
    this.emailtxt = data.email;
    this.firstadmissiontxt = data.firstadmission;
    this.scladmissiontxt = data.scladmissiontxt;

    if (this.clerkForm.invalid) {
      return;
    } else {
      this.router.navigate(["./home/admin/clerks"], {});
    }
  }

  getError(texttype){
    return texttype.hasError('required') ? 'You must enter a value' :
            texttype.hasError('email') ? 'Not a valid email' :
            '';
  }

}
