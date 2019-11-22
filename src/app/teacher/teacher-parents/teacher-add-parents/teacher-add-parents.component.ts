import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from 'src/app/services/parent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-add-parents',
  templateUrl: './teacher-add-parents.component.html',
  styleUrls: ['./teacher-add-parents.component.css']
})
export class TeacherAddParentsComponent implements OnInit {
  parent: Parent;
  parentForm: FormGroup;

  fullnametxt: string = "";
  nameinitialstxt: string = "";
  relationshiptxt: string = "";
  nictxt: string = "";
  addresstxt: string = "";
  contacttxt: string = "";
  emailtxt: string = "";

  constructor(private fb: FormBuilder,
    public router: Router,
    private parentService: ParentService) {
      this.parentForm = fb.group({
        fullname: [null, Validators.required],
        nameinitials: [null, Validators.required],
        relationship: [null, Validators.required],
        nic: [null, Validators.required],
        address: [null, Validators.required],
        contact: [null, Validators.required],
        email: [
          null,
          Validators.compose([Validators.required, Validators.email])
        ]
      });
  }

  ngOnInit() {
  }

  Save(data) {
    if (this.parentForm.invalid) return;

    Swal.showLoading();

    // this.parentService.registerParent(data).subscribe(
    //   data => {
    //     Swal.hideLoading();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Great!",
    //       text: data.message
    //     }).then(result => {
    //       this.router.navigate(["./home/teacher/parents"], {});
    //     });
    //   },
    //   error => {
    //     Swal.hideLoading();
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: error.error.error
    //     });
    //   }
    // );
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }

}
