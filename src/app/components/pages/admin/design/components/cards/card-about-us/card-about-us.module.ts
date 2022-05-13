import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAboutUsComponent } from './card-about-us.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardAboutUsComponent
  ],
  exports: [
    CardAboutUsComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CardAboutUsModule { }
