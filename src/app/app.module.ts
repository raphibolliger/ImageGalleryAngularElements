import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { ApiModule } from './core/api/api.module';
import { ApiConfiguration } from './core/api/api-configuration';
import { environment } from 'src/environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { APP_BASE_HREF } from '@angular/common';
import { VideoComponent } from './video/video.component';

const apiConfiguration: ApiConfiguration = {
  rootUrl: environment.apiUrl
};

@NgModule({
  declarations: [
    PhotoGalleryComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule.forRoot(apiConfiguration),
    FontAwesomeModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: []
})
export class AppModule {

  constructor(private injector: Injector) {
    // register gallery component
    const galleryElement = createCustomElement(PhotoGalleryComponent, { injector });
    customElements.define('app-alphavideo-gallery', galleryElement);

    // register video component
    const videoElement = createCustomElement(VideoComponent, { injector });
    customElements.define('app-alphavideo-videos', videoElement);
  }

  ngDoBootstrap() {
  }

}
