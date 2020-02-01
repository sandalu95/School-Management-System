import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Leave } from "src/app/models/leave";
import Swal from "sweetalert2";
import { LeaveService } from "src/app/services/leave.service";

@Component({
  selector: "app-teacher-leaves",
  templateUrl: "./teacher-leaves.component.html",
  styleUrls: ["./teacher-leaves.component.css"]
})
export class TeacherLeavesComponent implements OnInit {
  leaveForm: FormGroup;
  selectedFile = null;

  commencedDate: string = "";
  assumedDate: string = "";
  noOfDays: string = "";
  leaveType: string = "";
  reason: string = "";
  appliedDate: string = "";
  assignedWork: string = "";
  leaves: Leave[];

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.leaveForm = fb.group({
      commencedDate: [null, Validators.required],
      assumedDate: [null, Validators.required],
      noOfDays: [null, Validators.required],
      leaveType: [null, Validators.required],
      reason: [null, Validators.required],
      appliedDate: [null, Validators.required],
      assignedWork: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.leaveService.getLeavesByUserId().subscribe(
      data => {
        this.leaves = data.leaves;
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  saveLeave(data: Leave) {
    console.log(data);
    if (this.leaveForm.invalid) return;

    data.assignedWork = this.selectedFile;

    Swal.showLoading();
    this.leaveService.requestLeaves(data).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(res => {
          this.leaveService.getLeavesByUserId().subscribe(
            data => {
              this.leaves = data.leaves;
            },
            error => {
              this.handleResponseError(error);
            }
          );
        });
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  deleteLeave(leave: Leave) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Swal.close();
        this.leaveService.deleteLeave(leave.id).subscribe(
          data => {
            if (data.status == 401) {
              Swal.fire({
                icon: "warning",
                title: "Unauthorized!",
                text: data.message
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: data.message
              });
            }
          },
          error => {
            this.handleResponseError(error);
          }
        );
      }
    });
  }

  getError(texttype) {
    return texttype.hasError("required") ? "You must enter a value" : "";
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  handleResponseError(error) {
    Swal.hideLoading();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }
}
