import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Student } from "src/app/models/student";
import { Teacher } from "src/app/models/teacher";
import { Parent } from "src/app/models/parent";
import { Clerk } from "src/app/models/clerk";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

const NAMES: string[] = [
  "Maia",
  "Asher",
  "Olivia",
  "Atticus",
  "Amelia",
  "Jack",
  "Charlotte",
  "Theodore",
  "Isla",
  "Oliver",
  "Isabella",
  "Jasper",
  "Cora",
  "Levi",
  "Violet",
  "Arthur",
  "Mia",
  "Thomas",
  "Elizabeth"
];

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  tabLoadTimes: Date[] = [];

  studentdisplayedColumns: string[] = ["id", "nameinitials", "grade", "dob"];
  teacherdisplayedColumns: string[] = [
    "teacherid",
    "nameinitials",
    "nic",
    "contact"
  ];
  parentdisplayedColumns: string[] = ["id", "nameinitials", "nic", "contact"];
  clerkdisplayedColumns: string[] = ["id", "nameinitials", "nic", "contact"];

  studentdataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, { static: true }) studentpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) studentsort: MatSort;

  teacherdataSource: MatTableDataSource<Teacher>;
  @ViewChild(MatPaginator, { static: true }) teacherpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) teachersort: MatSort;

  parentdataSource: MatTableDataSource<Parent>;
  @ViewChild(MatPaginator, { static: true }) parentpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) parentsort: MatSort;

  clerkdataSource: MatTableDataSource<Clerk>;
  @ViewChild(MatPaginator, { static: true }) clerkpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) clerksort: MatSort;

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  constructor() {
    // Create 100 users
    const students = Array.from({ length: 100 }, (_, k) =>
      createNewStudent(k + 1)
    );
    const teachers = Array.from({ length: 100 }, (_, k) =>
      createNewTeacher(k + 1)
    );
    const parents = Array.from({ length: 100 }, (_, k) =>
      createNewParent(k + 1)
    );
    const clerks = Array.from({ length: 100 }, (_, k) => createNewClerk(k + 1));

    // Assign the data to the data source for the table to render
    this.studentdataSource = new MatTableDataSource(students);
    this.parentdataSource = new MatTableDataSource(parents);
    this.teacherdataSource = new MatTableDataSource(teachers);
    this.clerkdataSource = new MatTableDataSource(clerks);
  }

  ngOnInit() {
    this.studentdataSource.paginator = this.studentpaginator;
    this.teacherdataSource.paginator = this.teacherpaginator;
    this.parentdataSource.paginator = this.parentpaginator;
    this.clerkdataSource.paginator = this.clerkpaginator;
    this.studentdataSource.sort = this.studentsort;
    this.teacherdataSource.sort = this.teachersort;
    this.parentdataSource.sort = this.parentsort;
    this.clerkdataSource.sort = this.clerksort;
  }

  applyFilterStudent(filterValue: string) {
    this.studentdataSource.filter = filterValue.trim().toLowerCase();

    if (this.studentdataSource.paginator) {
      this.studentdataSource.paginator.firstPage();
    }
  }

  applyFilterTeacher(filterValue: string) {
    this.teacherdataSource.filter = filterValue.trim().toLowerCase();

    if (this.teacherdataSource.paginator) {
      this.teacherdataSource.paginator.firstPage();
    }
  }

  applyFilterParent(filterValue: string) {
    this.parentdataSource.filter = filterValue.trim().toLowerCase();

    if (this.parentdataSource.paginator) {
      this.parentdataSource.paginator.firstPage();
    }
  }

  applyFilterClerk(filterValue: string) {
    this.clerkdataSource.filter = filterValue.trim().toLowerCase();

    if (this.clerkdataSource.paginator) {
      this.clerkdataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new Student */
function createNewStudent(id: number): Student {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    " " +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    ".";

  return {
    fullname: "Here comes the full name",
    nameinitials: name,
    id: id.toString(),
    gender: "Male",
    dob: "2019-07-13",
    grade: "10",
    admissionnumber: "546546",
    admissiondate: "45634"
  };
}

/** Builds and returns a new Teacher */
function createNewTeacher(id: number): Teacher {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    " " +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    ".";

  return {
    fullname: "Here comes the full name",
    nameinitials: name,
    teacherid: id.toString(),
    position: "Teacher",
    subject: "Maths",
    gender: "Male",
    dob: "2019-07-13",
    nic: "76997",
    address: "Baththaramulla",
    contact: "564",
    email: "sandalu@wso2.com",
    firstadmission: "2013-02-23",
    scladmission: "2013-02-23",
    file: "file"
  };
}

/** Builds and returns a new Parent */
function createNewParent(id: number): Parent {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    " " +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    ".";

  return {
    fullname: "Here comes the full name",
    nameinitials: name,
    id: id.toString(),
    relationship: "Mother",
    nic: "667",
    address: "Baththaramulla",
    contact: "767",
    email: "sandalu@wso2.com"
  };
}

/** Builds and returns a new Clerk */
function createNewClerk(id: number): Clerk {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    " " +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    ".";

  return {
    fullname: "Here comes the full name",
    nameinitials: name,
    id: id.toString(),
    position: "Clerk",
    gender: "Male",
    dob: "2019-07-13",
    nic: "345",
    address: "Baththaramulla",
    contact: "5464",
    email: "fdg@gamil.com",
    firstadmission: "2013-02-21",
    scladmission: "2013-02-21",
    file: "file",
    user: "123456",
    clerkId: "1223"
  };
}
