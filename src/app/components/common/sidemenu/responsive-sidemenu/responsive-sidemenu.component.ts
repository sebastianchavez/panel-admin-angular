import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMenu } from '../../../../models/interfaces/menu.interface';

@Component({
  selector: 'app-responsive-sidemenu',
  templateUrl: './responsive-sidemenu.component.html',
  styleUrls: ['./responsive-sidemenu.component.scss']
})
export class ResponsiveSidemenuComponent implements OnInit {

  @Output() changeState: EventEmitter<any> = new EventEmitter();
  @Input() state: boolean = false;
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

  changeStateSidemenu() {
    this.changeState.emit(!this.state)
  }
}
