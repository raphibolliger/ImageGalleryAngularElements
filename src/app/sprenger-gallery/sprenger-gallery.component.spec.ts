import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprengerGalleryComponent } from './sprenger-gallery.component';

describe('SprengerGalleryComponent', () => {
  let component: SprengerGalleryComponent;
  let fixture: ComponentFixture<SprengerGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprengerGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprengerGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
