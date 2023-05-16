import { TestBed } from '@angular/core/testing';

import { AvatarService } from './avatar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AvatarService', () => {
  let service: AvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ]
    });
    service = TestBed.inject(AvatarService);
  });
});