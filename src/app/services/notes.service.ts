import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Note } from "../models/note";
import { CommonResponse } from "../models/response/commonResponse";
import { GetNotesResponse } from "../models/response/getNotesResponse";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  apiUrl: string = "https://sms-web-service.herokuapp.com/api/notes";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  constructor(private http: HttpClient) {}

  public addNotes(note: Note): Observable<CommonResponse> {
    const fd = new FormData();
    if (note.notes) {
      fd.append("notes", note.notes, note.notes.name);
    }
    fd.append("subject", note.subject);
    fd.append("grade", note.grade);
    fd.append("class", note.class);
    fd.append("description", note.description);
    fd.append("userId", note.userId);

    return this.http.post<CommonResponse>(this.apiUrl, fd, {
      headers: this.headers
    });
  }

  public getNotesByTeacherId(): Observable<GetNotesResponse> {
    const options = {
      params: new HttpParams().set("teacherId", this.user.userId),
      headers: this.headers
    };

    return this.http.get<GetNotesResponse>(
      `${this.apiUrl}/byTeacherId`,
      options
    );
  }
}
