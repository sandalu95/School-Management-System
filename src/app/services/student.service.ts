import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentSource = new BehaviorSubject<Student>(null);
  currentStudent = this.studentSource.asObservable();

  constructor() { }

  changeStudent(student:Student) {
    this.studentSource.next(student);
  }
}
