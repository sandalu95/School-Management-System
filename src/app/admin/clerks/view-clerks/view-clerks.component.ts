import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { Clerk } from "src/app/models/clerk";
import { ClerkService } from "src/app/services/clerk.service";

@Component({
  selector: "app-view-clerks",
  templateUrl: "./view-clerks.component.html",
  styleUrls: ["./view-clerks.component.css"]
})
export class ViewClerksComponent implements OnInit {
  public clerk: Clerk;
  fullname: string;
  nameWithInitial: string;
  position: string;
  gender: string;
  dob: string;
  firstAppoinment: string;
  appoinmentToSchool: string;
  nic: string;
  address: string;
  profileImage: string;
  contactNumber: string;
  email: string;

  constructor(private clerkService: ClerkService, public element: ElementRef) {}

  ngOnInit() {
    this.clerkService.currentClerk.subscribe(clerk => {
      this.clerk = clerk;
    });
    if (this.clerk) {
      this.fullname = this.clerk.fullname;
      this.nameWithInitial = this.clerk.nameinitials;
      this.position = this.clerk.position;
      this.gender = this.clerk.gender;
      this.dob = this.clerk.dob;
      this.firstAppoinment = this.clerk.firstadmission;
      this.appoinmentToSchool = this.clerk.scladmission;
      this.nic = this.clerk.nic;
      this.address = this.clerk.address;
      this.profileImage = this.clerk.file;
      this.contactNumber = this.clerk.contact;
      this.email = this.clerk.email;
    }
  }
}
