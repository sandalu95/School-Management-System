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

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "admin/dashboard", pathMatch: "full" },
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
      { path: "admin/notice", component: NoticeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
