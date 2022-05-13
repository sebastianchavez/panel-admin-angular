import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHomeServiceComponent } from './card-home-service.component';

describe('CardHomeServiceComponent', () => {
  let component: CardHomeServiceComponent;
  let fixture: ComponentFixture<CardHomeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHomeServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHomeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
