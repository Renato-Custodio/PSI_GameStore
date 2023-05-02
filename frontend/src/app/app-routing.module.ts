import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },  // prob going to be remoevd
  { path: 'create', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
