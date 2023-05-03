import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  links = [
    {text: 'Library'},
    {text: 'Lists'},
    {text: 'Social'}
  ];
  contents = [
    {text: 'Content for Link 1'},
    {text: 'Content for Link 2'},
    {text: 'Content for Link 3'}
  ];
  activeLinkIndex = 0;

  setActiveLinkIndex(index: number) {
    this.activeLinkIndex = index;
  }
}
