import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportGroupFeedComponent } from './support-group-feed.component';

describe('SupportGroupFeedComponent', () => {
  let component: SupportGroupFeedComponent;
  let fixture: ComponentFixture<SupportGroupFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportGroupFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportGroupFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
