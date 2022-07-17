import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryReelComponent } from './story-reel.component';

describe('StoryReelComponent', () => {
  let component: StoryReelComponent;
  let fixture: ComponentFixture<StoryReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryReelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
