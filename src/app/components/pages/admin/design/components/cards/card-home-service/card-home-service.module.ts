import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHomeServiceComponent } from './card-home-service.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardHomeServiceComponent
  ],
  exports: [
    CardHomeServiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CardHomeServiceModule { }
