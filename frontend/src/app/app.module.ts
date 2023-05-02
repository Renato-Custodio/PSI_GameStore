import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PerfilComponent } from './perfil/perfil.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    PerfilComponent,
    SidebarComponent,
    BodyComponent,
    SigninComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
