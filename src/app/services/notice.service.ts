import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Notice } from "../models/notice";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonResponse } from "../models/response/commonResponse";
import { GetNoticesResponse } from "../models/response/getNoticesResponce";

@Injectable({
  providedIn: "root"
})
export class NoticeService {
  apiUrl: string = "https://sms-web-service.herokuapp.com/api/notice";
  // apiUrl: string = "http://localhost:3000/api/notice";

  private noticeSource = new BehaviorSubject<Notice>(null);
  currentNotice = this.noticeSource.asObservable();

  constructor(private http: HttpClient) {}

  changeNotice(notice: Notice) {
    this.noticeSource.next(notice);
  }

  public createNotice(notice: Notice): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });
    
    return this.http.post<CommonResponse>(this.apiUrl, notice, {
      headers: headers
    });
  }

  public getAllNotices(): Observable<GetNoticesResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetNoticesResponse>(this.apiUrl, {
      headers: headers
    });
  }
}
