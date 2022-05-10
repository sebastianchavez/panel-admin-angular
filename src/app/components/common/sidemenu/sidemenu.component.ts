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
    // TODO: desarrollar mantenedor de easycook
    // {
    //   text: 'Easy Cook',
    //   route: '/easycook',
    //   icon: 'fa fa-cutlery',
    //   hasSubmenu: true,
    //   submenu: [
    //     {
    //       text: 'Usuarios',
    //       route: '/easycook/users'
    //     },
    //     {
    //       text: 'Categorias',
    //       route: '/easycook/categories'
    //     }
    //   ]
    // },
    {
      text: 'Mi portafolio',
      route: '/portfolio',
      icon: 'fa fa-briefcase'
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
