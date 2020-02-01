import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Note } from "src/app/models/note";
import { NotesService } from "src/app/services/notes.service";
import { HttpClient } from "@angular/common/http";
import { FileSaverService } from "ngx-filesaver";

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
    private notesService: NotesService,
    private http: HttpClient,
    private _FileSaverService: FileSaverService
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
          this.notesService.getNotesByTeacherId().subscribe(
            data => {
              this.notes = data.notes;
            },
            error => {
              this.handleRespnseError(error);
            }
          );
        });
      },
      error => {
        this.handleRespnseError(error);
      }
    );
  }

  download(note) {
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

  delete(note: Note) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Swal.close();
        this.notesService.deleteNotes(note.id).subscribe(
          data => {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: data.message
            }).then(result => {
              this.notesService.getNotesByTeacherId().subscribe(
                data => {
                  this.notes = data.notes;
                },
                error => {
                  this.handleRespnseError(error);
                }
              );
            });
          },
          error => {
            this.handleRespnseError(error);
          }
        );
      }
    });
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
