import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoaderComponent,
    PaginatorComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    PaginatorComponent,
    MenuComponent
  ]
})
export class SharedModule { }
