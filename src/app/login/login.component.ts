import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";

import { LoginService } from "./login.service";
import { LoginRequest } from "../models/request/loginRequest";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  reForm: FormGroup;
  data: any;
  email: string = "";
  pass: string = "";

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private loginService: LoginService
  ) {
    this.reForm = fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      pass: [null, Validators.required]
    });
  }

  ngOnInit() {}

  login(data) {
    if (!data.email && !data.pass) return;
    this.email = data.email;
    this.pass = data.pass;

    const loginRequest: LoginRequest = {
      username: data.email,
      password: data.pass
    };

    const loginObserver = {
      next: data => {
        console.log(data.message);
        this.router.navigate(["./home"], {});
      },
      error: error => console.log(error.error.message)
    };

    this.loginService.login(loginRequest).subscribe(loginObserver);
  }

  getEmailErrorMessage() {
    return this.reForm.get("email").hasError("required")
      ? "You must enter your email"
      : this.reForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }

  getPassErrorMessage() {
    return this.reForm.get("pass").hasError("required")
      ? "You must enter your password"
      : "";
  }
}
