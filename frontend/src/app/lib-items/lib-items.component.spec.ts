import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibItemsComponent } from './lib-items.component';

describe('LibItemsComponent', () => {
  let component: LibItemsComponent;
  let fixture: ComponentFixture<LibItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
