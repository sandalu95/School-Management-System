import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-teacher-view-parents',
  templateUrl: './teacher-view-parents.component.html',
  styleUrls: ['./teacher-view-parents.component.css']
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

  childlist: Student[] = [
    {
      fullname: 'Child1',
      nameinitials: 'H.M.child',
      id: 'fbdfrg',
      gender: 'Male',
      dob: '2019-08-13',
      grade: '10',
      class: 'C',
      admissionnumber: '43656',
      admissiondate: '2013-05-23',
      profileImage: '',
      parent: '',
    },
    {
      fullname: 'Child2',
      nameinitials: 'H.M.child2',
      id: 'gfhtyh',
      gender: 'Male',
      dob: '2019-08-13',
      grade: '10',
      class: 'C',
      admissionnumber: '43656',
      admissiondate: '2013-05-23',
      profileImage: '',
      parent: '',
    }
  ];

  constructor(private parentService: ParentService) { }

  ngOnInit() {
    this.parentService.currentParent.subscribe(parent => {
      console.log(parent);
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
  }

}
