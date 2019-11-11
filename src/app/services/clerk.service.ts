import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Clerk } from "../models/clerk";
import { RegisterClerkResponse } from "../models/response/registerClerkResponse";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ClerkService {
  apiURL: string = "http://localhost:3000/api/user/clerk";

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
    fd.append("fullName", clerk.fullname);
    fd.append("nameWithInitial", clerk.nameinitials);
    fd.append("gender", clerk.dob);
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
}
