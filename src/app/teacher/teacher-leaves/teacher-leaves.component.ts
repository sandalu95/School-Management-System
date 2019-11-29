import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Leave } from "src/app/models/leave";
import Swal from "sweetalert2";

@Component({
  selector: "app-teacher-leaves",
  templateUrl: "./teacher-leaves.component.html",
  styleUrls: ["./teacher-leaves.component.css"]
})
export class TeacherLeavesComponent implements OnInit {
  selectedFile = null;

  leaveForm: FormGroup;
  userId: string = "";
  commencedDate: string = "";
  assumedDate: string = "";
  noOfDays: string = "";
  leaveType: string = "";
  reason: string = "";
  appliedDate: string = "";
  assignedWorkId: string = "";
  leaves: Leave[];

  constructor(private fb: FormBuilder) {
    this.leaveForm = fb.group({
      userId: [null, Validators.required],
      commencedDate: [null, Validators.required],
      assumedDate: [null, Validators.required],
      noOfDays: [null, Validators.required],
      leaveType: [null, Validators.required],
      reason: [null, Validators.required],
      appliedDate: [null, Validators.required],
      assignedWorkId: [null, Validators.required],
      file: [null, Validators.required]
    });
  }

  ngOnInit() {
    // this.leaveService.getAllLeaves().subscribe(
    //   data => {
    //     this.leaves = data.leaves;
    //   },
    //   error => {
    //     this.handleResponseError(error);
    //   }
    // );
    this.leaves = [
      {
        id: "drfe",
        userId: "231",
        commencedDate: new Date(),
        assumedDate: new Date(),
        noOfDays: 2,
        leaveType: "sick leave",
        reason: "i am sick",
        appliedDate: new Date(),
        assignedWork: null,
        status: "Pending"
      },
      {
        id: "gtr",
        userId: "432",
        commencedDate: new Date(),
        assumedDate: new Date(),
        noOfDays: 4,
        leaveType: "casual leave",
        reason: "a wedding",
        appliedDate: new Date(),
        assignedWork: null,
        status: "Pending"
      }
    ];
  }

  saveLeave(data) {
    if (this.leaveForm.invalid) return;
    console.log("success");
    // Swal.showLoading();
    // this.leaveService.createLeave(data).subscribe(
    //   data => {
    //     Swal.hideLoading();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Great!",
    //       text: data.message
    //     }).then(res => {
    //       this.leaveForm.reset();
    //     });
    //   },
    //   error => {
    //     this.handleResponseError(error);
    //   }
    // );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  getError(texttype) {
    return texttype.hasError("required") ? "You must enter a value" : "";
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
