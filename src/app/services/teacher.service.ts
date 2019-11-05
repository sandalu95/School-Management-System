import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teacherSource = new BehaviorSubject<Teacher>(null);
  currentTeacher = this.teacherSource.asObservable();

  constructor() { }

  changeTeacher(teacher:Teacher) {
    this.teacherSource.next(teacher);
  }
}
