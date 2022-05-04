import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../../../../models/interfaces/menu.interface';

@Component({
  selector: 'app-normal-sidemenu',
  templateUrl: './normal-sidemenu.component.html',
  styleUrls: ['./normal-sidemenu.component.scss']
})
export class NormalSidemenuComponent implements OnInit {

  @Input() state: boolean = true;
  @Input() menu: IMenu[] = [
    {
      text: 'Dashboards',
      route: '/',
      icon: 'fa fa-home'
    },
    {
      text: 'Home',
      route: '/',
      icon: 'fa fa-home'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
