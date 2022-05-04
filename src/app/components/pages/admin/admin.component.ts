import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  stateSidemenu: boolean = true;
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getStateSidemenu().subscribe((res: boolean) => {
      this.stateSidemenu = res
    })
  }

  changeStateSidemenu(ev: boolean) {
    this.menuService.changeStateSidemenu(ev)
  }

}
