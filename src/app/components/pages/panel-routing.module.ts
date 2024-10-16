import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'category',component:  ListCategoryComponent},
  {path: 'category/create',component:  CreateCategoryComponent},
  {
    path: '**',
    redirectTo: 'home',
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule { }
