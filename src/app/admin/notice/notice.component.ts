import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import Swal from "sweetalert2";
import { NoticeService } from "../../services/notice.service";
import { Notice } from "src/app/models/notice";

@Component({
  selector: "app-notice",
  templateUrl: "./notice.component.html",
  styleUrls: ["./notice.component.css"]
})
export class NoticeComponent implements OnInit {
  noticeForm: FormGroup;
  title: string = "";
  details: string = "";
  postedby: string = "";
  notices: Notice[];

  constructor(private fb: FormBuilder, private noticeService: NoticeService) {
    this.noticeForm = fb.group({
      title: [null, Validators.required],
      details: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.noticeService.getAllNotices().subscribe(
      data => {
        this.notices = data.notices;
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  saveNotice(data) {
    if (this.noticeForm.invalid) return;
    Swal.showLoading();
    this.noticeService.createNotice(data).subscribe(
      data => {
        Swal.hideLoading();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: data.message
        })
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  getError(texttype) {
    return texttype.hasError("required") ? "You must enter a value" : "";
  }

  handleResponseError(error) {
    Swal.hideLoading();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.error.error
    });
  }
}
