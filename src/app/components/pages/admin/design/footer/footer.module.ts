import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class FooterModule { }
