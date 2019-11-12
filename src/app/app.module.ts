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
    EditTeachersComponent
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
