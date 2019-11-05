import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from "@angular/router";
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

/** Constants used to fill up our data base. */
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TeachersComponent implements OnInit {

  displayedColumns: string[] = ['teacherid', 'nameinitials', 'nic', 'contact'];
  dataSource: MatTableDataSource<Teacher>;
  expandedTeacher: Teacher | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public router: Router, private dataservice:TeacherService) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addTeacher(){
    this.router.navigate(["./home/admin/teachers/add-teachers"], {});
  }

  editTeacher(){
    this.dataservice.changeTeacher(this.expandedTeacher);
    this.router.navigate(["./home/admin/teachers/edit-teachers"], {});
  }

  viewTeacher(){
    this.router.navigate(["./home/admin/teachers/view-teachers"], {});
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): Teacher {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    fullname:"Here comes the full name",
    nameinitials: name,
    teacherid: id.toString(),
    position:"Teacher",
    subject: "Maths",
    gender:"Female",
    dob: "2019-10-13",
    nic: Math.round(Math.random() * 100).toString(),
    address: "Baththaramulla",
    contact: Math.round(Math.random() * 100).toString(),
    email: "sandalu@gmail.com",
    firstadmission: "2019-10-13",
    scladmission: "2019-10-13",
    file: "file"
  };
}
