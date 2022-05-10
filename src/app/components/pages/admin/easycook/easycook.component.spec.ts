import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasycookComponent } from './easycook.component';

describe('EasycookComponent', () => {
  let component: EasycookComponent;
  let fixture: ComponentFixture<EasycookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasycookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EasycookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
