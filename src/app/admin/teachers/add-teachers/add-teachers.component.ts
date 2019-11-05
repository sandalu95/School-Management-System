import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html',
  styleUrls: ['./add-teachers.component.css'],
})
export class AddTeachersComponent implements OnInit {

  teacher: Teacher;
  teacherForm: FormGroup;

  fullnametxt:string='';
  nameinitialstxt:string='';
  teacheridtxt:string='';
  positiontxt:string='';
  subjecttxt:string='';
  gendertxt:string='';
  dobtxt:string='';
  nictxt:string='';
  addresstxt:string='';
  contacttxt:string='';
  emailtxt:string='';
  firstadmissiontxt:string='';
  scladmissiontxt:string='';
  
  constructor(private fb: FormBuilder, public router: Router, private dataservice:TeacherService) { 
    this.teacherForm = fb.group({
      'fullname' : [null,Validators.required],
      'nameinitials' : [null,Validators.required],
      'teacherid' : [null,Validators.required],
      'position' : [null,Validators.required],
      'subject' : [null,Validators.required],
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
    this.dataservice.currentTeacher.subscribe(teacher=>this.teacher=teacher)
    if(this.teacher){
      this.teacherForm.get('fullname').setValue(this.teacher.fullname);
      this.teacherForm.get('nameinitials').setValue(this.teacher.nameinitials);
      this.teacherForm.get('teacherid').setValue(this.teacher.teacherid);
      this.teacherForm.get('position').setValue(this.teacher.position);
      this.teacherForm.get('subject').setValue(this.teacher.subject);
      this.teacherForm.get('gender').setValue(this.teacher.gender);
      this.teacherForm.get('dob').setValue(this.teacher.dob);
      this.teacherForm.get('nic').setValue(this.teacher.nic);
      this.teacherForm.get('address').setValue(this.teacher.address);
      this.teacherForm.get('contact').setValue(this.teacher.contact);
      this.teacherForm.get('email').setValue(this.teacher.email);
      this.teacherForm.get('firstadmission').setValue(this.teacher.firstadmission);
      this.teacherForm.get('scladmission').setValue(this.teacher.scladmission);
      this.teacherForm.get('file').setValue(null);
    }
  }

  Save(data){
    this.fullnametxt = data.fullname;
    this.nameinitialstxt = data.nameinitials;
    this.teacheridtxt = data.teacherid;
    this.positiontxt = data.position;
    this.subjecttxt = data.subject;
    this.gendertxt = data.gender;
    this.dobtxt = data.dob;
    this.nictxt = data.nic;
    this.addresstxt = data.address;
    this.contacttxt = data.contact;
    this.emailtxt = data.email;
    this.firstadmissiontxt = data.firstadmission;
    this.scladmissiontxt = data.scladmissiontxt;

    if (this.teacherForm.invalid) {
      return;
    } else {
      this.router.navigate(["./home/admin/teachers"], {});
    }
  }

  getError(texttype){
    return texttype.hasError('required') ? 'You must enter a value' :
            texttype.hasError('email') ? 'Not a valid email' :
            '';
  }

}
