import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportGroupsTableComponent } from './support-groups-table.component';

describe('SupportGroupsTableComponent', () => {
  let component: SupportGroupsTableComponent;
  let fixture: ComponentFixture<SupportGroupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportGroupsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
