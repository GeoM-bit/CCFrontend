import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSupportGroupComponent } from './user-profile-support-group.component';

describe('UserProfileSupportGroupComponent', () => {
  let component: UserProfileSupportGroupComponent;
  let fixture: ComponentFixture<UserProfileSupportGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileSupportGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileSupportGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
