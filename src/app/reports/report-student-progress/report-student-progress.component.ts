import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { NgxChartsModule } from '@swimlane/ngx-charts';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-student-progress',
  templateUrl: './report-student-progress.component.html',
  styleUrls: ['./report-student-progress.component.css']
})
export class ReportStudentProgressComponent implements OnInit {

  progressForm: FormGroup;
  pdfMake: any;
  view: any[] = [700, 400];
  data=[];
  chartData:any;

  conductLevels=['Outstanding','Satisfactory','Needs'];
  obedience:string;
  workNeat:string;
  classParticipation:string;
  refrainDistrupting:string;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'subject';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'marks';
  legendTitle: string = 'term';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor(private fb: FormBuilder) { 
    this.progressForm = fb.group({
      year: [null, Validators.required],
      grade: [null, Validators.required],
      class: [null, Validators.required],
      admissionNumber: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getProgress(data) {
    if (this.progressForm.invalid) return;

    this.data=[
      {
        "name": "Mathmatics",
        "series": [
          {
            "name": "1",
            "value": 93
          },
          {
            "name": "2",
            "value": 79
          },
          {
            "name": "3",
            "value": 88
          }
        ]
      },
    
      {
        "name": "Sinhala",
        "series": [
          {
            "name": "1",
            "value": 87
          },
          {
            "name": "2",
            "value": 92
          },
          {
            "name": "3",
            "value": 97
          }
        ]
      },
  
      {
        "name": "English",
        "series": [
          {
            "name": "1",
            "value": 76
          },
          {
            "name": "2",
            "value": 87
          },
          {
            "name": "3",
            "value": 93
          }
        ]
      }
    ];

    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('chart-body');
      html2canvas(chart, {
        height: 500,
        width: 1000,
        scale: 3,
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('chart-body').style.visibility = 'visible';
        }
      }).then((canvas) => {
        // Get chart data so we can append to the pdf
        this.chartData = canvas.toDataURL();
      });
    }, 1100);
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
          text: 'Student Progress Report',
          bold: true,
          fontSize: 15,
          decoration: 'underline',
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: "Year\t:\t"+this.progressForm.get('year').value,
              style: 'name'
            },
            {
              text: "Grade\t:\t"+this.progressForm.get('grade').value,
              style: 'name'
            },
            {
              text: "Class\t:\t"+this.progressForm.get('class').value,
              style: 'name'
            },
            {
              text: "Admission Number\t:\t"+this.progressForm.get('admissionNumber').value,
              style: 'name'
            }
            ]
          ]
        },
        {
          image: this.chartData, 
          width: 700
        },
        {
          columns: [
            [{
              text: "Obedience\t:\t"+this.obedience,
              style: 'name'
            },
            {
              text: "Work Neatly\t:\t"+this.workNeat,
              style: 'name'
            },
            {
              text: "Class Participation\t:\t"+this.classParticipation,
              style: 'name'
            },
            {
              text: "Refrain from distrupting others\t:\t"+this.refrainDistrupting,
              style: 'name'
            }
            ]
          ]
        }
      ],
      info: {
        title: this.progressForm.get('admissionNumber').value+'-Student Data',
        author: 'admin',
        subject: 'Student Data',
        keywords: 'Student Data',
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

}
