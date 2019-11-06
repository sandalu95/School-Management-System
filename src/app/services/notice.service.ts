import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notice } from '../models/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private noticeSource = new BehaviorSubject<Notice>(null);
  currentNotice = this.noticeSource.asObservable();

  constructor() { }

  changeNotice(notice:Notice) {
    this.noticeSource.next(notice);
  }
}
