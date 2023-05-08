import { Component, Input } from '@angular/core';
import { Item } from '../types/item';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  constructor(private router: Router) {}


  @Input() game: Item = {
    name: '',
    type: '',
    description: '',
    platform: '',
    language: '',
    price: '',
    general_classification: '',
    evaluations: '',
    main_image: '',
    image1: '',
    image2: '',
    video_link: '',
  };

  goToGamePage() {
    this.router.navigate(['/game', this.game.name]);
  }
}
