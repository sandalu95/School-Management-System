import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Note } from "src/app/models/note";
import { NotesService } from "src/app/services/notes.service";
import { Teacher } from "src/app/models/teacher";

@Component({
  selector: "app-teacher-notes",
  templateUrl: "./teacher-notes.component.html",
  styleUrls: ["./teacher-notes.component.css"]
})
export class TeacherNotesComponent implements OnInit {
  notesForm: FormGroup;
  selectedFile = null;
  notes: Note[];

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.notesForm = this.fb.group({
      subject: [null, Validators.required],
      description: [null, Validators.required],
      grade: [null, Validators.required],
      class: [null, Validators.required],
      file: [null, Validators.required]
    });

    this.notesService.getNotesByTeacherId().subscribe(
      data => {
        console.log(data);
        this.notes = data.notes;
      },
      error => {
        this.handleRespnseError(error);
      }
    );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  addNotes(note: Note) {
    if (this.notesForm.invalid) return;

    Swal.showLoading();

    note.notes = this.selectedFile;

    this.notesService.addNotes(note).subscribe(
      data => {
        this.notesForm.reset();
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        }).then(result => {
          this.router.navigate(["./home/teacher/notes"], {});
        });
      },
      error => {
        this.handleRespnseError(error);
      }
    );
  }

  getError(texttype) {
    return texttype.hasError("required") ? "You must enter a value" : "";
  }

  handleRespnseError(error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }
}
