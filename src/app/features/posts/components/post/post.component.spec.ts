import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportGroupPostComponent } from './post.component';

describe('SupportGroupPostComponent', () => {
  let component: SupportGroupPostComponent;
  let fixture: ComponentFixture<SupportGroupPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportGroupPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportGroupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
