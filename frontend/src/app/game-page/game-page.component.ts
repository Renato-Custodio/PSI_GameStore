import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../types/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {

  constructor(private route: ActivatedRoute, private ItemService: ItemService) { }

  game: Item = {
    _id: '',
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
    background_image: '',
    video_link: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const _id = Number(id);
    this.ItemService.getItem(_id).subscribe(game => {
      this.game = game;
    });
  }

}
