import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Student } from "src/app/models/student";
import { Teacher } from "src/app/models/teacher";
import { Parent } from "src/app/models/parent";
import { Clerk } from "src/app/models/clerk";
import { TeacherService } from "src/app/services/teacher.service";
import { ClerkService } from "src/app/services/clerk.service";
import { NoticeService } from "src/app/services/notice.service";
import { StudentService } from "src/app/services/student.service";
import Swal from "sweetalert2";
import { Notice } from "src/app/models/notice";
import { ParentService } from "src/app/services/parent.service";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  teacherCount: number;
  clerkCount: number;
  studentCount: number;
  parentCount: number;
  notices: Notice[];

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

  constructor(
    private teacherService: TeacherService,
    private clerkService: ClerkService,
    private noticeService: NoticeService,
    private studentService: StudentService,
    private parentService: ParentService
  ) {}

  ngOnInit() {
    /**
     * call getAllTeachers webservice
     */
    this.teacherService.getAllTeachers().subscribe(
      data => {
        // Assign the data to the data source for the table to render
        this.teacherdataSource = new MatTableDataSource(data.teachers);
        this.teacherdataSource.paginator = this.teacherpaginator;
        this.teacherdataSource.sort = this.teachersort;
        this.teacherCount = data.count;
      },
      error => {
        handleResponseError(error);
      }
    );

    /**
     * call getAllClerks webservice
     */
    this.clerkService.getAllClerks().subscribe(
      data => {
        // Assign the data to the data source for the table to render
        this.clerkdataSource = new MatTableDataSource(data.clerks);
        this.clerkdataSource.paginator = this.clerkpaginator;
        this.clerkdataSource.sort = this.clerksort;
        this.clerkCount = data.count;
      },
      error => {
        handleResponseError(error);
      }
    );

    /**
     * call getAllNotices web service
     */
    this.noticeService.getAllNotices().subscribe(
      data => {
        this.notices = data.notices;
      },
      error => {
        handleResponseError(error);
      }
    );

    /**
     * call getAllStudents web service
     */
    this.studentService.getAllStudents().subscribe(
      data => {
        this.studentdataSource = new MatTableDataSource(data.students);
        this.studentdataSource.paginator = this.studentpaginator;
        this.studentdataSource.sort = this.studentsort;
        this.studentCount = data.count;
      },
      error => {
        handleResponseError(error);
      }
    );

    /**
     * call getAllParents web service
     */
    this.parentService.getAllParents().subscribe(
      data => {
        this.parentdataSource = new MatTableDataSource(data.parents);
        this.parentdataSource.paginator = this.parentpaginator;
        this.parentdataSource.sort = this.parentsort;
        this.parentCount = data.count;
      },
      error => {
        handleResponseError(error);
      }
    );
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

function handleResponseError(error) {
  console.log(error);
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.error.error
  });
}
