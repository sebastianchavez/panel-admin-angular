import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResponsiveSidemenuComponent } from './responsive-sidemenu/responsive-sidemenu.component';
import { NormalSidemenuComponent } from './normal-sidemenu/normal-sidemenu.component';



@NgModule({
  declarations: [
    SidemenuComponent,
    ResponsiveSidemenuComponent,
    NormalSidemenuComponent
  ],
  exports: [
    SidemenuComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
  ]
})
export class SidemenuModule { }
