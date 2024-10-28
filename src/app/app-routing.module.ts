import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/admin.guard';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./components/templates/template.module').then((module) => module.TemplateModule),
    data: {
      preload: true,
    }
  },
  {
    path:'**',
    redirectTo:''
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
