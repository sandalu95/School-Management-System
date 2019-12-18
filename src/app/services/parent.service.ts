import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Parent } from "../models/parent";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GetParentResponse } from "../models/response/getParentsResponse";
import { CommonResponse } from "../models/response/commonResponse";

@Injectable({
  providedIn: "root"
})
export class ParentService {
  // apiURL: string = "https://sms-web-service.herokuapp.com/api/user/parent";
  apiURL: string = "http://localhost:3000/api/user/parent";
  user = JSON.parse(localStorage.getItem("httpCache"));
  headers = new HttpHeaders({ Authorization: `Bearer ${this.user.token}` });

  private parentSource = new BehaviorSubject<Parent>(null);
  currentParent = this.parentSource.asObservable();

  constructor(private http: HttpClient) {}

  changeParent(parent: Parent) {
    this.parentSource.next(parent);
  }

  public getAllParents(): Observable<GetParentResponse> {
    return this.http.get<GetParentResponse>(this.apiURL, {
      headers: this.headers
    });
  }

  public editParent(
    parentId: string,
    parent: Parent
  ): Observable<CommonResponse> {
    return this.http.patch<CommonResponse>(
      this.apiURL + `/${parentId}`,
      parent,
      {
        headers: this.headers
      }
    );
  }

  public registerParent(parent: Parent): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(this.apiURL, parent);
  }

  public deleteParent(parentId: string): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(this.apiURL + `/${parentId}`, {
      headers: this.headers
    });
  }

  public getParentByUserId(): Observable<GetParentResponse> {
    return this.http.get<GetParentResponse>(`${this.apiURL}/get/byuserid`, {
      headers: this.headers
    });
  }
}
