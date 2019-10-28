import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  reForm: FormGroup;
  data:any;
  email:string='';
  pass:string='';

  constructor(private fb: FormBuilder,public router: Router) { 
    this.reForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'pass' : [null,Validators.required]
    });
  }

  ngOnInit() {
    
  }

  login(data){
    this.email = data.email;
    this.pass = data.pass;
    //Todo:
    //Email and password check to authenticate the user
    this.router.navigate(["./home"], {});
  }

  getEmailErrorMessage() {
    return this.reForm.get('email').hasError('required') ? 'You must enter your email' :
        this.reForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

  getPassErrorMessage() {
    return this.reForm.get('pass').hasError('required') ? 'You must enter your password' : '';
  }

}
