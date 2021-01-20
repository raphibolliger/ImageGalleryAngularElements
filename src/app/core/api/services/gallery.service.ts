/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PhotoViewModel } from '../models/photo-view-model';
@Injectable({
  providedIn: 'root',
})
class GalleryService extends __BaseService {
  static readonly GetAllImagesPath = '/api/v1/gallery';
  static readonly GetVideoPath = '/api/v1/video';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `GalleryService.GetAllImagesParams` containing the following parameters:
   *
   * - `galleryPassword`:
   *
   * - `eventId`:
   *
   * @return Success
   */
  GetAllImagesResponse(params: GalleryService.GetAllImagesParams): __Observable<__StrictHttpResponse<Array<PhotoViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.galleryPassword != null) __params = __params.set('galleryPassword', params.galleryPassword.toString());
    if (params.eventId != null) __params = __params.set('eventId', params.eventId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/gallery`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PhotoViewModel>>;
      })
    );
  }
  /**
   * @param params The `GalleryService.GetAllImagesParams` containing the following parameters:
   *
   * - `galleryPassword`:
   *
   * - `eventId`:
   *
   * @return Success
   */
  GetAllImages(params: GalleryService.GetAllImagesParams): __Observable<Array<PhotoViewModel>> {
    return this.GetAllImagesResponse(params).pipe(
      __map(_r => _r.body as Array<PhotoViewModel>)
    );
  }

  /**
   * @param videoId undefined
   * @return Success
   */
  GetVideoResponse(videoId?: string): __Observable<__StrictHttpResponse<Array<PhotoViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (videoId != null) __params = __params.set('videoId', videoId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/video`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PhotoViewModel>>;
      })
    );
  }
  /**
   * @param videoId undefined
   * @return Success
   */
  GetVideo(videoId?: string): __Observable<Array<PhotoViewModel>> {
    return this.GetVideoResponse(videoId).pipe(
      __map(_r => _r.body as Array<PhotoViewModel>)
    );
  }
}

module GalleryService {

  /**
   * Parameters for GetAllImages
   */
  export interface GetAllImagesParams {
    galleryPassword?: string;
    eventId?: number;
  }
}

export { GalleryService }
