import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginGuard } from '@guards/login.guard';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent ,canActivate:[LoginGuard] },
  { path: 'register', component: RegisterComponent ,canActivate:[LoginGuard] },
  {
    path: '',
    loadChildren: () =>
      import('./components/templates/template.module').then((module) => module.TemplateModule),
    data: {
      preload: true,
    }
  }
,
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
