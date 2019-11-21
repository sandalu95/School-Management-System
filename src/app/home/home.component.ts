import { Component, OnInit, ViewChild } from "@angular/core";
import { NavItem } from "../models/navitem";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("httpCache"));
  userType = this.user.userType;
  links: NavItem[];

  constructor() {
    if (this.userType == "Admin") {
      this.links = [
        { label: "Dashboard", route: "/home/admin/dashboard" },
        { label: "Teachers", route: "/home/admin/teachers" },
        { label: "Clerks", route: "/home/admin/clerks" },
        { label: "Notice", route: "/home/admin/notice" }
      ];
    } else if (this.userType == "Teacher") {
      this.links = [
        { label: "Dashboard", route: "/home/teacher/dashboard" },
        { label: "Students", route: "/home/teacher/students" },
        { label: "Parents", route: "/home/teacher/parents" },
        { label: "Salary", route: "/home/teacher/salary" },
        { label: "Leaves", route: "/home/teacher/leaves" },
        { label: "Notice", route: "/home/teacher/notice" }
      ];
    } else if (this.userType == "Clerk") {
      this.links = [
        { label: "Dashboard", route: "/home/admin/dashboard" },
        { label: "Teachers", route: "/home/admin/teachers" },
        { label: "Clerks", route: "/home/admin/clerks" },
        { label: "Notice", route: "/home/admin/notice" }
      ];
    } else if (this.userType == "Parent") {
      this.links = [
        { label: "Dashboard", route: "/home/admin/dashboard" },
        { label: "Teachers", route: "/home/admin/teachers" },
        { label: "Clerks", route: "/home/admin/clerks" },
        { label: "Notice", route: "/home/admin/notice" }
      ];
    }
  }

  ngOnInit() {}
}
