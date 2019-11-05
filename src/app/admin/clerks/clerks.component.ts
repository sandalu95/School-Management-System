import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Clerk } from 'src/app/models/clerk';
import { ClerkService } from 'src/app/services/clerk.service';

/** Constants used to fill up our data base. */
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-clerks',
  templateUrl: './clerks.component.html',
  styleUrls: ['./clerks.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ClerksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nameinitials', 'nic', 'contact'];
  dataSource: MatTableDataSource<Clerk>;
  expandedClerk: Clerk | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public router: Router, private dataservice:ClerkService) { 
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

  addClerk(){
    this.router.navigate(["./home/admin/clerks/add-clerks"], {});
  }

  editClerk(){
    this.dataservice.changeClerk(this.expandedClerk);
    this.router.navigate(["./home/admin/clerks/edit-clerks"], {});
  }

  viewClerk(){
    this.router.navigate(["./home/admin/clerks/view-clerks"], {});
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): Clerk {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    fullname:"Here comes the full name",
    nameinitials: name,
    id: id.toString(),
    position:"Clerk",
    gender:"Male",
    dob: "2019-07-13",
    nic: Math.round(Math.random() * 100).toString(),
    address: "Baththaramulla",
    contact: Math.round(Math.random() * 100).toString(),
    email: "sandalu@gmail.com",
    firstadmission: "2019-07-13",
    scladmission: "2019-07-13",
    file:"file"
  };
}
