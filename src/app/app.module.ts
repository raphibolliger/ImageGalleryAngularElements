import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PhotoGalleryComponent
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
    // register gallery component
    const galleryElement = createCustomElement(PhotoGalleryComponent, { injector: this.injector });
    customElements.define('app-image-gallery', galleryElement);
  }

  ngDoBootstrap() {
  }

}
