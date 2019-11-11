import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Teacher } from "../models/teacher";
import { RegisterTeacherResponse } from "src/app/models/response/registerTeacherResponse";

@Injectable({
  providedIn: "root"
})
export class TeacherService {
  apiURL: string = "http://localhost:3000/api/user/teacher";

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
}
