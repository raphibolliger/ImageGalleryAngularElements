import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaneaGalleryComponent } from './planea-gallery/planea-gallery.component';
import { SprengerGalleryComponent } from './sprenger-gallery/sprenger-gallery.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';

@NgModule({
  declarations: [
    PhotoGalleryComponent,
    PlaneaGalleryComponent,
    SprengerGalleryComponent,
    ImageSliderComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: []
})
export class AppModule {

  constructor(private injector: Injector) {
    // register planea gallery component
    const planeaGalleryElement = createCustomElement(PlaneaGalleryComponent, { injector: this.injector });
    customElements.define('planea-gallery', planeaGalleryElement);
  }

  ngDoBootstrap() {}

}
