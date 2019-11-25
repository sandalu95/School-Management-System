import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Note } from "src/app/models/note";
import { HttpClient } from "@angular/common/http";
import { FileSaverService } from "ngx-filesaver";
import { Teacher } from "src/app/models/teacher";

@Component({
  selector: "app-student-notes",
  templateUrl: "./student-notes.component.html",
  styleUrls: ["./student-notes.component.css"]
})
export class StudentNotesComponent implements OnInit {
  searchForm: FormGroup;
  notes: Note[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _FileSaverService: FileSaverService
  ) {
    this.searchForm = fb.group({
      grade: [null, Validators.required],
      class: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.notes = [
      {
        id: "fc",
        userId: "edd",
        subject: "Maths",
        description: "edrfcredfcrfcrwesdfdsc",
        grade: "3",
        class: "C",
        notes:
          "https://pdfs.semanticscholar.org/32be/a26f2328f8eb81b700d6ec4b7587c6d2a934.pdf",
        teacher: new Teacher()
      },
      {
        id: "sd",
        userId: "sedf",
        subject: "Maths",
        description: "edrfcredfcrfcrwesdfdsc",
        grade: "4",
        class: "A",
        notes:
          "https://pdfs.semanticscholar.org/4493/234db4bbe69c23aba090ad5154b465008376.pdf",
        teacher: new Teacher()
      }
    ];
  }

  searchNotes(data) {
    if (this.searchForm.invalid) return;
  }

  download(note) {
    console.log(note);
    const fileName = `${Date.now()}${note.subject}-${note.grade}-${note.class}`;
    this.http
      .get(note.notes, {
        observe: "response",
        responseType: "blob"
      })
      .subscribe(res => {
        this._FileSaverService.save(res.body, fileName);
      });
    return;
  }

  getError(texttype) {
    return texttype.hasError("required")
      ? "You must enter a value"
      : texttype.hasError("email")
      ? "Not a valid email"
      : "";
  }
}
