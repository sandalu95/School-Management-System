import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Student } from "../models/student";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GetStudentResponse } from "../models/response/getStudentResponse";
import { CommonResponse } from '../models/response/commonResponse';

@Injectable({
  providedIn: "root"
})
export class StudentService {
  apiURL: string = "http://localhost:3000/api/user/student";
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

  public editStudent(id: string, student: Student): Observable<CommonResponse> {
    // const user = JSON.parse(localStorage.getItem("httpCache"));
    // const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    // const fd = new FormData();
    // if (teacher.file) {
    //   fd.append("profileImage", teacher.file, teacher.file.name);
    // }
    // fd.append("fullName", teacher.fullname);
    // fd.append("nameWithInitial", teacher.nameinitials);
    // fd.append("gender", teacher.gender);
    // fd.append("dob", teacher.dob);
    // fd.append("firstAppoinmentDate", teacher.firstadmission);
    // fd.append("appoinmentToSchool", teacher.scladmission);
    // fd.append("position", teacher.position);
    // fd.append("nic", teacher.nic);
    // fd.append("address", teacher.address);
    // fd.append("contactNumber", teacher.contact);
    // fd.append("subject", teacher.subject);
    // fd.append("email", teacher.email);

    // return this.http.patch<CommonResponse>(this.apiURL + `/${teacherId}`, fd, {
    //   headers: headers
    // });
    return
  }
}
