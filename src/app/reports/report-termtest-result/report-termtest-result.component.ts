import { Component, OnInit, ViewChild } from "@angular/core";
import Swal from "sweetalert2";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Mark } from "src/app/models/mark";
import { TermTestMarks } from "src/app/models/termtestmarks";
import { MarksService } from "src/app/services/marks.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-report-termtest-result",
  templateUrl: "./report-termtest-result.component.html",
  styleUrls: ["./report-termtest-result.component.css"]
})
export class ReportTermtestResultComponent implements OnInit {
  ttMarksForm: FormGroup;
  pdfMake: any;
  termTestMarks: Mark[];
  termTest: TermTestMarks;
  average: number;
  overallGrade: string;
  rank: string;
  finalResult: string;
  gradePromoted: number;

  resultdisplayedColumns: string[] = ["subject", "mark", "grade"];
  resultdataSource: MatTableDataSource<Mark>;
  @ViewChild(MatPaginator, { static: true }) resultpaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) resultsort: MatSort;

  constructor(private fb: FormBuilder, private marksservice: MarksService) {
    this.ttMarksForm = fb.group({
      year: [null, Validators.required],
      term: [null, Validators.required],
      grade: [null, Validators.required],
      admissionNumber: [null, Validators.required]
    });
  }

  ngOnInit() {}

  apply(data) {
    if (this.ttMarksForm.invalid) return;

    this.marksservice.getTermTestMarks(data).subscribe(
      data => {
        if (data.termTestMarks.length > 0) {
          this.termTest = data.termTestMarks[0];
          this.termTestMarks = data.termTestMarks[0].marks;
        }
      },
      error => {
        this.handleResponseError(error);
      }
    );

    this.resultdataSource = new MatTableDataSource(this.termTestMarks);
    this.resultdataSource.paginator = this.resultpaginator;
    this.resultdataSource.sort = this.resultsort;
    let totalMarks: number = 0;

    this.termTestMarks.forEach(ttmark => {
      totalMarks += ttmark.mark;
    });
    this.average = totalMarks / this.termTestMarks.length;
    if (this.average >= 75) {
      this.overallGrade = "A";
      this.finalResult = "Qualified";
    } else if (this.average >= 65) {
      this.overallGrade = "B";
      this.finalResult = "Qualified";
    } else if (this.average >= 55) {
      this.overallGrade = "C";
      this.finalResult = "Qualified";
    } else if (this.average >= 45) {
      this.overallGrade = "S";
      this.finalResult = "Qualified";
    } else {
      this.overallGrade = "W";
      this.finalResult = "Not Qualified";
    }

    this.rank = "10";
    if (this.finalResult == "Qualified") {
      this.gradePromoted = +this.termTest.grade + 1;
    } else {
      this.gradePromoted = +this.termTest.grade;
    }
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
          text:
            "Term Test Marks - " +
            this.termTest.year +
            " - Term " +
            this.termTest.term,
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
                text: "Admission Number\t:\t" + this.termTest.admissionNumber,
                style: "name"
              },
              {
                text: "Grade\t:\t" + this.termTest.grade,
                style: "name"
              },
              {
                text: "Class\t:\t" + this.termTest.class,
                style: "name"
              }
            ]
          ]
        },
        {
          table: {
            widths: ["*", "*", "*"],
            body: [
              [
                {
                  text: "Subject",
                  style: "tableHeader"
                },
                {
                  text: "Mark",
                  style: "tableHeader"
                },
                {
                  text: "Grade",
                  style: "tableHeader"
                }
              ],
              ...this.termTestMarks.map(ttMark => {
                return [ttMark.subject, ttMark.mark, ttMark.grade];
              })
            ]
          }
        },
        {
          columns: [
            [
              {
                text: "Average\t:\t" + this.average,
                style: "name"
              },
              {
                text: "Overall Grade\t:\t" + this.overallGrade,
                style: "name"
              },
              {
                text: "Rank\t:\t" + this.rank,
                style: "name"
              },
              {
                text: "Result\t:\t" + this.finalResult,
                style: "name"
              },
              {
                text: "Promoted to grade\t:\t" + this.gradePromoted,
                style: "name"
              }
            ]
          ]
        }
      ],
      info: {
        title: this.termTest.admissionNumber + "-Term Test Results",
        author: "admin",
        subject: "Term Test Results",
        keywords: "Term Test Results"
      },
      styles: {
        tableHeader: {
          bold: true
        },
        name: {
          fontSize: 11,
          bold: true
        }
      }
    };
  }

  applyFilterResult(filterValue: string) {
    this.resultdataSource.filter = filterValue.trim().toLowerCase();

    if (this.resultdataSource.paginator) {
      this.resultdataSource.paginator.firstPage();
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
}
