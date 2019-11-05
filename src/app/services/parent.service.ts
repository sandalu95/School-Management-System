import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parent } from '../models/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private parentSource = new BehaviorSubject<Parent>(null);
  currentParent = this.parentSource.asObservable();

  constructor() { }

  changeParent(parent:Parent) {
    this.parentSource.next(parent);
  }
}
