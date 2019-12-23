import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCheckinComponent } from './preview-checkin.component';

describe('PreviewCheckinComponent', () => {
  let component: PreviewCheckinComponent;
  let fixture: ComponentFixture<PreviewCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
