import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { LoginService } from "./login.service";
import { LoginRequest } from "../models/request/loginRequest";

const CACHE_KEY = "httpCache";

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

    Swal.showLoading();

    this.email = data.email;
    this.pass = data.pass;

    const loginRequest: LoginRequest = {
      username: data.email,
      password: data.pass
    };

    const loginObserver = {
      next: data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(result => {
          localStorage[CACHE_KEY] = JSON.stringify(data);
          const user = JSON.parse(localStorage.getItem("httpCache"));
          if(user.userType=='Admin'){
            this.router.navigate(["./home/admin"], {});
          } else if(user.userType=='Teacher'){
            this.router.navigate(["./home/teacher"], {});
          } else if(user.userType=='Clerk'){
            this.router.navigate(["./home/clerk"], {});
          } else if(user.userType=='Student'){
            this.router.navigate(["./home/student"], {});
          } else if(user.userType=='Parent'){
            this.router.navigate(["./home/parent"], {});
          }
        });
      },
      error: error => {
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message
        });
      }
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
