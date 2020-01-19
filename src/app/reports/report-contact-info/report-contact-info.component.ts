import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Contact } from 'src/app/models/contact';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClerkService } from 'src/app/services/clerk.service';
import { StudentService } from 'src/app/services/student.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report-contact-info',
  templateUrl: './report-contact-info.component.html',
  styleUrls: ['./report-contact-info.component.css']
})
export class ReportContactInfoComponent implements OnInit {

  userTypeForm: FormGroup;
  pdfMake: any;
  selectedUserType:string;
  contactdisplayedColumns: string[] = ["nameinitials", "address", "email", "contact"];
  contactInfoList: Contact[];
  contactInformationListLength: number;
  contactdataSource: MatTableDataSource<Contact>;
  @ViewChild(MatPaginator, { static: true }) contactpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) contactsort: MatSort;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private clerkService: ClerkService,
    private studentService: StudentService,) { 
    this.userTypeForm = fb.group({
      userType: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  apply(data) {
    if (this.userTypeForm.invalid) return;
    this.selectedUserType=data.userType;

    this.contactInfoList=[];
    
    if(this.selectedUserType=='Student'){
      this.studentService.getAllStudents().subscribe(
        data => {
          data.students.forEach(student => {
            let contactInfo:Contact={
              nameinitials:(student.nameinitials==null)?null:student.nameinitials,
              address:(student.address==null)?null:student.address,
              email:null,
              contact:null
            };
            this.contactInfoList.push(contactInfo);
          });
          this.contactInformationListLength = this.contactInfoList.length;
          this.contactdataSource = new MatTableDataSource(this.contactInfoList);
          this.contactdataSource.paginator = this.contactpaginator;
          this.contactdataSource.sort = this.contactsort;
        },
        error => {
          this.handleResponseError(error);
        }
      );
    } else if(this.selectedUserType=='Teacher'){
      this.teacherService.getAllTeachers().subscribe(
        data => {
          data.teachers.forEach(teacher => {
            let contactInfo:Contact={
              nameinitials:(teacher.nameinitials==null)?null:teacher.nameinitials,
              address:(teacher.address==null)?null:teacher.address,
              email:(teacher.email==null)?null:teacher.email,
              contact:(teacher.contact==null)?null:teacher.contact,
            };
            this.contactInfoList.push(contactInfo);
          });
          this.contactInformationListLength = this.contactInfoList.length;
          this.contactdataSource = new MatTableDataSource(this.contactInfoList);
          this.contactdataSource.paginator = this.contactpaginator;
          this.contactdataSource.sort = this.contactsort;
        },
        error => {
          this.handleResponseError(error);
        }
      );
    } else if(this.selectedUserType=='Clerk'){
      this.clerkService.getAllClerks().subscribe(
        data => {
          data.clerks.forEach(clerk => {
            let contactInfo:Contact={
              nameinitials:(clerk.nameinitials==null)?null:clerk.nameinitials,
              address:(clerk.address==null)?null:clerk.address,
              email:(clerk.email==null)?null:clerk.email,
              contact:(clerk.contact==null)?null:clerk.contact,
            };
            this.contactInfoList.push(contactInfo);
          });
          this.contactInformationListLength = this.contactInfoList.length;
          this.contactdataSource = new MatTableDataSource(this.contactInfoList);
          this.contactdataSource.paginator = this.contactpaginator;
          this.contactdataSource.sort = this.contactsort;
        },
        error => {
          this.handleResponseError(error);
        }
      );
    }
    
    // this.contactInformationListLength = this.contactInfoList.length;
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'Contact Information - '+this.selectedUserType,
          bold: true,
          fontSize: 15,
          decoration: 'underline',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              [{
                text: 'Name',
                style: 'tableHeader'
              },
              {
                text: 'Address',
                style: 'tableHeader'
              },
              {
                text: 'Email',
                style: 'tableHeader'
              },
              {
                text: 'Contact',
                style: 'tableHeader'
              },
              ],
              ...this.contactInfoList.map(contactInfo => {
                return [contactInfo.nameinitials, contactInfo.address, contactInfo.email, contactInfo.contact];
              })
            ]
          }
        }
      ],
      info: {
        title: this.selectedUserType+'-Contact Info',
        author: 'admin',
        subject: 'Contact Info',
        keywords: 'Contact Info',
      },
        styles: {
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  applyFilterContact(filterValue: string) {
    this.contactdataSource.filter = filterValue.trim().toLowerCase();

    if (this.contactdataSource.paginator) {
      this.contactdataSource.paginator.firstPage();
    }
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }

  handleResponseError(error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }

  emptyContactInforList(event) {
    console.log("cange")
    this.contactInfoList = [];
    this.contactInformationListLength = 0;
  }

}
