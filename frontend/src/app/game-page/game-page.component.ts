import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../types/item';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserData } from '../types/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent {
  username!: string;
  user!: UserData;
  safeVideoUrl!: SafeResourceUrl;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ItemService: ItemService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        this.user = user;
      });
    });
  }

  game: Item = {
    _id: 0,
    name: '',
    type: '',
    description: '',
    platform: '',
    language: '',
    price: 0,
    general_classification: 0,
    evaluations: [],
    main_image: '',
    image1: '',
    image2: '',
    background_image: '',
    video_link: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const _id = Number(id);
    this.ItemService.getItem(_id).subscribe((game) => {
      this.game = game;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.game.video_link
      );
      const buttons = document.querySelectorAll<HTMLElement>(
        '[data-carousel-button]'
      );

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const offset =
            button.getAttribute('data-carousel-button') === 'next' ? 1 : -1;
          const carousel = button.closest('[data-carousel]');
          const slides = carousel?.querySelector('[data-slides]');

          if (slides) {
            const activeSlide = slides.querySelector('[data-active]');

            if (activeSlide) {
              let newIndex =
                Array.from(slides.children).indexOf(activeSlide) + offset;
              if (newIndex < 0) newIndex = slides.children.length - 1;
              if (newIndex >= slides.children.length) newIndex = 0;

              slides.children[newIndex].setAttribute('data-active', 'true');
              activeSlide.removeAttribute('data-active');
            }
          }
        });
      });
    });
  }

  addToUserCart() {
    this.userService.addToCart(this.username, this.game._id).subscribe(() => {
      console.log('Added to cart');
    });
  }

  addToWishlist() {
    this.userService.addToWishlist(this.username, this.game._id).subscribe(
      () => {
        console.log('Added to wishlist');
        alert('Game added to wishlist successfully!');
      },
      (error) => {
        console.error('Error adding to wishlist:', error);
        alert('Error adding game to wishlist.');
      }
    );
  }

  selectedRating: number | null = null;
  comment: string = '';

  rateGame(rating: number) {
    this.selectedRating = rating;
  }

  submitEvaluation() {
    if (this.selectedRating === null) {
      alert('Please select a rating.');
      return;
    }

    this.ItemService.evaluateGame(
      this.username,
      this.game._id,
      this.selectedRating,
      this.comment
    ).subscribe(
      () => {
        console.log('Evaluation submitted');
        alert('Evaluation submitted successfully!');
        this.selectedRating = null; // Clear the selected rating
        this.comment = ''; // Clear the comment
      },
      (error) => {
        console.error('Error submitting evaluation:', error);
        alert('Error submitting evaluation.');
      }
    );
  }

  removeFromWishlist() {
    this.userService.removeFromWishlist(this.username, this.game._id).subscribe(
      () => {
        console.log('Removed from wishlist');
        alert('Game removed from wishlist successfully!');
      },
      (error) => {
        console.error('Error removing from wishlist:', error);
        alert('Error removing game from wishlist.');
      }
    );
  }
}
