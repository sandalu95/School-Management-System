import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

export interface ClerkData {
  id: string;
  name: string;
  fullname:string;
  gender:string;
  nic: string;
  contact: string;
  position:string;
}

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

  displayedColumns: string[] = ['id', 'name', 'nic', 'contact'];
  dataSource: MatTableDataSource<ClerkData>;
  expandedClerk: ClerkData | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public router: Router) { 
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
    this.router.navigate(["./home/admin/clerks/edit-clerks"], {});
  }

  viewClerk(){
    this.router.navigate(["./home/admin/clerks/view-clerks"], {});
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): ClerkData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    fullname:"Here comes the full name",
    gender:"Male",
    nic: Math.round(Math.random() * 100).toString(),
    contact: Math.round(Math.random() * 100).toString(),
    position:"Clerk"
  };
}
