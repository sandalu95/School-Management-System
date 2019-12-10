import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Leave } from 'src/app/models/leave';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clerk-leaves',
  templateUrl: './clerk-leaves.component.html',
  styleUrls: ['./clerk-leaves.component.css']
})
export class ClerkLeavesComponent implements OnInit {
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
      assignedWorkId: [null, Validators.required]
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
        id:"drfe",
        userId:"231",
        commencedDate:"2019-02-13",
        assumedDate:"2019-02-12",
        noOfDays:"2",
        leaveType:"sick leave",
        reason:"i am sick",
        appliedDate:"2019-02-10",
        assignedWorkId:null
      },
      {
        id:"gtr",
        userId:"432",
        commencedDate:"2019-02-14",
        assumedDate:"2019-02-16",
        noOfDays:"4",
        leaveType:"casual leave",
        reason:"a wedding",
        appliedDate:"2019-02-11",
        assignedWorkId:null
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
