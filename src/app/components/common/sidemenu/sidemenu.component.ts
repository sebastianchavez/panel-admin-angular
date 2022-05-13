import { Component, Input, OnInit } from '@angular/core';
import { IMenu } from '../../../models/interfaces/menu.interface';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() state: boolean = true;
  @Input() menu: IMenu[] = [
    {
      text: 'Microservicios',
      route: '/microservices',
      icon: 'fa fa-server'
    },
    {
      text: 'Diseño',
      route: '/design',
      icon: 'fa fa-pencil'
    }
  ];

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getStateSidemenu().subscribe((res: boolean) => {
      this.state = res
    })
  }

  changeStateSidemenu(ev: boolean) {
    this.menuService.changeStateSidemenu(ev)
  }

}
