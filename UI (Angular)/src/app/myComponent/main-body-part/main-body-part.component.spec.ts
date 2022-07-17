import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBodyPartComponent } from './main-body-part.component';

describe('MainBodyPartComponent', () => {
  let component: MainBodyPartComponent;
  let fixture: ComponentFixture<MainBodyPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBodyPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBodyPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
