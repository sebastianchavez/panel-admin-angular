import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InterceptorService } from './services/interceptors/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
