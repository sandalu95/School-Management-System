import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { TeachersComponent } from "./admin/teachers/teachers.component";
import { ClerksComponent } from "./admin/clerks/clerks.component";
import { NoticeComponent } from "./admin/notice/notice.component";
import { AddTeachersComponent } from "./admin/teachers/add-teachers/add-teachers.component";
import { AddClerksComponent } from "./admin/clerks/add-clerks/add-clerks.component";
import { ViewClerksComponent } from "./admin/clerks/view-clerks/view-clerks.component";
import { ViewTeachersComponent } from "./admin/teachers/view-teachers/view-teachers.component";
import { EditClerksComponent } from "./admin/clerks/edit-clerks/edit-clerks.component";
import { EditTeachersComponent } from "./admin/teachers/edit-teachers/edit-teachers.component";
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherLeavesComponent } from './teacher/teacher-leaves/teacher-leaves.component';
import { TeacherNoticeComponent } from './teacher/teacher-notice/teacher-notice.component';
import { TeacherParentsComponent } from './teacher/teacher-parents/teacher-parents.component';
import { TeacherSalaryComponent } from './teacher/teacher-salary/teacher-salary.component';
import { TeacherStudentsComponent } from './teacher/teacher-students/teacher-students.component';
import { TeacherAddStudentsComponent } from './teacher/teacher-students/teacher-add-students/teacher-add-students.component';
import { TeacherEditStudentsComponent } from './teacher/teacher-students/teacher-edit-students/teacher-edit-students.component';
import { TeacherViewStudentsComponent } from './teacher/teacher-students/teacher-view-students/teacher-view-students.component';
import { TeacherAddParentsComponent } from './teacher/teacher-parents/teacher-add-parents/teacher-add-parents.component';
import { TeacherEditParentsComponent } from './teacher/teacher-parents/teacher-edit-parents/teacher-edit-parents.component';
import { TeacherViewParentsComponent } from './teacher/teacher-parents/teacher-view-parents/teacher-view-parents.component';
import { TeacherNotesComponent } from './teacher/teacher-notes/teacher-notes.component';
import { TeacherMarksComponent } from './teacher/teacher-marks/teacher-marks.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentAchievementsComponent } from './student/student-achievements/student-achievements.component';
import { StudentExamsComponent } from './student/student-exams/student-exams.component';
import { StudentMarksComponent } from './student/student-marks/student-marks.component';
import { StudentNotesComponent } from './student/student-notes/student-notes.component';
import { ClerkDashboardComponent } from './clerk/clerk-dashboard/clerk-dashboard.component';
import { ClerkAchievementsComponent } from './clerk/clerk-achievements/clerk-achievements.component';
import { ClerkSalaryComponent } from './clerk/clerk-salary/clerk-salary.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "admin", redirectTo: "admin/dashboard", pathMatch: "full" },
      { path: "admin/dashboard", component: DashboardComponent },
      { path: "admin/teachers", component: TeachersComponent },
      { path: "admin/teachers/add-teachers", component: AddTeachersComponent },
      {
        path: "admin/teachers/edit-teachers",
        component: EditTeachersComponent
      },
      {
        path: "admin/teachers/view-teachers",
        component: ViewTeachersComponent
      },
      { path: "admin/clerks", component: ClerksComponent },
      { path: "admin/clerks/add-clerks", component: AddClerksComponent },
      { path: "admin/clerks/edit-clerks", component: EditClerksComponent },
      { path: "admin/clerks/view-clerks", component: ViewClerksComponent },
      { path: "admin/notice", component: NoticeComponent },
      { path: "teacher", redirectTo: "teacher/dashboard", pathMatch: "full" },
      { path: "teacher/dashboard", component: TeacherDashboardComponent },
      { path: "teacher/leaves", component: TeacherLeavesComponent },
      { path: "teacher/notice", component: TeacherNoticeComponent },
      { path: "teacher/notes", component: TeacherNotesComponent },
      { path: "teacher/marks", component: TeacherMarksComponent },
      { path: "teacher/parents", component: TeacherParentsComponent },
      { path: "teacher/parents/add-parents", component: TeacherAddParentsComponent },
      {
        path: "teacher/parents/edit-parents",
        component: TeacherEditParentsComponent
      },
      {
        path: "teacher/parents/view-parents",
        component: TeacherViewParentsComponent
      },
      { path: "teacher/salary", component: TeacherSalaryComponent },
      { path: "teacher/students", component: TeacherStudentsComponent },
      { path: "teacher/students/add-students", component: TeacherAddStudentsComponent },
      {
        path: "teacher/students/edit-students",
        component: TeacherEditStudentsComponent
      },
      {
        path: "teacher/students/view-students",
        component: TeacherViewStudentsComponent
      },
      { path: "student", redirectTo: "student/dashboard", pathMatch: "full" },
      { path: "student/dashboard", component: StudentDashboardComponent },
      { path: "student/achievements", component: StudentAchievementsComponent },
      { path: "student/exams", component: StudentExamsComponent },
      { path: "student/marks", component: StudentMarksComponent },
      { path: "student/notes", component: StudentNotesComponent },
      { path: "clerk", redirectTo: "clerk/dashboard", pathMatch: "full" },
      { path: "clerk/dashboard", component: ClerkDashboardComponent },
      { path: "clerk/achievements", component: ClerkAchievementsComponent },
      { path: "clerk/salary", component: ClerkSalaryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
