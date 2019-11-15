import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Student } from "../models/student";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GetStudentResponse } from "../models/response/getStudentResponse";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  apiURL: string = "https://sms-web-service.herokuapp.com/api/user/student";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  private studentSource = new BehaviorSubject<Student>(null);
  currentStudent = this.studentSource.asObservable();

  constructor(private http: HttpClient) {}

  changeStudent(student: Student) {
    this.studentSource.next(student);
  }

  public getAllStudents(): Observable<GetStudentResponse> {
    return this.http.get<GetStudentResponse>(this.apiURL, {
      headers: this.headers
    });
  }
}
