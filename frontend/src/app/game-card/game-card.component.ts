import { Component, Input } from '@angular/core';
import { Item } from '../types/item';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
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
}
