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

  constructor(private http: HttpClient) {}

  public addNotes(note: Note): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

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
      headers: headers
    });
  }

  public getNotesByTeacherId(): Observable<GetNotesResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const options = {
      params: new HttpParams().set("teacherId", user.userId),
      headers: headers
    };

    return this.http.get<GetNotesResponse>(
      `${this.apiUrl}/byTeacherId`,
      options
    );
  }

  public deleteNotes(noteId: string): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const options = {
      params: new HttpParams().set("noteId", noteId),
      headers: headers
    };

    return this.http.delete<CommonResponse>(this.apiUrl, options);
  }

  public getNotes(data): Observable<GetNotesResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    let params = new HttpParams();
    params = params.append("grade", data.grade);
    params = params.append("class", data.class);
    params = params.append("subject", data.subject);

    const options = {
      params: params,
      headers: headers
    };
    return this.http.get<GetNotesResponse>(`${this.apiUrl}/bygrade`, options);
  }
}
