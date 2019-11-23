import { Component, OnInit } from "@angular/core";
import { Parent } from "src/app/models/parent";
import { ParentService } from "src/app/services/parent.service";
import { Student } from "src/app/models/student";
import { StudentService } from "src/app/services/student.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-teacher-view-parents",
  templateUrl: "./teacher-view-parents.component.html",
  styleUrls: ["./teacher-view-parents.component.css"]
})
export class TeacherViewParentsComponent implements OnInit {
  parent: Parent;
  fullname: string;
  nameinitials: string;
  id: string;
  relationship: string;
  nic: string;
  address: string;
  contact: string;
  email: string;

  childlist: Student[] = null;

  constructor(
    private parentService: ParentService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.parentService.currentParent.subscribe(parent => {
      this.parent = parent;
    });
    if (this.parent) {
      this.fullname = this.parent.fullname;
      this.nameinitials = this.parent.nameinitials;
      this.id = this.parent.id;
      this.relationship = this.parent.relationship;
      this.nic = this.parent.nic;
      this.address = this.parent.address;
      this.contact = this.parent.contact;
      this.email = this.parent.email;
    }
    this.getStudentsByParentsId(this.parent.parentId);
  }

  getStudentsByParentsId(parentId: string) {
    this.studentService.getStudentsByParentId(parentId).subscribe(
      data => {
        this.childlist = data.students;
      },
      error => {
        this.handleRespnseError(error);
      }
    );
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
