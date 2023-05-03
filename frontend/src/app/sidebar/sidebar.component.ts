import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  menuItems: IMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      link: '/dashboard',
    },
    {
      label: 'Perfil',
      icon: 'fas fa-user',
      link: '/perfil',
    },
    {
      label: 'Pesquisar',
      icon: 'fas fa-search',
      link: '/search',
    },
    {
      label: 'Logout',
      icon: 'fas fa-sign-out-alt',
      link: '/login',
    },
  ];

  constructor() {}
}

interface IMenuItem {
  label: string;
  icon: string;
  link: string;
}
