import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Clerk } from "src/app/models/clerk";
import { ClerkService } from "src/app/services/clerk.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-report-clerk-data",
  templateUrl: "./report-clerk-data.component.html",
  styleUrls: ["./report-clerk-data.component.css"]
})
export class ReportClerkDataComponent implements OnInit {
  clerkIdForm: FormGroup;
  clerk: Clerk;
  pdfMake: any;
  clerkListLength: number = -1;

  fullname: string;
  nameWithInitial: string;
  clerkId: string;
  position: string;
  gender: string;
  dob: string;
  nic: string;
  address: string;
  contact: string;
  email: string;
  firstadmission: string;
  scladmission: string;

  constructor(private fb: FormBuilder, public clerkService: ClerkService) {
    this.clerkIdForm = fb.group({
      clerkId: [null, Validators.required]
    });
  }

  ngOnInit() {}

  getClerkDetails(data) {
    if (this.clerkIdForm.invalid) return;

    this.clerkService.getClerkByClerkId(data.clerkId).subscribe(
      data => {
        this.clerk = data.clerks[0];
        this.clerkListLength = data.clerks.length;

        this.clerkId = this.clerk.clerkId;
        this.fullname = this.clerk.fullname;
        this.nameWithInitial = this.clerk.nameinitials;
        this.gender = this.clerk.gender;
        this.dob = this.clerk.dob;
        this.nic = this.clerk.nic;
        this.address = this.clerk.address;
        this.email = this.clerk.email;
        this.contact = this.clerk.contact;
        this.position = this.clerk.position;
        this.firstadmission = this.clerk.firstadmission;
        this.scladmission = this.clerk.scladmission;

      },
      error => {
        this.handleResponseError(error);
      }
    );
  
  }

  generatePdf(action = "open") {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;

      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition() {
    return {
      content: [
        {
          text: "Clerk Data Report",
          bold: true,
          fontSize: 15,
          decoration: "underline",
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              {
                text: "Clerk ID\t:\t" + this.clerkId,
                style: "name"
              },
              {
                text: "Fullname\t:\t" + this.fullname,
                style: "name"
              },
              {
                text: "Name with initials\t:\t" + this.nameWithInitial,
                style: "name"
              },
              {
                text: "Gender\t:\t" + this.gender,
                style: "name"
              },
              {
                text:
                  "Date of birth\t:\t" + this.formatDate(this.firstadmission),
                style: "name"
              },
              {
                text: "NIC Number\t:\t" + this.nic,
                style: "name"
              },
              {
                text: "Address\t:\t" + this.address,
                style: "name"
              },
              {
                text: "Email Address\t:\t" + this.email,
                style: "name"
              },
              {
                text: "Contact Number\t:\t" + this.contact,
                style: "name"
              },
              {
                text: "Position\t:\t" + this.position,
                style: "name"
              },
              {
                text:
                  "Date of first appointment\t:\t" +
                  this.formatDate(this.firstadmission),
                style: "name"
              },
              {
                text:
                  "Date of appointment to school\t:\t" +
                  this.formatDate(this.scladmission),
                style: "name"
              }
            ]
          ]
        }
      ],
      info: {
        title: this.clerkId + "-Clerk Data",
        author: "admin",
        subject: "Clerk Data",
        keywords: "Clerk Data"
      },
      styles: {
        name: {
          fontSize: 12,
          margin: [0, 20, 0, 0]
        }
      }
    };
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

  formatDate(date: string): string {
    var newDate = new Date(date);
    var formattedDate = new Intl.DateTimeFormat("en-AU").format(newDate);

    return formattedDate;
  }
}
