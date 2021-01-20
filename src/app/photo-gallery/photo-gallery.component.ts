import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, ViewChild, Input } from '@angular/core';
import { PhotoViewModel } from '../core/api/models';
import { GalleryService } from '../core/api/services';
import { faTimes, faChevronLeft, faChevronRight, faSpinner, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { interval, EMPTY } from 'rxjs';
import { takeWhile, tap, catchError, finalize, delay } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  ESCAPE = 'Escape'
}

@Component({
  selector: 'app-alphavideo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  @Input() public eventid: number;

  public galleryLoading = false;
  public showPasswordForm = false;
  public showWrongPasswordError = false;
  public showGalleryError = false;

  public faTimes: IconDefinition = faTimes;
  public faChevronLeft: IconDefinition = faChevronLeft;
  public faChevronRight: IconDefinition = faChevronRight;
  public faSpinner: IconDefinition = faSpinner;
  public faError: IconDefinition = faExclamationCircle;

  public images: PhotoViewModel[] = [];

  public sliderActive = false;
  public activeImage: PhotoViewModel;

  public imageLoading = false;

  @ViewChild('thumbslider') thumbslider: ElementRef;
  @ViewChildren('thumbnail') thumbnails: QueryList<ElementRef>;

  constructor(private galleryService: GalleryService) {}

  // https://css-tricks.com/probably-dont-base64-svg/
  public ngOnInit(): void {

    const localStoragePassword = localStorage.getItem('alphagallerypassword');

    if (this.eventid && !isNaN(this.eventid)) {
      this.loadImages(localStoragePassword);
    }
  }

  public async open(image: PhotoViewModel): Promise<void> {
    this.sliderActive = true;
    this.imageLoading = true;
    this.activeImage = image;

    // its important to wait a little time until scroll to image is done because thumbnails are not initialized at beginning
    await this.delay(100);
    this.scrollToThumbnail();
  }

  public select(image: PhotoViewModel): void {
    this.activeImage = image;
    this.imageLoading = true;
    this.scrollToThumbnail();
  }

  public close(): void {
    this.sliderActive = false;
  }

  public next(): void {
    let nextIndex = 0;
    this.images.forEach((image, index, images) => {
      if (image.Id === this.activeImage.Id) {
        if (index === this.images.length - 1) {
          nextIndex = 0;
        } else {
          nextIndex = index + 1;
        }
      }
    });
    this.activeImage = this.images[nextIndex];
    this.imageLoading = true;
    this.scrollToThumbnail();
  }

  public previous(): void {
    let prevIndex = 0;
    this.images.forEach((image, index, images) => {
      if (image.Id === this.activeImage.Id) {
        if (index === 0) {
          prevIndex = this.images.length - 1;
        } else {
          prevIndex = index - 1;
        }
      }
    });
    this.activeImage = this.images[prevIndex];
    this.imageLoading = true;
    this.scrollToThumbnail();
  }

  public onImageLoaded(): void {
    this.imageLoading = false;
  }

  private scrollToThumbnail(): void {
    const activeThumbnail = this.thumbnails.find(item => {
      const match = item.nativeElement.id === 'thumbnail-' + this.activeImage.Id;
      return match;
    });

    const thumbSliderScrollLeft = this.thumbslider.nativeElement.scrollLeft as number;
    const thumbSliderWidth = this.thumbslider.nativeElement.clientWidth as number;

    const imageWidth = activeThumbnail.nativeElement.clientWidth as number;
    const scrollDestination = activeThumbnail.nativeElement.offsetLeft + (imageWidth / 4) - (thumbSliderWidth / 2);
    const scrollDistance = scrollDestination - thumbSliderScrollLeft;

    // set scroll time on behalf of distance, short distance can be a longer scroll
    let scrollTime = 15;
    if (Math.abs(scrollDistance) > 5000) {
      scrollTime = 5;
    }

    let scrollStep = Math.abs(scrollDistance / scrollTime);

    if (thumbSliderScrollLeft > scrollDestination) {
      scrollStep = -scrollStep;
    }

    interval(scrollTime).pipe(
      takeWhile(value => value < scrollTime),
      tap(value => {
        this.thumbslider.nativeElement.scrollLeft += scrollStep;
      })
    ).subscribe();
  }

  public onImageLoadError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = 'https://picsum.photos/400/300';
  }

  public loadImages(password?: string) {
    this.galleryLoading = true;
    this.showGalleryError = false;
    this.showPasswordForm = false;
    this.showWrongPasswordError = false;

    const params: GalleryService.GetAllImagesParams = {
      eventId: +this.eventid,
      galleryPassword: password
    };

    this.galleryService.GetAllImages(params).pipe(
      catchError(error => {
        const httpError = error as HttpErrorResponse;
        if (httpError.status === 423) {
          this.showPasswordForm = true;
          if ((httpError.error as boolean)) {
            this.showWrongPasswordError = true;
          }
          return EMPTY;
        } else {
          this.showGalleryError = true;
          return EMPTY;
        }
      }),
      finalize(() => {
        this.galleryLoading = false;
      })
    )
    .subscribe(response => {
      localStorage.setItem('alphagallerypassword', password);
      this.images = response;
      this.showGalleryError = false;
      this.showPasswordForm = false;
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.key === KEY_CODE.ESCAPE) {
      this.close();
    }

    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.next();
    }

    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.previous();
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
