import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    PortfolioComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CommonModule,
    PortfolioRoutingModule
  ]
})
export class PortfolioModule { }
