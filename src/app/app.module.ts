import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileSaverModule } from 'ngx-filesaver';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { NoticeComponent } from "./admin/notice/notice.component";
import { ClerksComponent } from "./admin/clerks/clerks.component";
import { TeachersComponent } from "./admin/teachers/teachers.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { AddTeachersComponent } from "./admin/teachers/add-teachers/add-teachers.component";
import { AddClerksComponent } from "./admin/clerks/add-clerks/add-clerks.component";
import { ViewTeachersComponent } from "./admin/teachers/view-teachers/view-teachers.component";
import { ViewClerksComponent } from "./admin/clerks/view-clerks/view-clerks.component";
import { HttpClientModule } from "@angular/common/http";
import { EditClerksComponent } from "./admin/clerks/edit-clerks/edit-clerks.component";
import { EditTeachersComponent } from "./admin/teachers/edit-teachers/edit-teachers.component";

import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherStudentsComponent } from './teacher/teacher-students/teacher-students.component';
import { TeacherParentsComponent } from './teacher/teacher-parents/teacher-parents.component';
import { TeacherNoticeComponent } from './teacher/teacher-notice/teacher-notice.component';
import { TeacherSalaryComponent } from './teacher/teacher-salary/teacher-salary.component';
import { TeacherLeavesComponent } from './teacher/teacher-leaves/teacher-leaves.component';
import { TeacherAddStudentsComponent } from './teacher/teacher-students/teacher-add-students/teacher-add-students.component';
import { TeacherEditStudentsComponent } from './teacher/teacher-students/teacher-edit-students/teacher-edit-students.component';
import { TeacherViewStudentsComponent } from './teacher/teacher-students/teacher-view-students/teacher-view-students.component';
import { TeacherAddParentsComponent } from './teacher/teacher-parents/teacher-add-parents/teacher-add-parents.component';
import { TeacherEditParentsComponent } from './teacher/teacher-parents/teacher-edit-parents/teacher-edit-parents.component';
import { TeacherViewParentsComponent } from './teacher/teacher-parents/teacher-view-parents/teacher-view-parents.component';
import { TeacherNotesComponent } from './teacher/teacher-notes/teacher-notes.component';
import { TeacherMarksComponent } from './teacher/teacher-marks/teacher-marks.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentNotesComponent } from './student/student-notes/student-notes.component';
import { StudentAchievementsComponent } from './student/student-achievements/student-achievements.component';
import { ClerkDashboardComponent } from './clerk/clerk-dashboard/clerk-dashboard.component';
import { ClerkSalaryComponent } from './clerk/clerk-salary/clerk-salary.component';
import { ClerkAchievementsComponent } from './clerk/clerk-achievements/clerk-achievements.component';
import { ParentDashboardComponent } from './parent/parent-dashboard/parent-dashboard.component';
import { ClerkLeavesComponent } from './clerk/clerk-leaves/clerk-leaves.component';
import { ReportStudentDataComponent } from './reports/report-student-data/report-student-data.component';
import { ReportTeacherDataComponent } from './reports/report-teacher-data/report-teacher-data.component';
import { ReportClerkDataComponent } from './reports/report-clerk-data/report-clerk-data.component';
import { ReportContactInfoComponent } from './reports/report-contact-info/report-contact-info.component';
import { ReportTermtestResultComponent } from './reports/report-termtest-result/report-termtest-result.component';
import { ReportStudentProgressComponent } from './reports/report-student-progress/report-student-progress.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportServiceLetterComponent } from './reports/report-service-letter/report-service-letter.component';
import { ReportCharacterCertificateComponent } from './reports/report-character-certificate/report-character-certificate.component';
import { ReportLeaveCertificateComponent } from './reports/report-leave-certificate/report-leave-certificate.component';
import { ReportAssignmentMarksComponent } from './reports/report-assignment-marks/report-assignment-marks.component';
import { LeavesComponent } from './admin/leaves/leaves.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoticeComponent,
    ClerksComponent,
    TeachersComponent,
    DashboardComponent,
    AddTeachersComponent,
    AddClerksComponent,
    ViewTeachersComponent,
    ViewClerksComponent,
    EditClerksComponent,
    EditTeachersComponent,
    TeacherDashboardComponent,
    TeacherStudentsComponent,
    TeacherParentsComponent,
    TeacherNoticeComponent,
    TeacherSalaryComponent,
    TeacherLeavesComponent,
    TeacherAddStudentsComponent,
    TeacherEditStudentsComponent,
    TeacherViewStudentsComponent,
    TeacherAddParentsComponent,
    TeacherEditParentsComponent,
    TeacherViewParentsComponent,
    TeacherNotesComponent,
    TeacherMarksComponent,
    StudentDashboardComponent,
    StudentNotesComponent,
    StudentAchievementsComponent,
    ClerkDashboardComponent,
    ClerkSalaryComponent,
    ClerkAchievementsComponent,
    ParentDashboardComponent,
    ClerkLeavesComponent,
    ReportStudentDataComponent,
    ReportTeacherDataComponent,
    ReportClerkDataComponent,
    ReportContactInfoComponent,
    ReportTermtestResultComponent,
    ReportStudentProgressComponent,
    ReportServiceLetterComponent,
    ReportCharacterCertificateComponent,
    ReportLeaveCertificateComponent,
    ReportAssignmentMarksComponent,
    LeavesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PdfViewerModule,
    FileSaverModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
