import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Note } from "src/app/models/note";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FileSaverService } from "ngx-filesaver";
import { Teacher } from "src/app/models/teacher";
import { NotesService } from "src/app/services/notes.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-student-notes",
  templateUrl: "./student-notes.component.html",
  styleUrls: ["./student-notes.component.css"]
})
export class StudentNotesComponent implements OnInit {
  searchForm: FormGroup;
  notes: Note[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _FileSaverService: FileSaverService,
    private notesService: NotesService
  ) {
    this.searchForm = fb.group({
      grade: [null, Validators.required],
      class: [null, Validators.required],
      subject: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  searchNotes(data) {
    if (this.searchForm.invalid) return;

    Swal.showLoading();
    this.notesService.getNotes(data).subscribe(
      data => {
        Swal.hideLoading();
        this.notes = data.notes;
      },
      error => {
        Swal.hideLoading();
        this.handleResponseError(error);
      }
    );
  }

  download(note) {
    // const fileName = `${Date.now()}${note.subject}-${note.grade}-${note.class}`;
    // const headers = new HttpHeaders({ Authorization: "Bearer ya29.AHES6ZRVmB7fkLtd1XTmq6mo0S1wqZZi3-Lh_s-6Uw7p8vtgSwg" });
    // this.http
    //   .get<Blob>(note.notes, {
    //     observe: "response",
    //     headers: headers
    //   })
    //   .subscribe(res => {
    //     this._FileSaverService.save(res.body, fileName);
    //   });
    window.open(note.notes);
    return;
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
