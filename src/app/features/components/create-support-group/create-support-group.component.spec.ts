import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupportGroupComponent } from './create-support-group.component';

describe('CreateSupportGroupComponent', () => {
  let component: CreateSupportGroupComponent;
  let fixture: ComponentFixture<CreateSupportGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSupportGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSupportGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
