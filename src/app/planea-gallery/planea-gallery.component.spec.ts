import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneaGalleryComponent } from './planea-gallery.component';

describe('PlaneaGalleryComponent', () => {
  let component: PlaneaGalleryComponent;
  let fixture: ComponentFixture<PlaneaGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneaGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneaGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
