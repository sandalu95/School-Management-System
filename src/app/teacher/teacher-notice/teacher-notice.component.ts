import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/notice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticeService } from 'src/app/services/notice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-notice',
  templateUrl: './teacher-notice.component.html',
  styleUrls: ['./teacher-notice.component.css']
})
export class TeacherNoticeComponent implements OnInit {
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
        }).then(res => {
          this.noticeService.getAllNotices().subscribe(
            data => {
              this.notices = data.notices;
            },
            error => {
              this.handleResponseError(error);
            }
          );
        });
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
