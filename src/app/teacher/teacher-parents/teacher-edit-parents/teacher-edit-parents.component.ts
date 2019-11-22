import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from 'src/app/services/parent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-edit-parents',
  templateUrl: './teacher-edit-parents.component.html',
  styleUrls: ['./teacher-edit-parents.component.css']
})
export class TeacherEditParentsComponent implements OnInit {
  parent: Parent;
  parentForm: FormGroup;

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
    this.parentService.currentParent.subscribe(
      parent => (this.parent = parent)
    );
    if (this.parent) {
      this.parentForm.get("fullname").setValue(this.parent.fullname);
      this.parentForm.get("nameinitials").setValue(this.parent.nameinitials);
      this.parentForm.get("relationship").setValue(this.parent.relationship);
      this.parentForm.get("nic").setValue(this.parent.nic);
      this.parentForm.get("address").setValue(this.parent.address);
      this.parentForm.get("contact").setValue(this.parent.contact);
      this.parentForm.get("email").setValue(this.parent.email);
    }
  }

  editParent(data) {
    if (this.parentForm.invalid) return;

    Swal.showLoading();

    this.parentService.editParent(this.parent.id, data).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(result => {
          this.router.navigate(["./home/teacher/parents"], {});
        });
      },
      error => {
        console.log(error);
        Swal.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.error
        });
      }
    );
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }

}
