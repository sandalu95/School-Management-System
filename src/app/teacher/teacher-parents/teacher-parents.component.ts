import { Component, OnInit, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { Parent } from "src/app/models/parent";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { ParentService } from "src/app/services/parent.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-teacher-parents",
  templateUrl: "./teacher-parents.component.html",
  styleUrls: ["./teacher-parents.component.css"],
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
export class TeacherParentsComponent implements OnInit {
  displayedColumns: string[] = ["id", "nameinitials", "nic", "contact"];
  dataSource: MatTableDataSource<Parent>;
  expandedParent: Parent | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public router: Router, private parentService: ParentService) {}

  ngOnInit() {
    this.parentService.getAllParents().subscribe(
      data => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data.parents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.handleRespnseError(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addParent() {
    this.router.navigate(["./home/teacher/parents/add-parents"], {});
  }

  editParent() {
    this.parentService.changeParent(this.expandedParent);
    this.router.navigate(["./home/teacher/parents/edit-parents"], {});
  }

  viewParent() {
    this.parentService.changeParent(this.expandedParent);
    this.router.navigate(["./home/teacher/parents/view-parents"], {});
  }

  deleteParent(parentId: string) {
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
        this.parentService.deleteParent(parentId).subscribe(
          data => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: data.message
            }).then(res => {
              this.parentService.getAllParents().subscribe(
                data => {
                  // Assign the data to the data source for the table to render
                  this.dataSource = new MatTableDataSource(data.parents);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                },
                error => {
                  this.handleRespnseError(error);
                }
              );
            });
          },
          error => {
            this.handleRespnseError(error);
          }
        );
      }
    });
  }

  handleRespnseError(error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }
}
