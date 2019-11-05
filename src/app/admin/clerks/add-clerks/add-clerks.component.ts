import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { Clerk } from 'src/app/models/clerk';
import { ClerkService } from 'src/app/services/clerk.service';

@Component({
  selector: 'app-add-clerks',
  templateUrl: './add-clerks.component.html',
  styleUrls: ['./add-clerks.component.css']
})
export class AddClerksComponent implements OnInit {

  clerk:Clerk;
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

  constructor(private fb: FormBuilder, public router: Router, private dataservice:ClerkService) { 
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
    this.dataservice.currentClerk.subscribe(clerk=>this.clerk=clerk)
    if(this.clerk){
      this.clerkForm.get('fullname').setValue(this.clerk.fullname);
      this.clerkForm.get('nameinitials').setValue(this.clerk.nameinitials);
      this.clerkForm.get('position').setValue(this.clerk.position);
      this.clerkForm.get('gender').setValue(this.clerk.gender);
      this.clerkForm.get('dob').setValue(this.clerk.dob);
      this.clerkForm.get('nic').setValue(this.clerk.nic);
      this.clerkForm.get('address').setValue(this.clerk.address);
      this.clerkForm.get('contact').setValue(this.clerk.contact);
      this.clerkForm.get('email').setValue(this.clerk.email);
      this.clerkForm.get('firstadmission').setValue(this.clerk.firstadmission);
      this.clerkForm.get('scladmission').setValue(this.clerk.scladmission);
      this.clerkForm.get('file').setValue(null);
    }
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
