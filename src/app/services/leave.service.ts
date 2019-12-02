import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Leave } from "../models/leave";
import { CommonResponse } from "../models/response/commonResponse";
import { Observable } from "rxjs";
import { GetLeavesResponse } from "../models/response/getLeaveResponse";

@Injectable({
  providedIn: "root"
})
export class LeaveService {
  apiUrl: string = "https://sms-web-service.herokuapp.com/api/leaves";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  constructor(private http: HttpClient) {}

  public requestLeaves(leave: Leave): Observable<CommonResponse> {
    const fd = new FormData();
    if (leave.assignedWork) {
      fd.append("notes", leave.assignedWork, leave.assignedWork.name);
    }
    fd.append("commencedDate", leave.commencedDate.toString());
    fd.append("assumedDate", leave.assumedDate.toString());
    fd.append("appliedDate", leave.appliedDate.toString());
    fd.append("noOfDays", leave.noOfDays.toString());
    fd.append("leaveType", leave.leaveType);
    fd.append("reason", leave.reason);

    return this.http.post<CommonResponse>(this.apiUrl, fd, {
      headers: this.headers
    });
  }

  public getLeavesByUserId(): Observable<GetLeavesResponse> {
    const options = {
      params: new HttpParams().set("userId", this.user.userId),
      headers: this.headers
    };

    return this.http.get<GetLeavesResponse>(`${this.apiUrl}/byuserid`, options);
  }

  public deleteLeave(leaveId: string): Observable<CommonResponse> {
    const options = {
      params: new HttpParams().set("leaveId", leaveId),
      headers: this.headers
    };

    return this.http.delete<CommonResponse>(this.apiUrl, options);
  }
}
