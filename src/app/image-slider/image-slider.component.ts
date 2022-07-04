import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faExclamationCircle,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { interval, takeWhile, tap } from "rxjs";

export enum KEY_CODE {
  RIGHT_ARROW = "ArrowRight",
  LEFT_ARROW = "ArrowLeft",
  ESCAPE = "Escape",
}

export interface ImageSliderDto {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  altText: string;
}

@Component({
  selector: "app-image-slider",
  templateUrl: "./image-slider.component.html",
  styleUrls: ["./image-slider.component.scss"],
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  @ViewChild("thumbslider") thumbslider: ElementRef;
  @ViewChildren("thumbnail") thumbnails: QueryList<ElementRef>;

  @Input() images?: ImageSliderDto[];
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  activeImage?: ImageSliderDto;

  imageLoading = false;

  readonly faTimes: IconDefinition = faTimes;
  readonly faChevronLeft: IconDefinition = faChevronLeft;
  readonly faChevronRight: IconDefinition = faChevronRight;
  readonly faSpinner: IconDefinition = faSpinner;
  readonly faError: IconDefinition = faExclamationCircle;

  readonly intervalSubs: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.imageLoading = true;
    this.activeImage = this.images[0];

    this.delay(100).then(() => {
      this.scrollToThumbnail();
    });
  }

  ngOnDestroy(): void {
    this.intervalSubs.forEach((sub) => sub.unsubscribe());
  }

  public select(image: ImageSliderDto): void {
    if (this.activeImage.id !== image.id) {
      this.activeImage = image;
      this.imageLoading = true;
      this.scrollToThumbnail();
    }
  }

  public close(): void {
    this.onClose.emit();
  }

  public next(): void {
    let nextIndex = 0;
    this.images.forEach((image, index, images) => {
      if (image.id === this.activeImage.id) {
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
      if (image.id === this.activeImage.id) {
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

  public onImageLoadError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = "https://picsum.photos/400/300";
  }

  @HostListener("window:keyup", ["$event"])
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private scrollToThumbnail(): void {
    const activeThumbnail = this.thumbnails.find((item) => {
      const match =
        item.nativeElement.id === "thumbnail-" + this.activeImage.id;
      return match;
    });

    const thumbSliderScrollLeft = this.thumbslider.nativeElement
      .scrollLeft as number;
    const thumbSliderWidth = this.thumbslider.nativeElement
      .clientWidth as number;

    const imageWidth = activeThumbnail.nativeElement.clientWidth as number;
    const scrollDestination =
      activeThumbnail.nativeElement.offsetLeft +
      imageWidth / 4 -
      thumbSliderWidth / 2;
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

    const intervalSub = interval(scrollTime)
      .pipe(
        takeWhile((value) => value < scrollTime),
        tap((value) => {
          this.thumbslider.nativeElement.scrollLeft += scrollStep;
        })
      )
      .subscribe();
    this.intervalSubs.push(intervalSub);
  }
}
