import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin/admin-template.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTemplateComponent,
    children: [
      {
        path: '',
        redirectTo: '/panel/home',
        pathMatch: 'full'
      },
      {
        path: 'panel',
        loadChildren: () =>
          import('../pages/panel.module').then((m) => m.PanelModule),
      },
    ],
  },
  {
    path:'**',
    redirectTo:'panel'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule { }
