import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Leave } from 'src/app/models/leave';
import { Router } from "@angular/router";
import { LeaveService } from 'src/app/services/leave.service';
import Swal from "sweetalert2";

export interface PendingLeaves {
  count: number;
  pendingLeaves: Leave[];
}

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
})
export class LeavesComponent implements OnInit {
  displayedColumns: string[] = ["userId", "reason", "commencedDate", "reject", "approve"];
  dataSource: MatTableDataSource<Leave>;
  expandedClerk: Leave | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public router: Router, private leaveService: LeaveService) { }

  ngOnInit() {
    this.leaveService.getPendingLeaves().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data.leaves);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.error
        });
      }
    )
  }

  approve(data) {
    Swal.showLoading();
    this.leaveService.approveLeave(data).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(result => {
          this.leaveService.getPendingLeaves().subscribe(
            data => {
              this.dataSource = new MatTableDataSource(data.leaves);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.error.error
              });
            }
          )
        })
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.error
        });
      }
    )
  }

  reject(data){
    Swal.showLoading();
    this.leaveService.rejectLeave(data).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(result => {
          this.leaveService.getPendingLeaves().subscribe(
            data => {
              this.dataSource = new MatTableDataSource(data.leaves);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.error.error
              });
            }
          )
        })
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.error
        });
      }
    )
  }

}
