import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

const modules = [
  FormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatOptionModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}