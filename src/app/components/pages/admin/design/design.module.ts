import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { DesignComponent } from './design.component';
import { CardModule } from '../../common/cards/card/card.module';
import { CardHomeServiceModule } from '../../common/cards/card-home-service/card-home-service.module';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { CardAboutUsModule } from '../../common/cards/card-about-us/card-about-us.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CardServicesModule } from '../../common/cards/card-services/card-services.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardAboutUsTeamModule } from '../../common/cards/card-about-us-team/card-about-us-team.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    DesignComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    ServicesComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot(),
    TabsModule.forRoot(),
    CardModule,
    CardHomeServiceModule,
    CardServicesModule,
    CardAboutUsModule,
    CardAboutUsTeamModule,
    CommonModule,
    DesignRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DesignModule { }
