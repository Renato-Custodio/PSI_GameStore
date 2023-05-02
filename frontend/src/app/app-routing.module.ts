import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListasComponent } from './listas/listas.component';
import { LibItemsComponent } from './lib-items/lib-items.component';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'listas', component: ListasComponent },
  { path: 'items', component: LibItemsComponent },
  { path: 'seguir', component: FollowingComponent },
  { path: 'seguidores', component: FollowersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
