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
import { Teacher } from "src/app/models/teacher";
import { TeacherService } from "src/app/services/teacher.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.css"],
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
export class TeachersComponent implements OnInit {
  displayedColumns: string[] = ["teacherid", "nameinitials", "nic", "contact"];
  dataSource: MatTableDataSource<Teacher>;
  expandedTeacher: Teacher | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public router: Router, private teacherService: TeacherService) {}

  ngOnInit() {
    this.teacherService.getAllTeachers().subscribe(
      data => {
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data.teachers);
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

  addTeacher() {
    this.router.navigate(["./home/admin/teachers/add-teachers"], {});
  }

  editTeacher() {
    this.teacherService.changeTeacher(this.expandedTeacher);
    this.router.navigate(["./home/admin/teachers/edit-teachers"], {});
  }

  viewTeacher() {
    this.teacherService.changeTeacher(this.expandedTeacher);
    this.router.navigate(["./home/admin/teachers/view-teachers"], {});
  }

  deleteTeacher(teacherId: string) {
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
        this.teacherService.deleteTeacher(teacherId).subscribe(
          data => {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: data.message
            }).then(res => {
              this.teacherService.getAllTeachers().subscribe(
                data => {
                  // Assign the data to the data source for the table to render
                  this.dataSource = new MatTableDataSource(data.teachers);
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
