import { Component } from '@angular/core';
import { navbarData } from '../types/nav-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  collapsed = false;
  navData = navbarData;

  closeSidenav(): void {
    this.collapsed = !this.collapsed;
  }

  toggleCollapse(): void {
    this.collapsed = false;
  }
}
