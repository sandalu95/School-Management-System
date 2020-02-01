import { Component, OnInit, ViewChild } from "@angular/core";
import { NavItem } from "../models/navitem";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("httpCache"));
  userType = this.user.userType;
  links: NavItem[];

  constructor(public router: Router,) {
    if (this.userType == "Admin") {
      this.links = [
        { label: "Dashboard", route: "/home/admin/dashboard" },
        { label: "Teachers", route: "/home/admin/teachers" },
        { label: "Clerks", route: "/home/admin/clerks" },
        { label: "Notice", route: "/home/admin/notice" },
        { label: "Leaves", route: "/home/admin/leaves" }
      ];
    } else if (this.userType == "Teacher") {
      this.links = [
        { label: "Dashboard", route: "/home/teacher/dashboard" },
        { label: "Students", route: "/home/teacher/students" },
        { label: "Parents", route: "/home/teacher/parents" },
        { label: "Salary", route: "/home/teacher/salary" },
        { label: "Leaves", route: "/home/teacher/leaves" },
        { label: "Notes", route: "/home/teacher/notes" },
        { label: "Marks", route: "/home/teacher/marks" },
        { label: "Assignment Marks", route: "/home/teacher/view-assignment-marks" },
        { label: "Notice", route: "/home/teacher/notice" }
      ];
    } else if (this.userType == "Student") {
      this.links = [
        { label: "Dashboard", route: "/home/student/dashboard" },
        { label: "Notes", route: "/home/student/notes" },
        { label: "Achievements", route: "/home/student/achievements" }
      ];
    } else if (this.userType == "Parent") {
      this.links = [
        { label: "Dashboard", route: "/home/parent/dashboard" }
      ];
    } else if (this.userType == "Clerk") {
      this.links = [
        { label: "Dashboard", route: "/home/clerk/dashboard" },
        { label: "Salary", route: "/home/clerk/salary" },
        { label: "Leaves", route: "/home/clerk/leaves" },
        { label: "Achievements", route: "/home/clerk/achievements" }
      ];
    }
  }

  logout() {
    this.router.navigate(["./"], {});
    localStorage.removeItem('httpCache');
  }

  navigateToHome(){
    if(this.userType == "Admin"){
      this.router.navigate(["/home/admin/dashboard"], {});
    } else if(this.userType == "Teacher") {
      this.router.navigate(["/home/teacher/dashboard"], {});
    } else if(this.userType == "Student"){
      this.router.navigate(["/home/student/dashboard"], {});
    } else if(this.userType == "Parent") {
      this.router.navigate(["/home/parent/dashboard"], {});
    } else if(this.userType == "Clerk"){
      this.router.navigate(["/home/clerk/dashboard"], {});
    }
  }

  ngOnInit() {}
}
