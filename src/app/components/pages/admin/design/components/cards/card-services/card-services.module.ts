import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardServicesComponent } from './card-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardServicesComponent
  ],
  exports: [
    CardServicesComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class CardServicesModule { }
