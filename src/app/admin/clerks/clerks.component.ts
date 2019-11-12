import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { Clerk } from "src/app/models/clerk";
import { ClerkService } from "src/app/services/clerk.service";

@Component({
  selector: "app-clerks",
  templateUrl: "./clerks.component.html",
  styleUrls: ["./clerks.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ClerksComponent implements OnInit {
  displayedColumns: string[] = ["id", "nameinitials", "nic", "contact"];
  dataSource: MatTableDataSource<Clerk>;
  expandedClerk: Clerk | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public router: Router, private clerkService: ClerkService) {}

  ngOnInit() {
    this.clerkService.getAllClerks().subscribe(
      data => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data.clerks);
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
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addClerk() {
    this.router.navigate(["./home/admin/clerks/add-clerks"], {});
  }

  editClerk() {
    this.clerkService.changeClerk(this.expandedClerk);
    this.router.navigate(["./home/admin/clerks/edit-clerks"], {});
  }

  viewClerk(clerk: Clerk) {
    this.clerkService.changeClerk(this.expandedClerk);
    this.router.navigate(["./home/admin/clerks/view-clerks"], {});
  }

  deleteClerk(clerkId: string) {
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
        this.clerkService.deleteClerk(clerkId).subscribe(
          data => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: data.message
            });
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.error.error
            });
          }
        );
      }
    });
  }
}
