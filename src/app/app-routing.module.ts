import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TeachersComponent } from './admin/teachers/teachers.component';
import { ClerksComponent } from './admin/clerks/clerks.component';
import { NoticeComponent } from './admin/notice/notice.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent,
    children: [
      { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
      { path: 'admin/dashboard', component: DashboardComponent },
      { path: 'admin/teachers', component: TeachersComponent },
      { path: 'admin/clerks', component: ClerksComponent },
      { path: 'admin/notice', component: NoticeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
