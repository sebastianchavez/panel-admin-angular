import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MicroservicesRoutingModule } from './microservices-routing.module';
import { MicroservicesComponent } from './microservices.component';


@NgModule({
  declarations: [MicroservicesComponent],
  imports: [
    CommonModule,
    MicroservicesRoutingModule
  ]
})
export class MicroservicesModule { }
