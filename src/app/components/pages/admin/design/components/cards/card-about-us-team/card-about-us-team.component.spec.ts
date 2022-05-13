import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAboutUsTeamComponent } from './card-about-us-team.component';

describe('CardAboutUsTeamComponent', () => {
  let component: CardAboutUsTeamComponent;
  let fixture: ComponentFixture<CardAboutUsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAboutUsTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAboutUsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
