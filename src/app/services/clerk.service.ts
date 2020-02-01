import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Clerk } from "../models/clerk";
import { RegisterClerkResponse } from "../models/response/registerClerkResponse";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { GetClerkResponse } from "../models/response/getClerkResponse";
import { CommonResponse } from "../models/response/commonResponse";

@Injectable({
  providedIn: "root"
})
export class ClerkService {
  apiURL: string = "https://sms-web-service.herokuapp.com/api/user/clerk";
  // apiURL: string = "http://localhost:3000/api/user/clerk";

  private clerkSource = new BehaviorSubject<Clerk>(null);
  currentClerk = this.clerkSource.asObservable();

  constructor(private http: HttpClient) {}

  changeClerk(clerk: Clerk) {
    this.clerkSource.next(clerk);
  }

  public registerClerk(clerk: Clerk): Observable<RegisterClerkResponse> {
    const fd = new FormData();
    if (clerk.file) {
      fd.append("profileImage", clerk.file, clerk.file.name);
    }
    fd.append("clerkId", clerk.clerkId);
    fd.append("fullName", clerk.fullname);
    fd.append("nameWithInitial", clerk.nameinitials);
    fd.append("gender", clerk.gender);
    fd.append("dob", clerk.dob);
    fd.append("firstAppoinmentDate", clerk.firstadmission);
    fd.append("appoinmentToSchool", clerk.scladmission);
    fd.append("position", clerk.position);
    fd.append("nic", clerk.nic);
    fd.append("address", clerk.address);
    fd.append("email", clerk.email);
    fd.append("contactNumber", clerk.contact);

    return this.http.post<RegisterClerkResponse>(this.apiURL, fd);
  }

  public getAllClerks(): Observable<GetClerkResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetClerkResponse>(this.apiURL, { headers: headers });
  }

  public deleteClerk(clerkId: string): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.delete<CommonResponse>(this.apiURL + `/${clerkId}`, {
      headers: headers
    });
  }

  public editClerk(clerkId: string, clerk: Clerk): Observable<CommonResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const fd = new FormData();
    if (clerk.file) {
      fd.append("profileImage", clerk.file, clerk.file.name);
    }
    fd.append("clerkId", clerk.clerkId);
    fd.append("ful_name", clerk.fullname);
    fd.append("name_with_initial", clerk.nameinitials);
    fd.append("gender", clerk.gender);
    fd.append("dob", clerk.dob);
    fd.append("first_appoinment_date", clerk.firstadmission);
    fd.append("appoinment_date_to_school", clerk.scladmission);
    fd.append("position", clerk.position);
    fd.append("nic", clerk.nic);
    fd.append("address", clerk.address);
    fd.append("email", clerk.email);
    fd.append("contact_number", clerk.contact);

    return this.http.patch<CommonResponse>(this.apiURL + `/${clerkId}`, fd, {
      headers: headers
    });
  }

  public getClerkByUserId(): Observable<GetClerkResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    return this.http.get<GetClerkResponse>(
      `${this.apiURL}/${user.userId}`,
      {
        headers: headers
      }
    );
  }

  public getClerkByClerkId(clerkId: string): Observable<GetClerkResponse> {
    const user = JSON.parse(localStorage.getItem("httpCache"));
    const headers = new HttpHeaders({ Authorization: `Bearer ${user.token}` });

    const options = {
      params: new HttpParams().set("clerkId", clerkId),
      headers: headers
    };

    return this.http.get<GetClerkResponse>(`${this.apiURL}/byclerkid/byclerkid`, options);
  }
}
