import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureviewComponent } from './pictureview.component';

describe('PictureviewComponent', () => {
  let component: PictureviewComponent;
  let fixture: ComponentFixture<PictureviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
