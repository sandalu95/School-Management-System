import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Student } from "../models/student";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GetStudentResponse } from "../models/response/getStudentResponse";
import { CommonResponse } from "../models/response/commonResponse";

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

  public registerStudent(student: any): Observable<CommonResponse> {
    const fd = new FormData();
    if (student.file) {
      fd.append("profileImage", student.file, student.file.name);
    }
    fd.append("fullName", student.fullname);
    fd.append("nameWithInitial", student.nameinitials);
    fd.append("gender", student.gender);
    fd.append("dob", student.dob);
    fd.append("address", student.address);
    fd.append("admissionDate", student.admissiondate);
    fd.append("admissionNumber", student.admissionnumber);
    fd.append("grade", student.grade);
    fd.append("class", student.class);
    fd.append("parentId", student.parent);

    return this.http.post<CommonResponse>(this.apiURL, fd);
  }

  public editStudent(
    studentId: string,
    student: any
  ): Observable<CommonResponse> {
    const fd = new FormData();
    if (student.file) {
      fd.append("profileImage", student.file, student.file.name);
    }
    fd.append("fullName", student.fullname);
    fd.append("nameWithInitial", student.nameinitials);
    fd.append("gender", student.gender);
    fd.append("dob", student.dob);
    fd.append("address", student.address);
    fd.append("admissionDate", student.admissiondate);
    fd.append("admissionNumber", student.admissionnumber);
    fd.append("grade", student.grade);
    fd.append("class", student.class);
    fd.append("parentId", student.parent);

    return this.http.patch<CommonResponse>(this.apiURL + `/${studentId}`, fd, {
      headers: this.headers
    });
  }

  public deleteStudent(studentId: string): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(this.apiURL + `/${studentId}`, {
      headers: this.headers
    });
  }
}
