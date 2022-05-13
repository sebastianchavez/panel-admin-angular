import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAboutUsTeamComponent } from './card-about-us-team.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardAboutUsTeamComponent
  ],
  exports: [
    CardAboutUsTeamComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CardAboutUsTeamModule { }
