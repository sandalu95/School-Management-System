import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Student } from "../models/student";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { GetStudentResponse } from "../models/response/getStudentResponse";
import { CommonResponse } from "../models/response/commonResponse";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  // apiURL: string = "http://localhost:3000/api/user/student";
  apiURL: string = "https://sms-web-service.herokuapp.com/api/user/student";

  private studentSource = new BehaviorSubject<Student>(null);
  currentStudent = this.studentSource.asObservable();

  constructor(private http: HttpClient) {}

  changeStudent(student: Student) {
    this.studentSource.next(student);
  }

  public getAllStudents(): Observable<GetStudentResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetStudentResponse>(this.apiURL, {
      headers: headers
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
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

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
      headers: headers
    });
  }

  public deleteStudent(studentId: string): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.delete<CommonResponse>(this.apiURL + `/${studentId}`, {
      headers: headers
    });
  }

  public getStudentsByParentId(
    parentId: string
  ): Observable<GetStudentResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const options = {
      params: new HttpParams().set("parentId", parentId),
      headers: headers
    };

    return this.http.get<GetStudentResponse>(
      this.apiURL + `/byparentId/children`,
      options
    );
  }

  public getStudentsByClass(
    grade: string,
    _class: string
  ): Observable<GetStudentResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    let params = new HttpParams();
    params = params.append("grade", grade);
    params = params.append("class", _class);

    const options = {
      params: params,
      headers: headers
    };

    return this.http.get<GetStudentResponse>(
      `${this.apiURL}/get/byclass`,
      options
    );
  }

  public getStudentByUserId(): Observable<GetStudentResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetStudentResponse>(
      `${this.apiURL}/${user.userId}`,
      {
        headers: headers
      }
    );
  }

  public getStudentByAddmissionNUmber(
    addmissionNumber: string
  ): Observable<GetStudentResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const options = {
      params: new HttpParams().set("addmissionNumber", addmissionNumber),
      headers: headers
    };

    return this.http.get<GetStudentResponse>(
      `${this.apiURL}/get/byaddmissionnumber`,
      options
    );
  }
}
