import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'microservices',
        loadChildren: () => import('./microservices/microservices.module').then(m => m.MicroservicesModule)
      },
      {
        path: 'easycook',
        loadChildren: () => import('./easycook/easycook.module').then(m => m.EasycookModule)
      },
      {
        path: 'portfolio',
        loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
