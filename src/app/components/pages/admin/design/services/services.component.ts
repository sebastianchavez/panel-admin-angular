import { Component, Input, OnInit } from '@angular/core';
import { IServicePage } from '../../../../models/service-page.interface';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  @Input() servicesPage: IServicePage;
  constructor() { }

  ngOnInit(): void {
  }

}
