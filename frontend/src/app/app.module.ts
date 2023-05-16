import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PerfilComponent } from './perfil/perfil.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { GameCardComponent } from './game-card/game-card.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CartPopupComponent } from './cart-popup/cart-popup.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    SearchComponent,
    PerfilComponent,
    SidebarComponent,
    SigninComponent,
    DashboardComponent,
    GameCardComponent,
    GamePageComponent,
    CartPopupComponent,
    CartItemComponent,
    EditProfileComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
