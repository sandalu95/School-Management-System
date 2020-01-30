import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Teacher } from "../models/teacher";
import { RegisterTeacherResponse } from "src/app/models/response/registerTeacherResponse";
import { GetTeacherResponse } from "../models/response/getTeacherResponse";
import { CommonResponse } from "../models/response/commonResponse";

@Injectable({
  providedIn: "root"
})
export class TeacherService {
  apiURL: string = "https://sms-web-service.herokuapp.com/api/user/teacher";
  // apiURL: string = "http://localhost:3000/api/user/teacher";

  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  private teacherSource = new BehaviorSubject<Teacher>(null);
  currentTeacher = this.teacherSource.asObservable();

  constructor(private http: HttpClient) {}

  changeTeacher(teacher: Teacher) {
    this.teacherSource.next(teacher);
  }

  public registerTeacher(
    teacher: Teacher
  ): Observable<RegisterTeacherResponse> {

    const fd = new FormData();
    if (teacher.file) {
      fd.append("profileImage", teacher.file, teacher.file.name);
    }
    fd.append("teacherid", teacher.teacherid);
    fd.append("fullName", teacher.fullname);
    fd.append("nameWithInitial", teacher.nameinitials);
    fd.append("gender", teacher.gender);
    fd.append("dob", teacher.dob);
    fd.append("firstAppoinmentDate", teacher.firstadmission);
    fd.append("appoinmentToSchool", teacher.scladmission);
    fd.append("position", teacher.position);
    fd.append("nic", teacher.nic);
    fd.append("address", teacher.address);
    fd.append("contactNumber", teacher.contact);
    fd.append("subject", teacher.subject);
    fd.append("email", teacher.email);

    return this.http.post<RegisterTeacherResponse>(this.apiURL, fd);
  }

  public editTeacher(
    teacherId: string,
    teacher: Teacher
  ): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const fd = new FormData();
    if (teacher.file) {
      fd.append("profileImage", teacher.file, teacher.file.name);
    }
    fd.append("teacherid", teacher.teacherid);
    fd.append("full_name", teacher.fullname);
    fd.append("name_with_initial", teacher.nameinitials);
    fd.append("gender", teacher.gender);
    fd.append("dob", teacher.dob);
    fd.append("first_appoinment_date", teacher.firstadmission);
    fd.append("appoinment_date_to_school", teacher.scladmission);
    fd.append("position", teacher.position);
    fd.append("nic", teacher.nic);
    fd.append("address", teacher.address);
    fd.append("contact_number", teacher.contact);
    fd.append("subject", teacher.subject);
    fd.append("email", teacher.email);

    return this.http.patch<CommonResponse>(this.apiURL + `/${teacherId}`, fd, {
      headers: headers
    });
  }

  public getAllTeachers(): Observable<GetTeacherResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetTeacherResponse>(this.apiURL, { headers: headers });
  }

  public deleteTeacher(teacherId: string): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.delete<CommonResponse>(this.apiURL + `/${teacherId}`, {
      headers: headers
    });
  }

  public getTeacherById(): Observable<GetTeacherResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });
    const userId = user.userId;

    return this.http.get<GetTeacherResponse>(`${this.apiURL}/${userId}`, {
      headers: headers
    });
  }

  public getTeacherByTeacherId(teacherId: string): Observable<GetTeacherResponse> {
    const options = {
      params: new HttpParams().set("teacherid", teacherId),
      headers: this.headers
    };

    return this.http.get<GetTeacherResponse>(`${this.apiURL}/byteacherId/byteacherId`, options);
  }
}
