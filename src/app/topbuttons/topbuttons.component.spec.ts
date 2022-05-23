import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbuttonsComponent } from './topbuttons.component';

describe('TopbuttonsComponent', () => {
  let component: TopbuttonsComponent;
  let fixture: ComponentFixture<TopbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
