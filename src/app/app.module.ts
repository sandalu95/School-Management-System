import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";

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
import { StudentMarksComponent } from './student/student-marks/student-marks.component';
import { StudentAchievementsComponent } from './student/student-achievements/student-achievements.component';
import { StudentExamsComponent } from './student/student-exams/student-exams.component';

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
    StudentMarksComponent,
    StudentAchievementsComponent,
    StudentExamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
